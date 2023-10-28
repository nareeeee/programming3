var LivingCreature = require('./LivingCreature')
let random = require("./random");

module.exports = class Human extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 80;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            // [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            // [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            // [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    move() {
            this.mull()
            this.energy--
            let emptyCells = this.chooseCell(0)
            let newCell = random(emptyCells)
            if (newCell) {
                let newX = newCell[0]
                let newY = newCell[1]
                matrix[this.y][this.x] = 0
                matrix[newY][newX] = 6
                this.x = newX
                this.y = newY
            }
            if (this.energy <= 0) {
                this.die()
            }
    }
    mull() {
        var newCell = random(this.chooseCell(5));
        var newCell1 = random(this.chooseCell(0));
        var newCell2 = random(this.chooseCell(2))
        if (newCell) {
            var newH = new Human(newCell[0], newCell[1], this.index);
            ligthingArr.push(newH);
            matrix[newCell[1]][newCell[0]] = 6;
        }
        if (newCell1) {
            var newH = new Human(newCell1[0], newCell1[1], this.index);
            ligthingArr.push(newH);
            matrix[newCell1[1]][newCell1[0]] = 6;
        }
        if (newCell2) {
            var newH = new Human(newCell1[0], newCell1[1], this.index);
            ligthingArr.push(newH);
            matrix[newCell1[1]][newCell1[0]] = 6;
        }
    }
    eat() {
        let foods = this.chooseCell(2)
        let food = random(foods)
        let foods1 = this.chooseCell(3)
        let food1 = random(foods1)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 6
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 18) {
                this.mull()
            }
        } else if (food1) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food1[0]
            let newY = food1[1]
            matrix[food1[1]][food1[0]] = 6
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 18) {
                this.mull()
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in humanArr) {
            if (this.x == humanArr[i].x && this.y == humanArr[i].y) {
                humanArr.splice(i, 1);
            }
        }
    }
}