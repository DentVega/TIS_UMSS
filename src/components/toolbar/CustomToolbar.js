import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    height: 30,
  },
}));

function CustomToolbar(props) {
  const classes = useStyles();
  return (
    <div id={'Toolbar'} className={classes.content}>
      <h1>Derechos</h1>
    </div>
  );
}

export default CustomToolbar;
