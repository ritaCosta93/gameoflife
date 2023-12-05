// Rules.js
export class Rules {
    static applyRules(currentGrid) {
        const rows = currentGrid.length;
        const columns = currentGrid[0].length;

        // Create a copy of the current grid to store the next generation
        const nextGrid = [];
        const currentTime = new Date().getTime();

        // Loop through each cell in the current grid
        for (let i = 0; i < rows; i++) {
            const newRow = [];

            for (let j = 0; j < columns; j++) {
                const neighbors = this.countLiveNeighbors(currentGrid, i, j);

                const cellValue = currentGrid[i][j];
                const lastActiveTime = this.getLastActiveTime(cellValue);

                if (cellValue === 1) {
                    // Live cell
                    if (neighbors < 2 || neighbors > 3 || this.isInactive(lastActiveTime, currentTime)) {
                        // Rule 1: Any live cell with fewer than two live neighbors dies,
                        // Rule 3: Any live cell with more than three live neighbors dies,
                        // or Rule for inactivity: Mark cell as inactive if it's been inactive for too long
                        newRow.push(0); // Cell dies
                        
                    } else {
                        // Rule 2: Any live cell with two or three live neighbors lives on
                        newRow.push(1); // Cell lives
                    }
                } else {
                    // Dead cell
                    if (neighbors === 3) {
                        // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell
                        newRow.push(1); // Cell comes to life
                    } else {
                        // Dead cell remains dead
                        newRow.push(0);
                    }
                }
            }

            nextGrid.push(newRow);
        }

        return nextGrid;
    }


    static countLiveNeighbors(grid, row, col) {
        const rows = grid.length;
        const columns = grid[0].length;
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = (row + i + rows) % rows;
                const newCol = (col + j + columns) % columns;

                // Check if the neighbor is a live cell
                if (grid[newRow][newCol] === 1) {
                    count++;
                }
            }
        }

        // Exclude the cell itself from the count
        if (grid[row][col] === 1) {
            count--;
        }

        return count;
    }

    static getLastActiveTime(cellValue) {
        // Retrieve the last active time from the cell value
        return cellValue === 1 ? parseInt(cellValue / 10) : null;
    }

    static isInactive(lastActiveTime, currentTime) {
        // Set the threshold for inactivity to 1 minute (in milliseconds)
        const inactivityThreshold = 60000;
        if (lastActiveTime) {
            return currentTime - lastActiveTime > inactivityThreshold;
        }
        return false;
    }
}

