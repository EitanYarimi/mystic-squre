import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

export function Tile(props) {
   
  const useStyles = makeStyles((theme) => ({
    
    paper: {
      cursor: theme.cursor,
      height: 50,
      width: 50,
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment  >
      <Grid item>
        <Paper className={classes.paper}>
          <span onClick={() => (props.onClick(props))} > {props.value ? props.value : 'x'} </span>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default Tile