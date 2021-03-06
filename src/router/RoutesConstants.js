export const routes = {
  home: '/home',
  homedefault: '/main',
  login: '/login',
  campus: '/users',
  career: '/career',
  registerCareer: '/newcareer',
  editCareer: '/career/:id',
  school: '/school',
  registerSchool: '/newschool',
  editSchool: '/school/:id',
  subjects: '/subjects',
  registerMateria: '/newsubjects',
  editMateria: '/subjects/:id',
  schedule: '/schedule',
  registerHorario: '/newschedule',
  editHorario: '/schedule/:id',
  groups: '/groups',
  registerGroups: '/newgroup',
  editGroups: '/groups/:id',
  administration: '/administration',
  roles: '/roles',
  newRole: '/newrole',
  editRole: '/roles/:id',
  account: '/account',
  route404: '/404',
  testUi: '/testui',
  registerUser: '/registerUser',
  editUser: '/users/:id',
  userslog: '/userslog',
  userslogView: '/userslog/:id',
  //AbcencesRoutes
  absencesReports:'/reports/Absences',
  userSelectedAbsences:'/reports/Absences/user/:id',
  userAbsences:'/account/absences',
  newAbsence:'/account/newAbsence',
  userAbsence:'/account/absences/:id',
  //RegisterProgressRoutes
  registerProgress:'/account/registerProgress',
  registerAdditionalClass:'/account/registerAdditionalClass',
  additionalClassList: '/account/additionalClassList',
  //Reports
  reports:'/reports',
  usersList:'/reports/userList',
  reportsByUser:'/reports/userList/user/:id',
  userReport:'/reports/userList/user/:id/report/:id',

  userAddClasses:'/reports/userAddClassList',
  userClasses:'/reports/userAddClassList/user/:id',
  userClass:'/reports/userAddClassList/user/:id/class/:id',

  reportsWeekMonth:'/reports/weeklyMonthly',
  notificaciones:'/notificaciones',
};
