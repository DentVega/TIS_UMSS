import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(5),
  },
}));

function FloatingButton(props) {
  const { onClick } = props;
  const classes = useStyles();
  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon/>,
    label: 'Add',
  };

  return (
    <div>
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={onClick}>
        {fab.icon}
      </Fab>
    </div>
  );
}

export default FloatingButton;
