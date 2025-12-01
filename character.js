class Character {
    constructor(name, health, strength) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }
    attack(target) {
        target.health -= this.strength;
        console.log(`${this.name} attacks ${target.name} for ${this.strength} damage!`);
    }
}