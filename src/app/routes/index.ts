import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

import { AttendanceRoutes } from '../modules/attendance/attendance.route';
import { DepartmentRoutes } from '../modules/department/department.route';
import { DesignationRoutes } from '../modules/designation/designation.route';
import { ProfileRoute } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoute,
  },
  {
    path: '/attendance',
    route: AttendanceRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
  {
    path: '/designation',
    route: DesignationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
