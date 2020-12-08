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
    position:"relative"
  },
  content: {
    padding: theme.spacing(1),
  },
  space: {
    width:200
  },
}));

function CardItem(props) {
  const {
    text,
    secondaryText,
    tercerText,
    showIconRow,
    width,
    onClick,
    showEditIcon,
    editClick,
    showDeleteIcon,
    deleteClick,
  } = props;
  const classes = useStyles();
  return (
    <div style={{ width: width ? width : 'auto', }}>
      <Card className={classes.content} onClick={onClick ? onClick : () => {}} >
        <Grid container alignItems="center" >
          <Grid item xs={3}>          
            <h3>{text}</h3>
            </Grid>
            <Grid item xs={3}>
            {secondaryText && <h3>{secondaryText}</h3>}
            </Grid>
            <Grid item xs={3}>
            {tercerText && <h3>{tercerText}</h3>}
            </Grid> 
            <Grid item xs={1}>
          {showIconRow && <ArrowForwardIosIcon />}
          </Grid> 
          <Grid item xs={1}>
          {showEditIcon && (
            <IconButton onClick={editClick}>
              <EditIcon />
            </IconButton>
          )}
          </Grid> 
          <Grid item xs={1}>
          {showDeleteIcon && (
            <IconButton style={{ paddingLeft: 20, paddingRight: 20 }} onClick={deleteClick}>
              <DeleteIcon />
            </IconButton>
          )}
          </Grid> 
        </Grid>
      </Card>
    </div>
  );
}

CardItem.propTypes = {
  text: PropTypes.string,
  secondaryText: PropTypes.string,
  tercerText: PropTypes.string,
  width: PropTypes.number,
  showIconRow: PropTypes.bool,
  showEditIcon: PropTypes.bool,
  showDeleteIcon: PropTypes.bool,
  onClick: PropTypes.func,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
};

export default CardItem;
