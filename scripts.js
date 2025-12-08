import { init } from "easy-three";
const { camera, create, animate, controls, load, helper } = init("#content");
import { Character } from "./character.js";
import * as MapObject from "./MapObjects.js";

const WALL_THICKNESS = 0.2;
const INITIAL_MAP_SIZE = [10, 10];
const INITIAL_WALL_SIZE_X = [INITIAL_MAP_SIZE[0] + WALL_THICKNESS*2, 1, WALL_THICKNESS];
const INITIAL_WALL_SIZE_Z = [WALL_THICKNESS, 1, INITIAL_MAP_SIZE[1] + WALL_THICKNESS*2];

let mapSize = [...INITIAL_MAP_SIZE];
let charCount = 10;
let characters = [];
let wallSizeX = INITIAL_WALL_SIZE_X;
let wallSizeZ = INITIAL_WALL_SIZE_Z;

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight(
    { intensity:10}
)
create.directionalLight()
helper.axes();
create.sky();
create.water( "./texture/water/NormalMap-1.jpg",
  "./texture/water/NormalMap-2.jpg",
  {size:mapSize, position:[0, -0.01, 0]
});

// ground
let ground = create.plane({
    size: INITIAL_MAP_SIZE,
    rotation:[-Math.PI/2, 0, 0],
    segments: 100,
    option:{
        map:load.texture("./texture/rocky/rocky_terrain_02_diff_1k.jpg", {
            repeat: [10, 10],
        }),
        // wireframe:true,
    }
})

// walls
let walls = [
    create.cube({ size:wallSizeX, position:[0,0.5,-(mapSize[1]/2 + WALL_THICKNESS/2)], option:{ color:"white"} }),
    create.cube({ size:wallSizeX, position:[0,0.5,(mapSize[1]/2 + WALL_THICKNESS/2)], option:{ color:"white"} }),
    create.cube({ size:wallSizeZ, position:[-(mapSize[0]/2 + WALL_THICKNESS/2),0.5,0], option:{ color:"white"} }),
    create.cube({ size:wallSizeZ, position:[(mapSize[0]/2 + WALL_THICKNESS/2),0.5,0], option:{ color:"white"} }),
]

// map objects
let stoneModel, treeModel;
load.gltf("./models/namaqualand_boulder_03_1k.gltf").then(vrm => {
    stoneModel = vrm;
    stoneModel.scene.scale.set(0, 0, 0);
});
load.gltf("./models/tree_small_02_1k.gltf").then(vrm => {
    treeModel = vrm;
    treeModel.scene.scale.set(0, 0, 0);
});

// characters
for (let i = 0; i < charCount; i++) {
    let config = {
        name: `Character_${i}`,
        health: 100,
        strength: 10,
        create: create,
        mapSize: mapSize
    };
    let char = new Character(config);
    characters.push(char);
}

const river = new MapObject.River({
    width:5, 
    groundSegments:100,
    mapSize:mapSize, 
    ground:ground
});

animate(({ delta, time }) => {
    for (let char of characters) {
        char.move();
    }
})

function main(){
}

// Map Config update
document.getElementById("mapSubmit").addEventListener("click", () => {
    let input_x = document.getElementById("mapSizeX");
    let input_y = document.getElementById("mapSizeY");
    mapSize[0] = Math.min(Math.max(parseInt(input_x.value), 5), 50);
    mapSize[1] = Math.min(Math.max(parseInt(input_y.value), 5), 50);
    input_x.value = mapSize[0];
    input_y.value = mapSize[1];
    ground.scale.set(mapSize[0]/ INITIAL_MAP_SIZE[0] , mapSize[1]/INITIAL_MAP_SIZE[1], 1);
    wallSizeX = [mapSize[0] + WALL_THICKNESS*2, 1, WALL_THICKNESS];
    wallSizeZ = [WALL_THICKNESS, 1, mapSize[1] + WALL_THICKNESS*2];

    for (let i = 0; i < walls.length; i++) {
        if (i < 2) {
            walls[i].scale.set(...wallSizeX.map((val, index) => val / INITIAL_WALL_SIZE_X[index]));
            walls[i].position.z = (i === 0) ? -(mapSize[1]/2 + WALL_THICKNESS/2) : (mapSize[1]/2 + WALL_THICKNESS/2);
        } else {
            walls[i].scale.set(...wallSizeZ.map((val, index) => val / INITIAL_WALL_SIZE_Z[index]));
            walls[i].position.x = (i === 2) ? -(mapSize[0]/2 + WALL_THICKNESS/2) : (mapSize[0]/2 + WALL_THICKNESS/2);
        }
    }

    console.log(walls);
});