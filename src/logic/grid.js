import _ from 'lodash'
import { tileMovement } from '../enums/tileMovement'

export function buildEmptyGrid(size) {
    return Array.from(Array(size), () => Array(size).fill(undefined))   
}
  
export function fillGrid(grid, gridSize, shuffle = false) {
  grid.forEach((rowItems, rowIndex) => {
    rowItems.forEach((colItems, colIndex) => {
      grid[rowIndex][colIndex] = calcGridValue(rowIndex, colIndex, gridSize)
    })
  })

  return grid = shuffle ? _.shuffle(grid) : grid
  
}

export function isGridOrdered(grid) {
  
  const flatArray = grid.flat()
  if (!flatArray[flatArray.length - 1]) {
    return flatArray.filter(x => x).slice(1).every((item, i) => flatArray[i] <= item)
  }
  return false
}

export function calcGridValue(rowIndex, colIndex, gridSize) {
  
  // set empty value for last tile
  if (rowIndex === gridSize - 1 && colIndex === gridSize - 1) {
    return undefined
  }

  return rowIndex * gridSize + colIndex + 1;
}

export function shuffleGrid(grid) {
   return _.shuffle(grid)
}

export function getGridTileMovement(grid, gridSize, col, row) {
    
  const leftRowIndex = row - 1
  const rightRowIndex = row + 1
  const downColIndex = col + 1
  const upColIndex = col - 1
  
  if (leftRowIndex >= 0 && !grid[col][leftRowIndex]) {
    return new TileMove(tileMovement.LEFT, col, leftRowIndex);
  }
    
  if (rightRowIndex <= gridSize - 1 && !grid[col][rightRowIndex]) {
    return new TileMove(tileMovement.right, col, rightRowIndex);
  }

  if (downColIndex <= gridSize - 1 && !grid[downColIndex][row]) {
    return new TileMove(tileMovement.DOWN, downColIndex, row);
  }
     
  if (upColIndex >= 0 && !grid[upColIndex][row]) {
    return new TileMove(tileMovement.UP, upColIndex, row);
  }
  
  return new TileMove(tileMovement.NONE);
}
  
class TileMove {
  constructor(tileMovement, col, row) {
    this.move = tileMovement
    this.col = col;
    this.row = row;
  }
}
