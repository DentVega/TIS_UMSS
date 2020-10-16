import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing(1),
  },
  space: {
    width: 200,
  },
}));
function CardItem(props) {
  const { text, showIconRow, width, onClick, showEditIcon, showDeleteIcon } = props;
  const classes = useStyles();
  return (
    <div style={{ width: width ? width : 'auto' }}>
      <Card className={classes.content} onClick={onClick ? onClick : () => {}}>
        <Grid container alignItems="center">
          <h3>{text}</h3>
          <div className={classes.space} />
          {showIconRow && <ArrowForwardIosIcon />}
          {showEditIcon && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
          {showDeleteIcon && (
            <IconButton style={{ paddingLeft: 20, paddingRight: 20 }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
      </Card>
    </div>
  );
}

CardItem.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number,
  showIconRow: PropTypes.bool,
  showEditIcon: PropTypes.bool,
  showDeleteIcon: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CardItem;