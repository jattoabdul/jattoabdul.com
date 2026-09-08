import * as THREE from 'three';
import { clamp, smooth, timeline } from './timeline';

type Settings = { duration: number; travel: number; restart: number };

export async function createScene(canvas: HTMLCanvasElement, settings: Settings) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor('#000000');
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.06, 120);
  let released = false;
  const resources: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
  const keep = <T extends THREE.BufferGeometry | THREE.Material | THREE.Texture>(item: T): T => {
    if (released) {
      item.dispose();
      return item;
    }
    resources.push(item);
    return item;
  };
  const dispose = () => {
    released = true;
    resources.forEach(item => item.dispose());
    renderer.dispose();
  };
  let textures: THREE.Texture[];
  try {
    const loader = new THREE.TextureLoader();
    // Each fulfilled texture is registered even if a sibling request fails.
    textures = await Promise.all(
      ['/images/portrait-interim.png', '/images/cinematic/writing.png'].map(async url => {
        const texture = keep(await loader.loadAsync(url));
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      })
    );
  } catch (error) {
    dispose();
    throw error;
  }
  const dark = keep(
    new THREE.MeshStandardMaterial({ color: '#242323', roughness: 0.66, metalness: 0.15 })
  );
  const wood = keep(
    new THREE.MeshStandardMaterial({ color: '#792A3D', roughness: 0.7, metalness: 0.04 })
  );
  const brass = keep(
    new THREE.MeshStandardMaterial({ color: '#EFC9A3', roughness: 0.4, metalness: 0.6 })
  );
  const light = keep(new THREE.MeshBasicMaterial({ color: '#EFC9A3', toneMapped: false }));
  const floor = keep(new THREE.MeshStandardMaterial({ color: '#131920', roughness: 0.8 }));
  const depth = keep(new THREE.MeshStandardMaterial({ color: '#0A1220', roughness: 1 }));
  const cube = keep(new THREE.BoxGeometry(1, 1, 1));
  function box(parent: THREE.Object3D, material: THREE.Material, size: number[], pos: number[]) {
    const mesh = new THREE.Mesh(cube, material);
    mesh.scale.set(size[0], size[1], size[2]);
    mesh.position.set(pos[0], pos[1], pos[2]);
    parent.add(mesh);
    return mesh;
  }
  scene.add(new THREE.AmbientLight('#EFC9A3', 0.3));
  const key = new THREE.DirectionalLight('#FFF0DE', 1.8);
  key.position.set(-3, 6, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight('#647CA1', 0.35);
  fill.position.set(6, 2, 4);
  scene.add(fill);
  const entrance = new THREE.Group();
  entrance.position.x = 2.6;
  scene.add(entrance);
  const w = 2.7,
    h = 5;
  box(entrance, dark, [0.15, h + 0.25, 0.26], [-w / 2 - 0.08, 0, 0]);
  box(entrance, dark, [0.15, h + 0.25, 0.26], [w / 2 + 0.08, 0, 0]);
  box(entrance, dark, [w + 0.3, 0.16, 0.26], [0, h / 2 + 0.05, 0]);
  box(entrance, light, [w, 0.022, 0.24], [0, -h / 2 + 0.01, 0]);
  const hinge = new THREE.Group();
  hinge.position.set(w / 2, 0, 0.05);
  entrance.add(hinge);
  box(hinge, wood, [w, h, 0.12], [-w / 2, 0, 0]);
  box(hinge, brass, [0.045, 0.52, 0.09], [-w + 0.18, -0.25, 0.09]);
  box(entrance, floor, [5, 0.1, 5], [0, -2.6, 0.7]);
  const lamp = new THREE.PointLight('#EFC9A3', 12, 8, 2);
  lamp.position.set(2.6, -0.7, 1.6);
  scene.add(lamp);
  const portraitMaterial = keep(
    new THREE.MeshBasicMaterial({
      map: textures[0],
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    })
  );
  const portrait = new THREE.Mesh(keep(new THREE.PlaneGeometry(3.1, 3.1)), portraitMaterial);
  portrait.position.set(0, -0.3, -0.14);
  entrance.add(portrait);
  const rear = new THREE.Group();
  rear.position.set(2.6, 0, -8.5);
  scene.add(rear);
  const boardMaterial = keep(
    new THREE.MeshBasicMaterial({
      map: textures[1],
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    })
  );
  const board = new THREE.Mesh(keep(new THREE.PlaneGeometry(15, 8.4375)), boardMaterial);
  rear.add(board);
  const house = new THREE.Group();
  house.position.set(2.6, -1.4, -9);
  scene.add(house);
  // All rooms genuinely share this slab; the pullback reveals the same scene graph.
  box(house, floor, [17.6, 0.22, 4.8], [0, -1.15, 0.1]);
  box(house, light, [17.1, 0.025, 0.045], [0, -1.02, 2.48]);
  for (let i = 0; i < 5; i++) {
    const room = new THREE.Group();
    room.position.x = (i - 2) * 3.4;
    house.add(room);
    box(room, dark, [0.17, 3.5, 2.3], [-1.5, 0.65, 0]);
    box(room, dark, [0.17, 3.5, 2.3], [1.5, 0.65, 0]);
    box(room, dark, [3.17, 0.2, 2.3], [0, 2.4, 0]);
    box(room, depth, [3, 3.3, 0.12], [0, 0.6, -1.15]);
    box(room, wood, [0.18, 3.3, 0.1], [1.22, 0.6, -0.99]);
    box(room, light, [2.9, 0.025, 0.08], [0, -1.02, 1.17]);
    const glow = new THREE.PointLight('#EFC9A3', 7, 5, 2);
    glow.position.set(0, 1.4, 0.4);
    room.add(glow);
    if (i === 1 || i === 2 || i === 3) {
      box(room, wood, [1.9, 0.08, 0.7], [0, 0.03, 0.2]);
      [-0.75, 0.75].forEach(x => box(room, dark, [0.06, 1, 0.06], [x, -0.5, 0.2]));
      if (i === 2) box(room, brass, [0.5, 0.035, 0.4], [-0.25, 0.09, 0.2]);
      if (i === 3) box(room, depth, [0.75, 0.5, 0.08], [0, 0.34, 0.1]);
    } else {
      box(room, wood, [0.75, 0.08, 0.7], [0, -0.45, 0.1]);
      box(room, wood, [0.75, 0.7, 0.07], [0, -0.05, -0.2]);
      [-0.3, 0.3].forEach(x => box(room, dark, [0.06, 0.58, 0.06], [x, -0.74, 0.1]));
    }
  }
  let started = performance.now();
  let restart = settings.restart;
  let duration = settings.duration;
  let travel = settings.travel;
  let mobile = false;
  let lastWidth = 0;
  let lastHeight = 0;
  function resize() {
    const width = canvas.clientWidth,
      height = canvas.clientHeight;
    if (!width || !height || (width === lastWidth && height === lastHeight)) return;
    lastWidth = width;
    lastHeight = height;
    mobile = width < 700;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  }
  function needsFrame(time: number) {
    return (
      time - started < settings.duration * 1000 + 100 ||
      restart !== settings.restart ||
      duration !== settings.duration ||
      travel !== settings.travel
    );
  }
  function render(progress: number, time: number) {
    resize();
    if (restart !== settings.restart) {
      restart = settings.restart;
      started = time;
    }
    duration = settings.duration;
    travel = settings.travel;
    const t = timeline(progress);
    const opening = smooth(clamp((time - started) / (duration * 1000)));
    hinge.rotation.y = Math.max(opening, t.crossing) * Math.PI * 0.58;
    portraitMaterial.opacity = t.portrait;
    entrance.visible = progress < 0.5;
    lamp.intensity = 4 + 9 * opening;
    const startZ = mobile ? 16 : Math.max(10, 13 / camera.aspect);
    const startWidth = 2 * startZ * Math.tan(Math.PI / 9) * camera.aspect;
    const insideZ = mobile ? 1.5 : -2.7 * travel;
    let x = THREE.MathUtils.lerp(mobile ? 2.6 : 2.6 - startWidth * 0.21, 2.6, t.crossing);
    let y = THREE.MathUtils.lerp(mobile ? 3.4 : 0.2, mobile ? 2.4 : 0.1, t.crossing);
    let z = THREE.MathUtils.lerp(startZ, insideZ, t.crossing);
    x = THREE.MathUtils.lerp(x, 2.6, t.pullback);
    y = THREE.MathUtils.lerp(y, mobile ? 8 : 3.2, t.pullback);
    z = THREE.MathUtils.lerp(z, mobile ? 48 : 17, t.pullback);
    camera.position.set(x, y, z);
    // Fixed viewing direction prevents camera roll and keeps reverse scroll predictable.
    camera.rotation.set(0, 0, 0);
    boardMaterial.opacity =
      smooth(clamp((progress - 0.14) / 0.16)) * (1 - smooth(clamp((progress - 0.64) / 0.15)));
    const insideWidth = 2 * (insideZ + 8.5) * Math.tan(Math.PI / 9) * camera.aspect;
    board.position.y = mobile ? 0.2 : -0.4;
    board.position.x = mobile ? insideWidth * 0.18 : 0;
    board.scale.setScalar((insideWidth * (mobile ? 1.6 : 1.25)) / 15);
    house.visible = progress > 0.62;
    entrance.scale.setScalar(mobile ? 0.9 : 1);
    renderer.render(scene, camera);
  }
  resize();
  return { render, resize, needsFrame, dispose };
}
