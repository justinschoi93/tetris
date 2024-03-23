class GameModel {
    constructor(ctx) {
        this.ctx = ctx;
        this.fallingPiece = null; // will be a piece
        this.grid = this.makeStartingGrid();
    }

    makeStartingGrid() {
        let grid = [];

        for (let i = 0; i < ROWS; i++ ) {
            grid.push([])
            for (let j = 0; j < COLS; j++) {
                grid[grid.length - 1].push(0);
            }
        }
        return grid;
    }

    collision(x, y) {
        const shape = this.fallingPiece.shape;
        const n = shape.length;
        
        for (let i = 0; i < n; i++ ) {
            for (let j = 0; j < n; j++) {
                if (shape[i][j] > 0) {
                    let p = x + j;
                    let q = y + i;
                    if (p >= 0 && p < COLS && q < ROWS) {
                        //in bounds
                        if (this.grid[q][p] > 0){
                            return true; //rect is filled
                        } 
                    } else {
                        return true;
                    }
                }
            }
        }
        return false;
}

    renderGameState() {
        for (let i = 0 ; i < this.grid.length; i++ ) {
            for (let j = 0; j < this.grid.length; j++ ) {
                let cell = this.grid[i][j];
                this.ctx.fillStyle = COLORS[cell];
                this.ctx.fillRect(j, i, 1, 1);
            }
        }
        
        if (this.fallingPiece !== null) {
            this.fallingPiece.renderPiece();
        }
    };

    moveDown(){
        if (this.fallingPiece === null) {
            this.renderGameState();
            return 
        } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
            const shape = this.fallingPiece.shape;
            const x = this.fallingPiece.x;
            const y = this.fallingPiece.y;

            shape.map((row, i) => {
                row.map((cell, j) => {
                    let p = x + j;
                    let q = y + i;
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        this.grid[q][p] = shape[i][j]
                        }
                    })
                })

                if (this.fallingPiece === 0) {
                    alert("GAME OVER!");
                    this.grid = this.makeStartingGrid()
                }
                this.fallingPiece = null;
        } else {
            this.fallingPiece.y += 1;
        }
        this.renderGameState();
    };

    move(right) {
        if (this.fallingPiece === null) {
            return
        }
        
        let x = this.fallingPiece.x;
        let y = this.fallingPiece.y;

        if (right) {
            if (!this.collision(x + 1, y)) {
                this.fallingPiece.x += 1;
            }
        } else {
            if (!this.collision(x - 1, y)) {
                this.fallingPiece.x -=1;
            }
        }
        this.renderGameState();
    }

    rotate() {
        if (this.fallingPiece) {
            let shape = this.fallingPiece.shape
            //transpose of matrix
            for (let y = 0; y < shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [this.fallingPiece.shape[x][y], this.fallingPiece.shape[y][x]] = 
                    [this.fallingPiece.shape[y][x], this.fallingPiece.shape[x][y]]
                }
            }

            //reverse order of rows
            this.fallingPiece.shape.forEach((row => row.reverse()))
        }
        this.renderGameState();
    }
}

document.addEventListener("keydown", (e) => {
    console.log(e.key);
    e.preventDefault()
    switch(e.key) {
        case "ArrowUp":
            model.rotate()
            break
        case "ArrowRight": 
            model.move(true)
            break
        case "ArrowDown":
            model.moveDown()
            break
        case "ArrowLeft": 
            model.move(false)
            break;
    }
})