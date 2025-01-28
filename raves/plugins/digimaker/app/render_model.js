// Inisialisasi Scene, Kamera, dan Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('model-container').appendChild(renderer.domElement);

// Menambahkan Cahaya
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Data Model
const modelData = {
  format_version: "1.12.0",
  minecraft: {
    geometry: [{
      description: {
        identifier: "geometry.baby_flame",
        texture_width: 64,
        texture_height: 64,
        visible_bounds_width: 4,
        visible_bounds_height: 2.5,
        visible_bounds_offset: [0,
          0.75,
          0]
      },
      bones: [{
        name: "ball",
        pivot: [0,
          0,
          -4],
        cubes: [{
          origin: [-3,
            0,
            -3],
          size: [6,
            5,
            6],
          uv: [18,
            15]
        },
          {
            origin: [2,
              -5,
              0],
            size: [0,
              9,
              12],
            pivot: [2,
              -1.5,
              6],
            rotation: [-17.5,
              0,
              5],
            uv: [0,
              0]
          },
          {
            origin: [-2,
              -2,
              3],
            size: [0,
              9,
              12],
            pivot: [-2,
              1.5,
              9],
            rotation: [-5,
              0,
              -5],
            uv: [0,
              0]
          },
          {
            origin: [1,
              1,
              0],
            size: [0,
              9,
              12],
            pivot: [1,
              4.5,
              6],
            rotation: [12.5,
              0,
              25],
            uv: [0,
              0]
          }]
      }]
    }]
  }
};

// Membuat Geometri Berdasarkan Data Model
function createGeometry(data) {
  const group = new THREE.Group();

  data.bones.forEach(bone => {
    bone.cubes.forEach(cube => {
      const geometry = new THREE.BoxGeometry(cube.size[0], cube.size[1], cube.size[2]);
      const material = new THREE.MeshStandardMaterial({
        color: 0xff5733, wireframe: true
      });
      const mesh = new THREE.Mesh(geometry, material);

      // Atur Posisi Berdasarkan Origin
      mesh.position.set(
        cube.origin[0] + cube.size[0] / 2,
        cube.origin[1] + cube.size[1] / 2,
        cube.origin[2] + cube.size[2] / 2
      );

      // Atur Rotasi (jika ada)
      if (cube.rotation) {
        mesh.rotation.x = THREE.MathUtils.degToRad(cube.rotation[0]);
        mesh.rotation.y = THREE.MathUtils.degToRad(cube.rotation[1]);
        mesh.rotation.z = THREE.MathUtils.degToRad(cube.rotation[2]);
      }

      group.add(mesh);
    });
  });

  return group;
}

// Tambahkan Model ke Scene
const model = createGeometry(modelData.minecraft.geometry[0]);
scene.add(model);

// Atur Kamera
camera.position.z = 10;

// Render Scene
function animate() {
  requestAnimationFrame(animate);
  model.rotation.y += 0.01; // Rotasi Model
  renderer.render(scene, camera);
}
animate();