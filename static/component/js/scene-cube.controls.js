var controls = {
  scene: {
    rotation: {x:0, y:0, z:0},
    position: {x:0, y:0, z:0},
    scale: {x:1, y:1, z:1},
    size: 1
  },
  cube: {
    rotation: {x:0, y:0, z:0},
    position: {x:0, y:0, z:0},
    scale: {x:1, y:1, z:1},
    size: 1,
    vertices: [
      [1,3,1],
      [1,3,-1],
      [1,-1,1],
      [1,-1,-1],
      [-1,3,-1],
      [-1,3,1],
      [-1,-1,-1],
      [-1,-1,1],
    ],
    wireframe: false
  },
  buttons:{
    clone: function(){
      var name = 'clone';
      var geometry = cube.geometry.clone();
      var material = new THREE.MeshLambertMaterial({color:0xff44ff});
      var clone_cube = new THREE.Mesh(geometry, material);
      clone_cube.name = name;
      scene.remove(scene.getObjectByName(name));
      scene.add(clone_cube);
      return clone_cube;
    },
    outputObjects: function(){
      console.log(scene.children);
    }
  }
};
