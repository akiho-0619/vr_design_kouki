import { init } from "easy-three";
const { camera, create, animate, controls, load, helper } = init("#content");
import { Character } from "./character.js";
// import { MapObject } from "./MapObjects.js";

let map_size = [10, 10];
let char_count = 10;
let characters = [];
let wall_thickness = 0.2;
let wall_size_x = [map_size[0] + wall_thickness*2, 1, wall_thickness];
let wall_size_z = [wall_thickness, 1, map_size[1] + wall_thickness*2];

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight(
    { intensity:10}
)
create.directionalLight()
helper.axes();
create.sky();

let ground = create.plane({
    size: map_size,
    rotation:[-Math.PI/2, 0, 0],
    option:{
        map:load.texture("./texture/rocky_terrain_02_diff_1k.jpg", {
            repeat: [10, 10],
        }),
    }
})
let walls = [
    create.cube({ size:wall_size_x, position:[0,0.5,-(map_size[1]/2 + wall_thickness/2)], option:{ color:"white"} }),
    create.cube({ size:wall_size_x, position:[0,0.5,(map_size[1]/2 + wall_thickness/2)], option:{ color:"white"} }),
    create.cube({ size:wall_size_z, position:[-(map_size[0]/2 + wall_thickness/2),0.5,0], option:{ color:"white"} }),
    create.cube({ size:wall_size_z, position:[(map_size[0]/2 + wall_thickness/2),0.5,0], option:{ color:"white"} }),
]

let stoneModel, treeModel;

load.gltf("./models/namaqualand_boulder_03_1k.gltf").then(vrm => {
    stoneModel = vrm;
    stoneModel.scene.scale.set(0, 0, 0);
});
load.gltf("./models/tree_small_02_1k.gltf").then(vrm => {
    treeModel = vrm;
    treeModel.scene.scale.set(0, 0, 0);
});

for (let i = 0; i < char_count; i++) {
    let config = {
        name: `Character_${i}`,
        health: 100,
        strength: 10,
        create: create,
        map_size: map_size
    };
    let char = new Character(config);
    characters.push(char);
}


animate(({ delta, time }) => {
    for (let char of characters) {
        char.move();
    }
})

function main(){
}

document.getElementById("mapSubmit").addEventListener("click", () => {
    map_size[0] = parseInt(document.getElementById("mapSizeX").value);
    map_size[1] = parseInt(document.getElementById("mapSizeY").value);

    ground.size = map_size;
    console.log(map_size);
    wall_size_x = [map_size[0] + wall_thickness*2, 1, wall_thickness];
    wall_size_z = [wall_thickness, 1, map_size[1] + wall_thickness*2];

    for (let i = 0; i < walls.length; i++) {
        if (i < 2) {
            walls[i].size = wall_size_x;
            walls[i].position.z = (i === 0) ? -(map_size[1]/2 + wall_thickness/2) : (map_size[1]/2 + wall_thickness/2);
        } else {
            walls[i].size = wall_size_z;
            walls[i].position.x = (i === 2) ? -(map_size[0]/2 + wall_thickness/2) : (map_size[0]/2 + wall_thickness/2);
        }
    }

    console.log(walls);
});