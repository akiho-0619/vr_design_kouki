import { init } from "easy-three";
const { camera, create, animate, controls, load, helper } = init("#content");
import { Character } from "./character.js";
// import { MapObject } from "./MapObjects.js";

let map_size = [20, 20];
let char_count = 10;
let characters = [];

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight(
    { intensity:10}
)
create.directionalLight()
helper.axes();
create.sky();

let ground = create.plane({
    size:10,
    rotation:[-Math.PI/2, 0, 0],
    option:{
        map:load.texture("./texture/rocky_terrain_02_diff_1k.jpg", {
            repeat: [10, 10],
        }),
    }
})
let walls = [
    create.cube({ size:[10.2,1,0.2], position:[0,0.5,-5.1], option:{ color:"white"} }),
    create.cube({ size:[10.2,1,0.2], position:[0,0.5,5.1], option:{ color:"white"} }),
    create.cube({ size:[0.2,1,10.2], position:[-5.1,0.5,0], option:{ color:"white"} }),
    create.cube({ size:[0.2,1,10.2], position:[5.1,0.5,0], option:{ color:"white"} }),
]
console.log(walls);

let stoneModel, treeModel;

// load.gltf("./models/namaqualand_boulder_03_1k.gltf").then(vrm => {
//     stoneModel = vrm;
//     stoneModel.scene.scale.set(0.5, 0.5, 0.5);
// });
// load.gltf("./models/tree_small_02_1k.gltf").then(vrm => {
//     treeModel = vrm;
//     treeModel.scene.scale.set(0.5, 0.5, 0.5);
// });

for (let i = 0; i < char_count; i++) {
    let char = new Character(`Character_${i}`, 100, 10, create);
    characters.push(char);
}

console.log(characters);



animate(({ delta, time }) => {
    for (let char of characters) {
        char.move();
    }
})

function main(){
}