class Piece {
    constructor (shape, ctx) {
        this.shape = shape;
        this.ctx = ctx;
        this.y = 0;
        this.x = Math.floor(COLS / 2);
    }

    renderPiece() {
        
        this.shape.map((row, i) => {
            row.map((cell, j) => {
                if (cell > 0) {
                    const x = (this.x + j);
                    const y = (this.y + i);

                    this.ctx.fillStyle = COLORS[cell];
                    this.ctx.fillRect(this.x + j, this.y + i, 1, 1);
                }
            })
        })
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
        
        if (this.fallingPiece ==! null) {
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
                row.map((cell, i) => {
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
}