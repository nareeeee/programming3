class Tsunami extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)

    }

    mul() {
        var newCell = random(this.chooseCell(0));
        var newCell1 = random(this.chooseCell(1));
        if (newCell) {
            var newT = new Tsunami(newCell[0], newCell[1], this.index);
            tsunamiArr.push(newT);
            matrix[newCell[1]][newCell[0]] = 5;
        }
        if (newCell1) {
            var newT = new Tsunami(newCell1[0], newCell1[1], this.index);
            tsunamiArr.push(newT);
            matrix[newCell1[1]][newCell1[0]] = 5;
        }
    }
    kill() {
        let foods = this.chooseCell(2)
        let food = random(foods)
        let foods1 = this.chooseCell(3)
        let food1 = random(foods1)
        let foods2 = this.chooseCell(4)
        let food2 = random(foods2)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 5
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 10) {
                this.mul()
            }
        }
        if (food1) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food1[0]
            let newY = food1[1]
            matrix[food1[1]][food1[0]] = 5
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 2) {
                this.mul()
            }
        }
        if (food2) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food2[0]
            let newY = food2[1]
            matrix[food2[1]][food2[0]] = 5
            this.x = newX
            this.y = newY
            for (var i in ligthingArr) {
                if (newX ==  ligthingArr[i].x && newY ==  ligthingArr[i].y) {
                    ligthingArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 10) {
                this.mul()
            }
        }
        else {
            this.move()
        }
        }
        move() {
            this.energy--
            let emptyCells = this.chooseCell(0)
            let newCell = random(emptyCells)
            if (newCell) {
                let newX = newCell[0]
                let newY = newCell[1]
                matrix[this.y][this.x] = 0
                matrix[newY][newX] = 5
                this.x = newX
                this.y = newY
            }

        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in tsunamiArr) {
            if (this.x == tsunamiArr[i].x && this.y == tsunamiArr[i].y) {
                tsunamiArr.splice(i, 1);
                break;
            }
        }
    }
}
