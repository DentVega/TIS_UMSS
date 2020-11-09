import axios from 'axios';
import { baseUrl } from './Keys';

class BackendConnection {
  login(email, password) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/login/${email}/${password}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((user) => {
          console.warn(user.data);
          resolve(user.data);
        })
        .catch((e) => reject(e));
    });
  }

  getRoles() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/roles`,
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
        url: `${baseUrl}/roles`,
        data: {
          rolename: rolename,
        },
      })
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    });
  }

  getUserRol(idUser) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/userRol/${idUser}`,
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

  updateRole(id, rolename) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/roles/${id}`,
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
        url: `${baseUrl}/roles/${id}`,
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
        url: `${baseUrl}/users`,
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
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  updateUser(id, firstname, lastname, phone, email, ci, userpassword) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/users/${id}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          email: email,
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
        url: `${baseUrl}/users/${id}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  verifyEmail(email) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/users/email/${email}`,
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

  getUserRolByIdUser(idUser) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/userRol/${idUser}`,
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

  createUserRol(userId, rolId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/userRol/`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          users_idusers: userId,
          roles_idroles: rolId,
        },
      })
        .then((response) => {
          console.warn('response save role', response);
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  deleteUserRol(userId, rolId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/userRol/${userId}/${rolId}`,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getSchools() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/facultad`,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  createSchools(namefacultad) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/facultad`,
        data: {
          namefacultad: namefacultad,
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

  updateSchools(idFacultad, namefacultad) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/facultad/${idFacultad}`,
        data: {
          namefacultad: namefacultad,
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

  deleteSchools(idFacultad) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/facultad/${idFacultad}`,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getCarreras() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/carrera`,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  createCareer(facultad_idfacultad, namecarrera) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/carrera`,
        data: {
          facultad_idfacultad: facultad_idfacultad,
          namecarrera: namecarrera,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  updateCareer(idCarrera, facultad_idfacultad, namecarrera) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/carrera/${idCarrera}`,
        data: {
          facultad_idfacultad: facultad_idfacultad,
          namecarrera: namecarrera,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  deleteCareer(facultad_idfacultad) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/carrera/${facultad_idfacultad}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  getMaterias() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/materia`,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  roleFunction(idRole, idFuncion) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `https://tis-backend.herokuapp.com/rolfun`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          roles_idroles: idRole,
          funcion_idfuncion: idFuncion,
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

  getRoleFuncs() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://tis-backend.herokuapp.com/rolfun`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          console.warn(e.message);
          reject(e);
        });
    });
  }

  deleteRoleFunc(idRol, idFunc) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `https://tis-backend.herokuapp.com/rolfun/${idRol}/${idFunc}`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          console.warn(e.message);
          reject(e);
        });
    });
  }
}

export default new BackendConnection();
