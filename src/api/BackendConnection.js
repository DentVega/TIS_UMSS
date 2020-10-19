import axios from 'axios';

class BackendConnection {
  login(email, password) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://tis-backend.herokuapp.com/login/${email}/${password}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then(user => {
          console.warn(user.data)
          resolve(user.data)
        })
        .catch(e => reject(e));
    });
  }

  getRoles() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://tis-backend.herokuapp.com/roles`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  createRole(rolename) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `https://tis-backend.herokuapp.com/roles`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          rolename: rolename,
        },
      })
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    });
  }

  updateRole(id, rolename) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `https://tis-backend.herokuapp.com/roles/${id}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          rolename: rolename,
        },
      })
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    });
  }

  deleteRole(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `https://tis-backend.herokuapp.com/roles/${id}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    });
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://tis-backend.herokuapp.com/users`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  createUser(firstname, lastname, phone, email, ci, userpassword) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `https://tis-backend.herokuapp.com/users`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          email: email,
          ci: ci,
          userpassword: userpassword,
        },
      })
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    });
  }

  updateUser(id, firstname, lastname, phone, email, ci, userpassword) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `https://tis-backend.herokuapp.com/users/${id}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          email: email,
          ci: ci,
          userpassword: userpassword,
        },
      })
        .then((response) => {
          console.warn(response);
          resolve(response);
        })
        .catch((e) => {
          console.warn(e.message);
          reject(e);
        });
    });
  }

  deleteUsers(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `https://tis-backend.herokuapp.com/users/${id}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }
}

export default new BackendConnection();
