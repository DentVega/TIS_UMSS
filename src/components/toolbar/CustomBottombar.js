import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colorMain, colorWhite } from '../../constants/colors';
import { Grid } from '@material-ui/core';
import { sCopyright } from '../../constants/strings';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    backgroundColor: colorMain,
    position:"fixed",
    bottom:0
  },
  appbar: {
    backgroundColor: colorMain,
    color: colorMain,
    background: colorMain,
    width: '100%',
  },
  item: {
    margin: 5,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colorMain,
  },
  text: {
    color: colorWhite
  },
}));

function CustomBottombar() {
  const classes = useStyles();
  return (
    <Grid container id={'Toolbar'} className={classes.content} direction="row" justify="space-between">
      <Grid item className={classes.item}>
        <h3 className={classes.text}>{sCopyright}</h3>
      </Grid>
      <Grid item className={classes.item}>
        <a href={"mailto: dentvega6@gmail.com?subject = Feeback"} className={classes.text}>Contactanos</a>
      </Grid>
    </Grid>
  );
}

export default CustomBottombar;
