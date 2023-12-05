// GridDrawer.js

export class GridDrawer {
  constructor(rows, columns, cellSize) {
    this.rows = rows;
    this.columns = columns;
    this.cellSize = cellSize;

    // Create a canvas element in the DOM
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');

    // Set the canvas size based on the number of rows, columns, and cell size
    this.canvas.width = columns * cellSize;
    this.canvas.height = rows * cellSize;
  }

  drawGrid(grid) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const cellValue = grid[i][j];
        const color = cellValue === 1 ? 'black' : 'white';

        this.context.fillStyle = color;
        this.context.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);

        // Add a border for better visibility
        this.context.strokeStyle = 'gray';
        this.context.strokeRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }
}
