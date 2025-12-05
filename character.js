export class Character {
    constructor(name, health, strength, create) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.size = 0.3;
        this.position = [Math.random() * 10-5, this.size / 2, Math.random() * 10-5];
        this.body = create.cube({ size: this.size, position: this.position});
        this.MOVE_MAX_LONG = 0.2;

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
        }
    }
    attack(target) {
        target.health -= this.strength;
        console.log(`${this.name} attacks ${target.name} for ${this.strength} damage!`);
    }

    move(){
        this.body.position.x += (Math.random() - 0.5) * this.MOVE_MAX_LONG;
        this.body.position.z += (Math.random() - 0.5) * this.MOVE_MAX_LONG;
    }
}