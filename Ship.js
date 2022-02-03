const LASER_DAMAGE = 2
const BASE_SHIELD = 2
const PROJECTILE_DAMAGE = 4

export default class Ship {
    constructor(url, health, speed) {
        this.url = url
        this.health = health
        this.speed = speed
        this.energy = 5
        this.shield = 0;
    }

    laserAttack() {
        return LASER_DAMAGE
    }

    activateShield() {
        this.shield += 2
    }

    activateThrusters() {
        this.speed += 2
    }

    projectileAttack() {
        return PROJECTILE_DAMAGE
    }

    // for AI actions and possibly friendly AI actions
    battleActions() {
        let actions = []
        while(this.energy != 0) {
            actions.push({damage: this.laserAttack(), energy: 1})
            this.energy -= 1         
        }
        return actions
    }
}