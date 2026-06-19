import * as THREE from "three";

export const BRAND_YELLOW = 0xf5e642;
export const BRAND_MUZZLE = 0xfff0a8;
export const BRAND_EAR_IN = 0xe8d830;
export const BRAND_INK = 0x1a1a1a;

export function createMangaGrainTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create manga grain texture");

  ctx.fillStyle = "#7a7a7a";
  ctx.fillRect(0, 0, size, size);

  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const dot = (x % 5 === 0 && y % 5 === 0) || (x % 7 === 2 && y % 7 === 3);
      const noise = Math.random() * 28;
      const v = dot ? 210 + noise : 96 + noise;
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

export function createToonGradientMap(steps: 2 | 4 = 4) {
  const canvas = document.createElement("canvas");
  canvas.width = steps;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create toon gradient");

  if (steps === 2) {
    ctx.fillStyle = "#ededed";
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(1, 0, 1, 1);
  } else {
    ctx.fillStyle = "#505050";
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = "#909090";
    ctx.fillRect(1, 0, 1, 1);
    ctx.fillStyle = "#d8d8d8";
    ctx.fillRect(2, 0, 1, 1);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(3, 0, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export type BrandMaterialStyle = "expressive" | "editorial";

export type BrandMaterialOptions = {
  style?: BrandMaterialStyle;
};

export type BrandMaterials = {
  yellow: THREE.MeshToonMaterial;
  muzzle: THREE.MeshToonMaterial;
  earIn: THREE.MeshToonMaterial;
  ink: THREE.MeshBasicMaterial;
  outline: THREE.MeshBasicMaterial;
  grain: THREE.CanvasTexture;
  gradient: THREE.CanvasTexture;
};

export function createBrandMaterials(
  options: BrandMaterialOptions = {},
): BrandMaterials {
  const style = options.style ?? "expressive";
  const editorial = style === "editorial";

  const grain = editorial ? null : createMangaGrainTexture();
  const gradient = createToonGradientMap(editorial ? 2 : 4);

  const surface = editorial
    ? { gradientMap: gradient }
    : {
        gradientMap: gradient,
        bumpMap: grain!,
        bumpScale: 0.022,
      };

  return {
    grain: grain ?? gradient,
    gradient,
    yellow: new THREE.MeshToonMaterial({
      color: BRAND_YELLOW,
      ...surface,
    }),
    muzzle: new THREE.MeshToonMaterial({
      color: BRAND_MUZZLE,
      ...surface,
      ...(editorial ? {} : { bumpScale: 0.018 }),
    }),
    earIn: new THREE.MeshToonMaterial({
      color: BRAND_EAR_IN,
      ...surface,
      ...(editorial ? {} : { bumpScale: 0.016 }),
    }),
    ink: new THREE.MeshBasicMaterial({
      color: BRAND_INK,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    }),
    outline: new THREE.MeshBasicMaterial({
      color: BRAND_INK,
      side: THREE.BackSide,
    }),
  };
}

export function disposeBrandMaterials(materials: BrandMaterials) {
  materials.yellow.dispose();
  materials.muzzle.dispose();
  materials.earIn.dispose();
  materials.ink.dispose();
  materials.outline.dispose();
  if (materials.grain !== materials.gradient) {
    materials.grain.dispose();
  }
  materials.gradient.dispose();
}

export type PartShadowOptions = {
  castShadow?: boolean;
  receiveShadow?: boolean;
  outlineScale?: number;
};

export function addPartWithOutline(
  geometry: THREE.SphereGeometry,
  material: THREE.Material,
  outline: THREE.Material,
  sx: number,
  sy: number,
  sz: number,
  x: number,
  y: number,
  z: number,
  parent: THREE.Object3D,
  outlineScale = 1.06,
  shadows: PartShadowOptions = {},
) {
  const castShadow = shadows.castShadow ?? true;
  const receiveShadow = shadows.receiveShadow ?? true;

  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(sx, sy, sz);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  parent.add(mesh);

  const shell = new THREE.Mesh(geometry, outline);
  shell.scale.set(sx * outlineScale, sy * outlineScale, sz * outlineScale);
  shell.position.set(x, y, z);
  parent.add(shell);

  return mesh;
}

export function addInkDot(
  geometry: THREE.SphereGeometry,
  ink: THREE.MeshBasicMaterial,
  sx: number,
  sy: number,
  sz: number,
  x: number,
  y: number,
  z: number,
  parent: THREE.Object3D,
  renderOrder = 12,
) {
  const mesh = new THREE.Mesh(geometry, ink);
  mesh.scale.set(sx, sy, sz);
  mesh.position.set(x, y, z);
  mesh.renderOrder = renderOrder;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  parent.add(mesh);
  return mesh;
}
