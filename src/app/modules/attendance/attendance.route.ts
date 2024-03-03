import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AttendanceController } from './attendance.controller';
import { AttendanceValidation } from './attendance.validation';

const router = express.Router();
router.post(
  '/',
  validateRequest(AttendanceValidation.createAttendanceSchema),
  auth(ENUM_USER_ROLE.HR,ENUM_USER_ROLE.EMPLOYEE),
  AttendanceController.insertIntoDB
);

router.get('/', AttendanceController.getAllFromDB);
router.get('/:id', AttendanceController.getByIdFromDB);

router.patch(
  '/:id',
  validateRequest(AttendanceValidation.updateAttendanceSchema),
//   auth(ENUM_USER_ROLE.HR,ENUM_USER_ROLE.EMPLOYEE),
  AttendanceController.updateOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.HR,ENUM_USER_ROLE.EMPLOYEE),
  AttendanceController.deleteByIdFromDB
);

export const AttendanceRoutes = router;
