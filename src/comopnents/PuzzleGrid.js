import React, { useState,useEffect } from 'react';
import Tile from './Tile'
import { Fireworks } from 'fireworks/lib/react'
import { buildEmptyGrid, fillGrid, getGridTileMovement, isGridOrdered } from '../logic/grid'
import { tileMovement } from '../enums/tileMovement'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


export function PuzzleGrid() {
  
  const gridSize = 4
  
  const [isOrderd, setIsOrderd] = useState(false)
  const [puzzleGrid, setPuzzleGrid] = useState([])
  
  function buildPuzzle(size,shuffleGrid) {
      const emptyGird = buildEmptyGrid(size)
      const grid = fillGrid(emptyGird, size, shuffleGrid)
      setPuzzleGrid(grid);
  }
  
  useEffect(() => {
    buildPuzzle(gridSize,false)
  }, []);

  
  function updatePuzzleGrid(col, row, UpdatedColumn, updatedRow) {
    puzzleGrid[UpdatedColumn][updatedRow] = puzzleGrid[col][row]
    puzzleGrid[col][row] = undefined
    setPuzzleGrid([...puzzleGrid])
    setIsOrderd(isGridOrdered(puzzleGrid))
  }
   
  function onTileClick(props) {   
    if (!props.value)
      return
    
    const tileMove = getGridTileMovement(puzzleGrid, gridSize, props.col, props.row);
    console.log(tileMove)
    if (tileMove.move !== tileMovement.NONE) {
      updatePuzzleGrid(props.col, props.row, tileMove.col, tileMove.row)
    }
  }

  //fireworks
  const fxProps = {
    count: 3,
    interval: 200,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    })
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 50,
      width: 50,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container  spacing={2}>
            <Button variant="contained" onClick={() => { buildPuzzle(gridSize, true); }}>Shuffle</Button>
          </Grid>
        </Grid>
      </Grid>
      { isOrderd ? <div >
        <Fireworks {...fxProps} />
        <h1>Congrats!</h1>
      </div> : null}
      <Grid container className={classes.root} spacing={2}>
        {puzzleGrid.map((colItems, colIndex) => (
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {colItems.map((rowItems, rowIndex) => (
                <Tile
                  onClick={onTileClick}
                  key={rowItems}
                  value={rowItems}
                  col={colIndex}
                  row={rowIndex}
                />
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default PuzzleGrid


