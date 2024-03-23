class GameModel {
    constructor(ctx) {
        this.ctx = ctx;
        this.fallingPiece = null; // will be a piece
        this.grid = this.makeStartingGrid();
    }

    makeStartingGrid() {
        let grid = [];
        for (let i = 0; i < ROMS; i++ ) {
            for (let j = 0; j < COLS; j++) {
                grid[grid.length - 1].push(0);
            }
        }
        return grid;
    }
}