import { init } from "easy-three";
const { camera, create, animate, controls, load, helper } = init("#content");
import { Character } from "./character.js";
// import { MapObject } from "./MapObjects.js";

const WALL_THICKNESS = 0.2;
const INITIAL_MAP_SIZE = [10, 10];
const INITIAL_WALL_SIZE_X = [INITIAL_MAP_SIZE[0] + WALL_THICKNESS*2, 1, WALL_THICKNESS];
const INITIAL_WALL_SIZE_Z = [WALL_THICKNESS, 1, INITIAL_MAP_SIZE[1] + WALL_THICKNESS*2];

let map_size = [...INITIAL_MAP_SIZE];
let char_count = 10;
let characters = [];
let wall_size_x = INITIAL_WALL_SIZE_X;
let wall_size_z = INITIAL_WALL_SIZE_Z;

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight(
    { intensity:10}
)
create.directionalLight()
helper.axes();
create.sky();

let ground = create.plane({
    size: INITIAL_MAP_SIZE,
    rotation:[-Math.PI/2, 0, 0],
    option:{
        map:load.texture("./texture/rocky_terrain_02_diff_1k.jpg", {
            repeat: [10, 10],
        }),
    }
})
let walls = [
    create.cube({ size:wall_size_x, position:[0,0.5,-(map_size[1]/2 + WALL_THICKNESS/2)], option:{ color:"white"} }),
    create.cube({ size:wall_size_x, position:[0,0.5,(map_size[1]/2 + WALL_THICKNESS/2)], option:{ color:"white"} }),
    create.cube({ size:wall_size_z, position:[-(map_size[0]/2 + WALL_THICKNESS/2),0.5,0], option:{ color:"white"} }),
    create.cube({ size:wall_size_z, position:[(map_size[0]/2 + WALL_THICKNESS/2),0.5,0], option:{ color:"white"} }),
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
    ground.scale.set(map_size[0]/ INITIAL_MAP_SIZE[0] , map_size[1]/INITIAL_MAP_SIZE[1], 1);
    wall_size_x = [map_size[0] + WALL_THICKNESS*2, 1, WALL_THICKNESS];
    wall_size_z = [WALL_THICKNESS, 1, map_size[1] + WALL_THICKNESS*2];

    for (let i = 0; i < walls.length; i++) {
        if (i < 2) {
            walls[i].scale.set(...wall_size_x.map((val, index) => val / INITIAL_WALL_SIZE_X[index]));
            walls[i].position.z = (i === 0) ? -(map_size[1]/2 + WALL_THICKNESS/2) : (map_size[1]/2 + WALL_THICKNESS/2);
        } else {
            walls[i].scale.set(...wall_size_z.map((val, index) => val / INITIAL_WALL_SIZE_Z[index]));
            walls[i].position.x = (i === 2) ? -(map_size[0]/2 + WALL_THICKNESS/2) : (map_size[0]/2 + WALL_THICKNESS/2);
        }
    }

    console.log(walls);
});