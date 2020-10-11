import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function TestUi(props) {
  const classes = useStyles();

  return (
    <div>
      <h1>TestUi</h1>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon/>}
      >
        Delete
      </Button>
    </div>
  );
}

export default TestUi;
