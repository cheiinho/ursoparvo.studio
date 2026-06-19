import * as THREE from "three";

/**
 * Face proportions traced from public/assets/bear-yellow.png (147×150).
 * Normalized coords: origin top-left, x/y in 0–1.
 */
const LOGO = {
  leftEye: { x: 0.308, y: 0.412, w: 0.061 },
  rightEye: { x: 0.685, y: 0.412, w: 0.061 },
  noseTopY: 0.48,
  noseTipY: 0.627,
  noseHalfWidthTop: 0.231 / 2,
  mouthStemTopY: 0.628,
  mouthStemBottomY: 0.692,
  mouthStemWidth: 0.027,
  mouthFlareBottomY: 0.716,
  mouthFlareHalfWidth: 0.068 / 2,
} as const;

/** Logo units → head-local units (calibrated to head sphere ~1.2 wide). */
const LOGO_SCALE = 2.29;

function logoY(ny: number) {
  return (0.5 - ny) * LOGO_SCALE;
}

function logoX(nx: number) {
  return (nx - 0.5) * LOGO_SCALE;
}

function logoLen(n: number) {
  return n * LOGO_SCALE;
}

export type LogoFaceGeometries = {
  nose: THREE.ExtrudeGeometry;
  mouthStem: THREE.CylinderGeometry;
  mouthCurveL: THREE.TubeGeometry;
  mouthCurveR: THREE.TubeGeometry;
  eye: THREE.CircleGeometry;
};

export function createLogoFaceGeometries(): LogoFaceGeometries {
  const noseShape = new THREE.Shape();
  const hw = logoLen(LOGO.noseHalfWidthTop);
  const topY = logoY(LOGO.noseTopY);
  const tipY = logoY(LOGO.noseTipY);
  const midY = (topY + tipY) * 0.42;

  noseShape.moveTo(-hw, topY);
  noseShape.quadraticCurveTo(0, topY + logoLen(0.018), hw, topY);
  noseShape.quadraticCurveTo(
    hw * 0.72,
    midY,
    hw * 0.14,
    tipY + logoLen(0.006),
  );
  noseShape.quadraticCurveTo(0, tipY, -hw * 0.14, tipY + logoLen(0.006));
  noseShape.quadraticCurveTo(-hw * 0.72, midY, -hw, topY);

  const nose = new THREE.ExtrudeGeometry(noseShape, {
    depth: logoLen(0.026),
    bevelEnabled: true,
    bevelThickness: logoLen(0.007),
    bevelSize: logoLen(0.005),
    bevelSegments: 2,
    curveSegments: 16,
  });
  nose.translate(0, 0, logoLen(0.013));

  const stemH = logoLen(LOGO.mouthStemBottomY - LOGO.mouthStemTopY);
  const stemR = logoLen(LOGO.mouthStemWidth / 2);
  const mouthStem = new THREE.CylinderGeometry(stemR, stemR, stemH, 10);

  const inkR = stemR * 0.92;
  const flareDrop = logoLen(LOGO.mouthFlareBottomY - LOGO.mouthStemBottomY);
  const flareOut = logoLen(LOGO.mouthFlareHalfWidth);

  function mouthCurve(side: number) {
    return new THREE.TubeGeometry(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(side * flareOut * 0.45, -flareDrop * 0.42, 0),
        new THREE.Vector3(side * flareOut, -flareDrop, 0),
      ),
      8,
      inkR,
      6,
      false,
    );
  }

  const eyeRadius = logoLen(LOGO.leftEye.w / 2);
  const eye = new THREE.CircleGeometry(eyeRadius, 32);

  return {
    nose,
    mouthStem,
    mouthCurveL: mouthCurve(-1),
    mouthCurveR: mouthCurve(1),
    eye,
  };
}

export type LogoFaceAnchors = {
  nose: THREE.Vector3;
  mouthStem: THREE.Vector3;
  mouthSplit: THREE.Vector3;
  leftEye: THREE.Vector3;
  rightEye: THREE.Vector3;
  faceZ: number;
};

export function getLogoFaceAnchors(): LogoFaceAnchors {
  const faceZ = 1.1;
  const noseCenterY = (logoY(LOGO.noseTopY) + logoY(LOGO.noseTipY)) / 2;

  const stemCenterY =
    (logoY(LOGO.mouthStemTopY) + logoY(LOGO.mouthStemBottomY)) / 2;

  return {
    faceZ,
    nose: new THREE.Vector3(0, noseCenterY, faceZ),
    mouthStem: new THREE.Vector3(0, stemCenterY, faceZ + 0.004),
    mouthSplit: new THREE.Vector3(
      0,
      logoY(LOGO.mouthStemBottomY),
      faceZ + 0.006,
    ),
    leftEye: new THREE.Vector3(
      logoX(LOGO.leftEye.x),
      logoY(LOGO.leftEye.y),
      faceZ + 0.012,
    ),
    rightEye: new THREE.Vector3(
      logoX(LOGO.rightEye.x),
      logoY(LOGO.rightEye.y),
      faceZ + 0.012,
    ),
  };
}

export function addInkMesh(
  geometry: THREE.BufferGeometry,
  ink: THREE.MeshBasicMaterial,
  position: THREE.Vector3,
  parent: THREE.Object3D,
  renderOrder = 14,
) {
  const mesh = new THREE.Mesh(geometry, ink);
  mesh.position.copy(position);
  mesh.renderOrder = renderOrder;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  parent.add(mesh);
  return mesh;
}

export function disposeLogoFaceGeometries(geometries: LogoFaceGeometries) {
  geometries.nose.dispose();
  geometries.mouthStem.dispose();
  geometries.mouthCurveL.dispose();
  geometries.mouthCurveR.dispose();
  geometries.eye.dispose();
}
