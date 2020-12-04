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
        url: `${baseUrl}/userrol/${idUser}`,
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

  getUserById(id){
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/users/${id}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }
  
  createUser(firstname, lastname, phone, email, ci, userpassword) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/users`,
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
        url: `${baseUrl}/userrol/${idUser}`,
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
  getAllUsersRol() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/userrol`,
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
  createUserRol(userId, rolId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/userrol/`,
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
        url: `${baseUrl}/userrol/${userId}/${rolId}`,
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

  getUserslogs() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/userslog`,
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

  getMateriasById(idMateria) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/materia/${idMateria}`,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  createMateria(carrera_idcarrera, namemateria) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/materia`,
        data: {
          carrera_idcarrera: carrera_idcarrera,
          namemateria: namemateria,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  updateMateria(idmateria, carrera_idcarrera, namemateria) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/materia/${idmateria}`,
        data: {
          carrera_idcarrera: carrera_idcarrera,
          namemateria: namemateria,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  deleteMateria(idMateria) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/materia/${idMateria}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }
  //Crud RoleFunc
  roleFunction(idRole, idFuncion) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/rolfun`,
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
        url: `${baseUrl}/rolfun`,
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
        url: `${baseUrl}/rolfun/${idRol}/${idFunc}`,
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
  //faltas CRUD
  createAbsence(userId, date, link) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/falta`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          users_idusers: userId,
          fecha: date,
          archivo: link,
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

  getAllUsersReport(userid) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/falta/user/${userid}`,
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

  getAbsenceById(AbsenceId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/falta/${AbsenceId}`,
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
  getAllAbsences() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/falta`,
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

  //Crud Horarios
  getHorarios() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/horario`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  getHorariosById(idHorario) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/horario/${idHorario}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  createHorario(facultad_idfacultad, horaini, horafin) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/horario`,
        data: {
          facultad_idfacultad: facultad_idfacultad,
          horaini: horaini,
          horafin: horafin,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  updateHorario(idHorario, facultad_idfacultad, horaini, horafin) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/horario/${idHorario}`,
        data: {
          facultad_idfacultad: facultad_idfacultad,
          horaini: horaini,
          horafin: horafin,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  deleteHorario(idHorario) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/horario/${idHorario}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }
  //Crud Grupos
  getGrupos() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/grupo`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  getGruposbyId(idGrupo) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/grupo/${idGrupo}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  createGrupo(materia_idmateria) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/grupo`,
        data: {
          materia_idmateria: materia_idmateria,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  updateGrupo(idGrupo, materia_idmateria) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/grupo/${idGrupo}`,
        data: {
          materia_idmateria: materia_idmateria,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  deleteGrupo(grupoId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/grupo/${grupoId}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }
  //Crud GrupoHorarios
  getGrupoHByUserId(userId){
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/grupoHorarios/user/${userId}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }
  getGrupoHorarios() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${baseUrl}/grupoHorarios`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  deleteGrupoHorario(grupoHorarioId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'DELETE',
        url: `${baseUrl}/grupoHorarios/${grupoHorarioId}`,
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  createGrupoHorario(horario_idhorario, grupo_idgrupo, users_idusers, dia) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/grupoHorarios`,
        data: {
          horario_idhorario: horario_idhorario,
          grupo_idgrupo: grupo_idgrupo,
          users_idusers: users_idusers,
          dia: dia,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  updateGrupoHorario(idGrupoHorario, horario_idhorario, grupo_idgrupo, users_idusers, dia) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: `${baseUrl}/grupoHorarios/${idGrupoHorario}`,
        data: {
          horario_idhorario: horario_idhorario,
          grupo_idgrupo: grupo_idgrupo,
          users_idusers: users_idusers,
          dia: dia,
        },
      })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
    });
  }

  sendEmail(email, password) {
    console.log('email', email);
    console.log('password', password)
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: `${baseUrl}/sendmail`,
        data: {
          email: email,
          userpassword: password,
        },
      })
        .then((response) => {
          console.log(' enviar email', response);
          resolve(response.data);
        })
        .catch((e) => {
          console.log('error enviar email', e);
          reject(e);
        });
    });
  }
  //Crud RegistroAvance
  registrarAvance(idgrupo,beginweek,endweek,platform,classcontain,observations,sign){
    return new Promise((resolve,reject)=>{
      axios({
        method:'POST',
        url:`${baseUrl}/assistance`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data: {
          grupohorarios_idgrupohorarios:idgrupo,
          beginweek:beginweek,
          endweek:endweek,
          platform:platform,
          classcontain:classcontain,
          observations:observations,
          sign:sign,
        },
      })
      .then((response) => resolve(response.data))
      .catch((e) => reject(e));
    })
  }
  getAllReports(){
    return new Promise((resolve,reject)=>{
      axios({
        method: 'GET',
        url: `${baseUrl}/assistance`,
        })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
      })
  }
  getReportsByWeek(date){
    return new Promise((resolve,reject)=>{
      axios({
        method: 'GET',
        url: `${baseUrl}/assistance/week/${date}`,
        })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e));
      })
  }
    //Crud ReporteAdicional
  registroReporteAdicional(idAsistencia,archivo){
    return new Promise((resolve,reject)=>{
      axios({
        method:"POST",
        url:`${baseUrl}/addicional`,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-cache',
        },
        data:{
          assistance_idassistance:idAsistencia,
          archivo:archivo,
        }
      }) 
      .then((response) => resolve(response.data))
      .catch((e) => reject(e));
    })
  }  
  
}

export default new BackendConnection();
