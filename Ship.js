const LASER_DAMAGE = 2

export default class Ship {
    constructor(url, health, speed) {
        this.url = url
        this.health = health
        this.speed = speed
        this.energy = 5
    }

    laserAttack() {
        return LASER_DAMAGE
    }

    // for AI actions and possibly friendly AI actions
    battleActions() {
        let damage = 0;
        while(this.energy != 0) {
            damage += this.laserAttack()
            this.energy -= 1
        }
        this.energy = 5
        return damage
    }

}