export class Character {
    constructor(name, health, strength, create) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.size = 0.3;
        this.position = [Math.random() * 10-5, this.size / 2, Math.random() * 10-5];
        this.body = create.cube({ size: this.size, position: this.position});
        this.MOVE_MAX_LONG = 0.2;
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