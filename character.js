export class Character {
    constructor(name, health, strength, create) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.body = create.cube({ size: 1, position: [Math.random() * 5, 1, Math.random() * 5]});
    }
    attack(target) {
        target.health -= this.strength;
        console.log(`${this.name} attacks ${target.name} for ${this.strength} damage!`);
    }
}