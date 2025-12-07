export class Character {
    constructor(config) {
        this.name = config.name;
        this.health = config.health;
        this.strength = config.strength;
        this.create = config.create;
        this.map_size = config.map_size;
        this.size = 0.3;
        this.position = [Math.random() * this.map_size[0] - this.map_size[0]/2, this.size / 2, Math.random() * this.map_size[1] - this.map_size[1]/2];
        this.ARM_SIZE = [0.08, 0.2, 0.08];

        this.moveTo = [null, null];
        this.action_markov_chain = {

        }
        
        
        this.fixed_parameters = {
            curiosity: Math.random(),   //好奇心
            sociability: Math.random(), //社交性
            max_energy: 100,            //最大エネルギー
            speed: 1 + Math.random(),   //速度
            aggression: Math.random(),  //攻撃性
            cooperation: Math.random(), //協調性
        }
        
        this.variable_parameters = {
            energy: this.fixed_parameters.max_energy, //エネルギー
            anger: 0,                                 //怒り
            foods:100,                                //食料
            water:100,                                //水分
            move_x:Math.random()*2-1,                       //移動方向x
            move_z:Math.random()*2-1,                       //移動方向z
        }

        this.body = this.create.group({
            position: this.position,
            children:[
                this.create.cube({ size: this.size, position: [0, 0, 0] }), //body
                this.create.cube({ size: this.ARM_SIZE, position: [this.size/2 + this.ARM_SIZE[0]/2, 0, 0], option:{color:"red"} }), //right arm
                this.create.cube({ size: this.ARM_SIZE, position: [-(this.size/2 + this.ARM_SIZE[0]/2), 0, 0], option:{color:"red"} }), //left arm
            ]
        })
        //this.create.cube({ size: this.size, position: this.position});
    }
    attack(target) {
        target.health -= this.strength;
        console.log(`${this.name} attacks ${target.name} for ${this.strength} damage!`);
    }

    move(){
        let dist = Math.sqrt((this.position[0]-this.moveTo[0])**2 + (this.position[2]-this.moveTo[1])**2);
        this.position[0] += ((this.moveTo[0]-this.position[0])/dist) * this.fixed_parameters.speed * 0.1;
        this.position[2] += ((this.moveTo[1]-this.position[2])/dist) * this.fixed_parameters.speed * 0.1;
        this.body.position.set(...this.position);

        if(dist < 0.5 || this.moveTo[0] === null){
            this.moveTo[0] = Math.random() * this.map_size[0] - this.map_size[0]/2;
            this.moveTo[1] = Math.random() * this.map_size[1] - this.map_size[1]/2;
        }
    }
}