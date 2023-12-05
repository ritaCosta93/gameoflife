// Grid.js
export class Grid {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.generateGrid();
  }

  generateGrid() {
    const grid = [];

    for (let i = 0; i < this.rows; i++) {
      const row = [];

      for (let j = 0; j < this.columns; j++) {
        row.push(Math.floor(Math.random() * 2));
      }

      grid.push(row);
    }

    return grid;
  }

 
}
