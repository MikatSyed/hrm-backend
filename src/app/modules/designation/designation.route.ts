import express from 'express';
import { DesignationController } from './designation.controller';

const router = express.Router();



router.post(
  '/',
//   auth(ENUM_USER_ROLE.HR,),
  DesignationController.insertIntoDB
);
router.get('/', DesignationController.getAllDesignation);
router.get('/:id', DesignationController.getByIdFromDB);
router.patch(
    '/:id',
  
    DesignationController.updateOneInDB
  );

router.delete(
  '/:id',

  DesignationController.deleteByIdFromDB
);

export const  DesignationRoutes = router;
