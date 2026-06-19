"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularGallery = void 0;
var ogl_1 = require("ogl");
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
function debounce(func, wait) {
    var timeout;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(_this, args); }, wait);
    };
}
function lerp(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}
function autoBind(instance) {
    var proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key !== "constructor" &&
            typeof instance[key] === "function") {
            instance[key] = instance[key].bind(instance);
        }
    });
}
var Media = /** @class */ (function () {
    function Media(_a) {
        var geometry = _a.geometry, gl = _a.gl, image = _a.image, index = _a.index, length = _a.length, renderer = _a.renderer, scene = _a.scene, screen = _a.screen, viewport = _a.viewport, bend = _a.bend, _b = _a.borderRadius, borderRadius = _b === void 0 ? 0 : _b, reducedMotion = _a.reducedMotion;
        this.extra = 0;
        this.widthTotal = 0;
        this.width = 0;
        this.x = 0;
        this.scale = 1;
        this.padding = 2;
        this.speed = 0;
        this.isBefore = false;
        this.isAfter = false;
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.bend = bend;
        this.borderRadius = borderRadius;
        this.reducedMotion = reducedMotion;
        this.createShader();
        this.createMesh();
        this.onResize();
    }
    Media.prototype.createShader = function () {
        var _this = this;
        var texture = new ogl_1.Texture(this.gl, {
            generateMipmaps: false,
        });
        this.program = new ogl_1.Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: "\n        precision highp float;\n        attribute vec3 position;\n        attribute vec2 uv;\n        uniform mat4 modelViewMatrix;\n        uniform mat4 projectionMatrix;\n        uniform float uTime;\n        uniform float uSpeed;\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          vec3 p = position;\n          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);\n        }\n      ",
            fragment: "\n        precision highp float;\n        uniform vec2 uImageSizes;\n        uniform vec2 uPlaneSizes;\n        uniform sampler2D tMap;\n        uniform float uBorderRadius;\n        varying vec2 vUv;\n        \n        float roundedBoxSDF(vec2 p, vec2 b, float r) {\n          vec2 d = abs(p) - b;\n          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;\n        }\n        \n        void main() {\n          vec2 ratio = vec2(\n            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),\n            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)\n          );\n          vec2 uv = vec2(\n            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n          );\n          vec4 color = texture2D(tMap, uv);\n          \n          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);\n          \n          float edgeSmooth = 0.002;\n          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);\n          if (alpha < 0.01) discard;\n          \n          gl_FragColor = vec4(color.rgb * alpha, alpha);\n        }\n      ",
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius },
            },
            transparent: true,
        });
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.src = this.image;
        img.onload = function () {
            texture.image = img;
            _this.program.uniforms.uImageSizes.value = [
                img.naturalWidth,
                img.naturalHeight,
            ];
        };
    };
    Media.prototype.createMesh = function () {
        this.plane = new ogl_1.Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program,
        });
        this.plane.setParent(this.scene);
    };
    Media.prototype.update = function (scroll, direction) {
        this.plane.position.x = this.x - scroll.current - this.extra;
        var x = this.plane.position.x;
        var H = this.viewport.width / 2;
        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        }
        else {
            var B_abs = Math.abs(this.bend);
            var R = (H * H + B_abs * B_abs) / (2 * B_abs);
            var effectiveX = Math.min(Math.abs(x), H);
            var arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            }
            else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }
        this.speed = scroll.current - scroll.last;
        if (!this.reducedMotion) {
            this.program.uniforms.uTime.value += 0.04;
            this.program.uniforms.uSpeed.value = this.speed;
        }
        else {
            this.program.uniforms.uSpeed.value = 0;
        }
        var planeOffset = this.plane.scale.x / 2;
        var viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
        if (direction === "right" && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = false;
            this.isAfter = false;
        }
        if (direction === "left" && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = false;
            this.isAfter = false;
        }
    };
    Media.prototype.onResize = function (_a) {
        var _b = _a === void 0 ? {} : _a, screen = _b.screen, viewport = _b.viewport;
        if (screen)
            this.screen = screen;
        if (viewport)
            this.viewport = viewport;
        this.scale = this.screen.height / 1500;
        this.plane.scale.y =
            (this.viewport.height * (900 * this.scale)) / this.screen.height;
        this.plane.scale.x =
            (this.viewport.width * (700 * this.scale)) / this.screen.width;
        this.program.uniforms.uPlaneSizes.value = [
            this.plane.scale.x,
            this.plane.scale.y,
        ];
        this.padding = 2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    };
    return Media;
}());
var App = /** @class */ (function () {
    function App(container, _a) {
        var items = _a.items, bend = _a.bend, borderRadius = _a.borderRadius, scrollSpeed = _a.scrollSpeed, scrollEase = _a.scrollEase, reducedMotion = _a.reducedMotion, onScrollVelocity = _a.onScrollVelocity;
        this.sourceItems = [];
        this.isDown = false;
        this.dragDistance = 0;
        this.isVisible = true;
        this.start = 0;
        this.raf = 0;
        this.container = container;
        this.onScrollVelocity = onScrollVelocity;
        this.scrollSpeed = scrollSpeed;
        this.reducedMotion = reducedMotion;
        this.scrollEase = scrollEase;
        this.scroll = {
            ease: reducedMotion ? 1 : scrollEase,
            current: 0,
            target: 0,
            last: 0,
            position: 0,
        };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        autoBind(this);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items, bend, borderRadius);
        this.update();
        this.addEventListeners();
    }
    App.prototype.createRenderer = function () {
        var dpr = typeof window !== "undefined" && window.innerWidth < 768
            ? Math.min(window.devicePixelRatio || 1, 1.5)
            : Math.min(window.devicePixelRatio || 1, 2);
        this.renderer = new ogl_1.Renderer({
            alpha: true,
            antialias: true,
            dpr: dpr,
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.gl.canvas);
    };
    App.prototype.createCamera = function () {
        this.camera = new ogl_1.Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    };
    App.prototype.createScene = function () {
        this.scene = new ogl_1.Transform();
    };
    App.prototype.createGeometry = function () {
        this.planeGeometry = new ogl_1.Plane(this.gl, {
            heightSegments: 10,
            widthSegments: 20,
        });
    };
    App.prototype.createMedias = function (items, bend, borderRadius) {
        var _this = this;
        var defaultItems = [
            { image: "https://picsum.photos/seed/1/800/600?grayscale", text: "Bridge" },
            {
                image: "https://picsum.photos/seed/2/800/600?grayscale",
                text: "Desk Setup",
            },
            {
                image: "https://picsum.photos/seed/3/800/600?grayscale",
                text: "Waterfall",
            },
        ];
        var galleryItems = items && items.length > 0 ? items : defaultItems;
        this.sourceItems = galleryItems;
        this.mediasImages = __spreadArray(__spreadArray([], galleryItems, true), galleryItems, true);
        this.medias = this.mediasImages.map(function (data, index) {
            return new Media({
                geometry: _this.planeGeometry,
                gl: _this.gl,
                image: data.image,
                index: index,
                length: _this.mediasImages.length,
                renderer: _this.renderer,
                scene: _this.scene,
                screen: _this.screen,
                viewport: _this.viewport,
                bend: bend,
                borderRadius: borderRadius,
                reducedMotion: _this.reducedMotion,
            });
        });
    };
    App.prototype.onTouchDown = function (e) {
        this.isDown = true;
        this.dragDistance = 0;
        this.scroll.position = this.scroll.current;
        this.start = "touches" in e ? e.touches[0].clientX : e.clientX;
    };
    App.prototype.onTouchMove = function (e) {
        if (!this.isDown)
            return;
        var x = "touches" in e ? e.touches[0].clientX : e.clientX;
        this.dragDistance = Math.max(this.dragDistance, Math.abs(this.start - x));
        var distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = this.scroll.position + distance;
    };
    App.prototype.onTouchUp = function () {
        var _a, _b;
        var tap = this.isDown && this.dragDistance < 12;
        this.isDown = false;
        this.onCheck();
        if (tap && this.sourceItems.length > 0 && ((_a = this.medias) === null || _a === void 0 ? void 0 : _a[0])) {
            var width = this.medias[0].width;
            var rawIndex = Math.round(Math.abs(this.scroll.target) / width);
            var itemIndex = rawIndex % this.sourceItems.length;
            var href = (_b = this.sourceItems[itemIndex]) === null || _b === void 0 ? void 0 : _b.href;
            if (href)
                window.location.assign(href);
        }
    };
    App.prototype.onWheel = function (e) {
        var delta = e.deltaY || e.detail;
        this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
        this.onCheckDebounce();
    };
    App.prototype.onCheck = function () {
        var _a;
        if (!((_a = this.medias) === null || _a === void 0 ? void 0 : _a[0]))
            return;
        var width = this.medias[0].width;
        var itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        var item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    };
    App.prototype.onResize = function () {
        var _this = this;
        var _a;
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight,
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height,
        });
        var fov = (this.camera.fov * Math.PI) / 180;
        var height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        var width = height * this.camera.aspect;
        this.viewport = { width: width, height: height };
        (_a = this.medias) === null || _a === void 0 ? void 0 : _a.forEach(function (media) {
            return media.onResize({ screen: _this.screen, viewport: _this.viewport });
        });
    };
    App.prototype.setReducedMotion = function (reduced) {
        var _a;
        this.reducedMotion = reduced;
        this.scroll.ease = reduced ? 1 : this.scrollEase;
        (_a = this.medias) === null || _a === void 0 ? void 0 : _a.forEach(function (media) {
            media.reducedMotion = reduced;
        });
    };
    App.prototype.update = function () {
        var _this = this;
        var _a, _b;
        if (this.isVisible) {
            this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
            var direction_1 = this.scroll.current > this.scroll.last ? "right" : "left";
            var velocity = this.scroll.current - this.scroll.last;
            (_a = this.onScrollVelocity) === null || _a === void 0 ? void 0 : _a.call(this, velocity);
            (_b = this.medias) === null || _b === void 0 ? void 0 : _b.forEach(function (media) { return media.update(_this.scroll, direction_1); });
            this.renderer.render({ scene: this.scene, camera: this.camera });
            this.scroll.last = this.scroll.current;
        }
        this.raf = window.requestAnimationFrame(this.update);
    };
    App.prototype.setVisible = function (visible) {
        this.isVisible = visible;
    };
    App.prototype.addEventListeners = function () {
        var _this = this;
        this.boundOnResize = this.onResize;
        this.boundOnWheel = function (e) { return _this.onWheel(e); };
        this.boundOnTouchDown = this.onTouchDown;
        this.boundOnTouchMove = this.onTouchMove;
        this.boundOnTouchUp = this.onTouchUp;
        window.addEventListener("resize", this.boundOnResize);
        window.addEventListener("wheel", this.boundOnWheel);
        this.container.addEventListener("mousedown", this.boundOnTouchDown);
        window.addEventListener("mousemove", this.boundOnTouchMove);
        window.addEventListener("mouseup", this.boundOnTouchUp);
        this.container.addEventListener("touchstart", this.boundOnTouchDown, {
            passive: true,
        });
        window.addEventListener("touchmove", this.boundOnTouchMove, {
            passive: true,
        });
        window.addEventListener("touchend", this.boundOnTouchUp);
    };
    App.prototype.destroy = function () {
        var _a, _b;
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener("resize", this.boundOnResize);
        window.removeEventListener("wheel", this.boundOnWheel);
        this.container.removeEventListener("mousedown", this.boundOnTouchDown);
        window.removeEventListener("mousemove", this.boundOnTouchMove);
        window.removeEventListener("mouseup", this.boundOnTouchUp);
        this.container.removeEventListener("touchstart", this.boundOnTouchDown);
        window.removeEventListener("touchmove", this.boundOnTouchMove);
        window.removeEventListener("touchend", this.boundOnTouchUp);
        var canvas = (_b = (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.gl) === null || _b === void 0 ? void 0 : _b.canvas;
        if (canvas === null || canvas === void 0 ? void 0 : canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    };
    return App;
}());
var CircularGallery = function (_a) {
    var items = _a.items, _b = _a.bend, bend = _b === void 0 ? 3 : _b, _c = _a.borderRadius, borderRadius = _c === void 0 ? 0.05 : _c, _d = _a.scrollSpeed, scrollSpeed = _d === void 0 ? 2 : _d, _e = _a.scrollEase, scrollEase = _e === void 0 ? 0.05 : _e, className = _a.className, fontClassName = _a.fontClassName, onScrollVelocity = _a.onScrollVelocity, props = __rest(_a, ["items", "bend", "borderRadius", "scrollSpeed", "scrollEase", "className", "fontClassName", "onScrollVelocity"]);
    var containerRef = (0, react_1.useRef)(null);
    var onScrollVelocityRef = (0, react_1.useRef)(onScrollVelocity);
    onScrollVelocityRef.current = onScrollVelocity;
    (0, react_1.useEffect)(function () {
        var container = containerRef.current;
        if (!container)
            return;
        var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var app = new App(container, {
            items: items,
            bend: bend,
            borderRadius: borderRadius,
            scrollSpeed: scrollSpeed,
            scrollEase: reducedMotion ? 1 : scrollEase,
            reducedMotion: reducedMotion,
            onScrollVelocity: function (velocity) { var _a; return (_a = onScrollVelocityRef.current) === null || _a === void 0 ? void 0 : _a.call(onScrollVelocityRef, velocity); },
        });
        var motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        var onMotionChange = function () {
            app.setReducedMotion(motionMediaQuery.matches);
        };
        motionMediaQuery.addEventListener("change", onMotionChange);
        var onVisibility = function () {
            app.setVisible(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", onVisibility);
        return function () {
            motionMediaQuery.removeEventListener("change", onMotionChange);
            document.removeEventListener("visibilitychange", onVisibility);
            app.destroy();
        };
    }, [items, bend, borderRadius, scrollSpeed, scrollEase]);
    return (React.createElement("div", __assign({ ref: containerRef, className: (0, utils_1.cn)("h-full w-full cursor-grab overflow-hidden active:cursor-grabbing", "font-sans text-[24px] font-normal text-[#1a1a1a]", fontClassName, className) }, props)));
};
exports.CircularGallery = CircularGallery;
