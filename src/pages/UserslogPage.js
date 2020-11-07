import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserslogs } from '../redux/actions/indexthunk.actions';
import CardItem from '../components/CardItem';

function UserslogPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  const { userslogs, loading } = props.userslogsReducer;
  const { getUserslogs } = props;

  useEffect(() => {
    if (loading) {
      getUserslogs();
    }
  });

  const onClick = (id) => {
    console.log(id);
  }

  return (
    <div>
      <h1>UsersLog</h1>
      {userslogs.length > 0 && userslogs.map((item) => {
        return (
          <div key={item.iduserslog}>
            <CardItem
              onClick={() => onClick(item.iduserslog)}
              text={getTransaction(item.transaction_idtransaction)}
              width={500}
              showEditIcon={false}
              showDeleteIcon={false}
            />
            <div style={{ height: 20 }} />
          </div>
        );
      })}
    </div>
  );
}

const getTransaction = (id) => {
  if(id == 1){
    return "DELETE";
  }else{
    if(id == 2){
      return "UPDATE";
    }else{
      return "INSERT";
    }
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userslogsReducer: state.userslogsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserslogs: () => dispatch(getUserslogs()),
  getTransaction: () => dispatch(getTransaction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserslogPage));
