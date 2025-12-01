import { init } from "easy-three";
const { camera, create, animate, controls, load } = init();

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight(
    { intensity:10}
)
create.directionalLight()
create.cube()

const ground = create.plane({
    size:10,
    rotation:[-Math.PI/2, 0, 0],
    option:{
        map:load.texture("./texture/rocky_terrain_02_diff_1k.jpg", {
            repeat: [10, 10],
        }),
    }
})

const stone_model = models.load("./models/namaqualand_boulder_03_1k.gltf")
const tree_model = models.load("./models/tree_small_02_1k.gltf")

animate(({ delta, time }) => {
    
})

function main(){
}