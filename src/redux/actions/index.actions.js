import * as actions from './actions';
import { CHANGE_GRUPO } from './actions';

export const changeTabIndex = (index) => {
  return { type: actions.CHANGE_TAB_INDEX, index };
};

export const cleanAllReducers = () => {
  return { type: actions.CLEAN_ALL_REDUCERS };
};

export const openDrawer = () => {
  return { type: actions.OPEN_DRAWER };
};

export const changeUser = (user) => {
  return { type: actions.CHANGE_USER, user };
};

export const changeRoles = (roles) => {
  return { type: actions.CHANGE_ROLES, roles };
};

export const changeRole = (role) => {
  return { type: actions.CHANGE_ROLE, role };
};
export const changeUserRole = (userRole) => {
  return { type: actions.CHANGE_USER_ROLE, userRole };
};

export const changeUsers = (users) => {
  return { type: actions.CHANGE_USERS, users };
};

export const changeUserSelected = (userSelected) => {
  return { type: actions.CHANGE_USER_SELECTED, userSelected };
};

export const changeUserslogs = (userslogs) => {
  return { type: actions.CHANGE_USERSLOGS, userslogs };
}

export const changeUserslog = (userslog) => {
  return { type: actions.CHANGE_USERSLOG, userslog };
}
export const changeSchools = (schools) => {
  return { type: actions.CHANGE_SCHOOLS, schools };
};

export const changeSchool = (school) => {
  return { type: actions.CHANGE_SCHOOL, school };
};

export const changeCarreras = (careers) => {
  return { type: actions.CHANGE_CARRERAS, careers };
};

export const changeCarrera = (career) => {
  return { type: actions.CHANGE_CARRERA, career };
};

export const changeFacultadFiltro = (facultadSeleccionada) => {
  return { type: actions.CHANGE_FACULTAD_SELECCIONADA_FILTRO, facultadSeleccionada };
};

export const changeCarreraFiltro = (carreraSeleccionada) => {
  return { type: actions.CHANGE_CARRERA_SELECCIONADA_FILTRO, carreraSeleccionada };
};

export const changeMateriaFiltro = (materiaSeleccionada) => {
  return { type: actions.CHANGE_MATERIA_SELECCIONADA_FILTRO, materiaSeleccionada }
};

export const changeRoleFuncs = (roleFuncs) => {
  return { type: actions.CHANGE_ROLEFUNCS, roleFuncs };
};

export const filterCareer = (careers) => {
  return { type: actions.CHANGE_AUX_CARRERA, careers };
};

export const changeMaterias = (materias) => {
  return { type: actions.CHANGE_MATERIAS, materias };
};

export const changeMateria = (materia) => {
  return { type: actions.CHANGE_MATERIA, materia };
};

export const changeHorarios = (horarios) => {
  return { type: actions.CHANGE_HORARIOS, horarios };
};

export const changeHorario = (horario) => {
  return { type: actions.CHANGE_HORARIO, horario };
};

export const changeGrupos = (grupos) => {
  return { type: actions.CHANGE_GRUPOS, grupos };
};

export const changeGrupoHorarios = (grupoHorarios) => {
  return { type: actions.CHANGE_GRUPO_HORARIOS, grupoHorarios };
};

export const changeGrupo = (grupo) => {
  return { type: actions.CHANGE_GRUPO, grupo };
};

export const changeGrupoHorario = (grupoHorario) => {
  return { type: actions.CHANGE_GRUPO_HORARIO, grupoHorario };
};

export const updateNotifications = () => {
  return { type: actions.UPDATE_NOTIFICATIONS };
};

export const changeNumberNotifications = (numberNotifications) => {
  return { type: actions.CHANGE_NUMBER_NOTIFICATIONS, numberNotifications }
};
