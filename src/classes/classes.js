function random(max) {
    return Math.floor(Math.random() * max - 1)
}

class Color {
    red
    green
    blue

    constructor(red, green, blue) {
        this.red=red
        this.green=green
        this.blue=blue
    }

    getCssColor() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
    }

    static random() {
        return new Color(random(255), random(255), random(255))
    }
}

class Disk {
    size
    color
    constructor(size, color) {
        this.size=size
        this.color=color
    }
    isBiggerThan(disk) {
        return this.size > disk.size
    }
}

class Tower {
    id
    disks
    constructor(id, disks) {
        this.id=id
        this.disks=disks
    }
    put(disk) {
        this.disks.push(disk)
    }
    take() {
        return this.disks.pop()
    }
    canPut(disk) {
        return this.topDisk().isBiggerThan(disk)
    }
    topDisk() {
        return this.disks[this.disks.length - 1]
    }
}

class Game {
    towers
    numberOfDisks
    constructor(numberOfDisks) {
        this.numberOfDisks = numberOfDisks
        this.towers = [
            new Tower("A", this.initialDisks()),
            new Tower("B", []),
            new Tower("C", [])
        ]
    }
    initialDisks() {
        let disks = []
        for (let index = 1; index <= this.numberOfDisks; index++) {
            disks.push(new Disk(index, Color.random()))
        }
        return disks.reverse()
    }
    make(move) {
        let fromTower = this.towers.find(tower => tower.id == move.fromTowerId)
        let toTower = this.towers.find(tower => tower.id == move.toTowerId)

        let disk = fromTower.take()
        toTower.put(disk)
    }
    canMake(move) {
        let fromTower = this.towers.find(tower => tower.id == move.fromTowerId)
        let toTower = this.towers.find(tower => tower.id == move.toTowerId)
        let disk = fromTower.topDisk()
        return toTower.canPut(disk)
    }
    
}

class Move {
    fromTowerId
    toTowerId
    constructor(fromTowerId, toTowerId) {
        this.fromTowerId = fromTowerId
        this.toTowerId = toTowerId
    }
} 

export {Game, Move}