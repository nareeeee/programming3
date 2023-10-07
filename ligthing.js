class Ligthing extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index)
        this.energy = 100;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y],
            // [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            // [this.x + 3, this.y + 3],
            [this.x + 4, this.y + 4],
            // [this.x, + 5, this.y + 5],
            [this.x + 6, this.y + 6]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }
    mul() {
        var newCell = random(this.chooseCell(1));
        var newCell1 = random(this.chooseCell(0));
        var newCell2 = random(this.chooseCell(5))
        if (newCell) {
            var newL = new Ligthing(newCell[0], newCell[1], this.index);
            ligthingArr.push(newL);
            matrix[newCell[1]][newCell[0]] = 4;
        }
        if (newCell1) {
            var newL = new Ligthing(newCell1[0], newCell1[1], this.index);
            ligthingArr.push(newL);
            matrix[newCell1[1]][newCell1[0]] = 4;
        }
        if (newCell2) {
            var newL = new Ligthing(newCell2[0], newCell2[1], this.index);
            ligthingArr.push(newL);
            matrix[newCell2[1]][newCell2[0]] = 4;
        }
    }
    kill() {
        let foods = this.chooseCell(2)
        let foods2 = this.chooseCell(3)
        let foods3 = this.chooseCell(1)
        let food = random(foods)
        let food2 = random(foods2)
        let food3 = random(foods3)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 5) {
                this.mul()
            }
        }
        if (food2) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food2[0]
            let newY = food2[1]
            matrix[food2[1]][food2[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 5) {
                this.mul()
            }
        }
        if (food3) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food3[0]
            let newY = food3[1]
            matrix[food3[1]][food3[0]] = 4
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy > 5) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.mul()
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        // let grassCells = this.chooseCell(1)
        // let newCell1 = random(grassCells)
        // if (newCell1) {
        //     let newX = newCell1[0]
        //     let newY = newCell1[1]
        //     matrix[this.y][this.x] = 0
        //     matrix[newY][newX] = 4
        //     this.x = newX
        //     this.y = newY
        // }
       if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
        }
        // else if (newCell1) {
        //     let newX = newCell1[0]
        //     let newY = newCell1[1]
        //     matrix[this.y][this.x] = 0
        //     matrix[newY][newX] = 4
        //     this.x = newX
        //     this.y = newY
        // }
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in ligthingArr) {
            if (this.x == ligthingArr[i].x && this.y == ligthingArr[i].y) {
                ligthingArr.splice(i, 1);

            }
            for (var i in grassArr) {
                if (Grass.x == grassArr[i].x && Grass.y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
        }
    }
}