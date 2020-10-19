import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

function CampusPage() {
  const classes = useStyles();

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };

  const newUser = () => {};

  return (
    <div>
      <h1>Usuarios</h1>

      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newUser}>
        {fab.icon}
      </Fab>
    </div>
  );
}

export default CampusPage;
