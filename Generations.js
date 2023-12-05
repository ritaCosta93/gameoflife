// Generations.js
import { Grid } from './Grid.js';
import { GridDrawer } from './GridDrawer.js';
import { Rules } from './Rules.js';

export class Generations {
  constructor(rows, columns, cellSize, numGenerations) {
    this.rows = rows;
    this.columns = columns;
    this.cellSize = cellSize;
    this.numGenerations = numGenerations;
    this.gridGenerator = new Grid(rows, columns);
    this.currentGrid = this.gridGenerator.grid;
    this.gridDrawer = new GridDrawer(rows, columns, cellSize, document.getElementById('myCanvas'));
    
  }

  async runGenerations() {
    while (true) {
      let generation = 0;

      while (generation < this.numGenerations) {
        this.gridDrawer.drawGrid(this.currentGrid);
        this.currentGrid = Rules.applyRules(this.currentGrid);

        await this.sleep(100);

        if (this.isGridEmpty(this.currentGrid)) {
          console.log('All cells are dead. Stopping simulation.');
          return;
        }

        generation++;
      }

      if (this.isEveryoneAlive(this.currentGrid)) {
        console.log(`Valid generation found: ${this.numGenerations}`);
        this.numGenerations++;
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isGridEmpty(grid) {
    return grid.every(row => row.every(cell => cell === 0));
  }

  isEveryoneAlive(grid) {
    return grid.every(row => row.every(cell => cell === 1));
  }
}
