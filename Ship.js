const LASER_DAMGE = 2

export default class Ship {
    constructor(url, health, speed) {
        this.url = url
        this.health = health
        this.speed = speed
        this.energy = 5
    }

    laserAttack() {
        return LASER_DAMGE
    }


}