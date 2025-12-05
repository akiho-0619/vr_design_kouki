export class Character {
    constructor(name, health, strength, create, map_size) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.create = create;
        this.map_size = map_size;
        this.size = 0.3;
        this.position = [Math.random() * map_size[0] - map_size[0]/2, this.size / 2, Math.random() * map_size[1] - map_size[1]/2];
        
        
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

        this.body = create.cube({ size: this.size, position: this.position});
    }
    attack(target) {
        target.health -= this.strength;
        console.log(`${this.name} attacks ${target.name} for ${this.strength} damage!`);
    }

    move(){
        this.position[0] += this.variable_parameters.move_x * this.fixed_parameters.speed * 0.1;
        this.position[2] += this.variable_parameters.move_z * this.fixed_parameters.speed * 0.1;
        if (this.position[0] >this.map_size[0]/2){
            this.variable_parameters.move_x = Math.random()*-1;
        }
        else if (this.position[0] <-this.map_size[0]/2){
            this.variable_parameters.move_x = Math.random();
        }
        if (this.position[2] >this.map_size[1]/2){
            this.variable_parameters.move_z = Math.random()*-1;
        }
        else if (this.position[2] <-this.map_size[1]/2){
            this.variable_parameters.move_z = Math.random();
        }
        this.body.position.x = this.position[0];
        this.body.position.z = this.position[2];
    }
}