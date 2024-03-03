import express from 'express';
import { DepartmentController } from './department.controller';

const router = express.Router();



router.post(
  '/',
//   auth(ENUM_USER_ROLE.HR,),
  DepartmentController.insertIntoDB
);
router.get('/', DepartmentController.getAllDepartment);
router.get('/:id', DepartmentController.getByIdFromDB);
router.patch(
    '/:id',
  
    DepartmentController.updateOneInDB
  );

router.delete(
  '/:id',

  DepartmentController.deleteByIdFromDB
);

export const  DepartmentRoutes = router;
