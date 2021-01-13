import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { routes } from '../router/RoutesConstants';
import { withRouter } from 'react-router-dom';
import { getUserslogs, getUsers } from '../redux/actions/indexthunk.actions';
import CardItem from '../components/CardItem';

function UserslogPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  const { userslogs, loading } = props.userslogsReducer;
  const { users } = props.usersReducer;

  useEffect(() => {
    if (loading) {
      props.getUserslogs();
      props.getUsers();
    }
  });

  const onClick = (item) => {
    props.history.push(`${routes.userslog}/${item.iduserslog}`);
  }

  return (
    <div>
      <h1>UsersLog</h1>
      {userslogs.length > 0 && userslogs.map((item) => {
        let text = "Usuario ";
        if(users.length > 0){
          const userSelected = users.filter((user) => user.idusers === item.users_idusers );
          text += userSelected[0].firstname + " ";
          text += userSelected[0].lastname + " hizo un ";
          //text += getTransaction(item.transaction_idtransaction);
        }
        if(item.check == 0){
          return (
            <div key={item.iduserslog}>
              <CardItem
                onClick={() => onClick(item)}
                text={text}
                secondaryText={getTransaction(item.transaction_idtransaction)}
                tercerText={getDate(item.datechange)}
                width={1000}
                showEditIcon={false}
                showDeleteIcon={false}
              />
              <div style={{ height: 20 }} />
            </div>
          );
        }
      })}
    </div>
  );
}

const getTransaction = (id) => {
  if(id === 1){
    return "DELETE";
  }else{
    if(id === 2){
      return "INSERT";
    }else{
      return "UPDATE";
    }
  }
}

const getDate = (date) => {
  let val = "";
  for(let i = 0; i < 10; i++){
    val += date.charAt(i);
  }
  return val;
}


const mapStateToProps = (state) => {
  return {
    app: state.app,
    usersReducer: state.usersReducer,
    userslogsReducer: state.userslogsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getUserslogs: () => dispatch(getUserslogs()),
  getTransaction: () => dispatch(getTransaction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserslogPage));
