import {Router} from 'express';
import { createReservation } from '../controllers/reservationController.js';
import { validateReservation } from '../middlewares/validateReservation.js';

const router = Router();

router.post("/", validateReservation, createReservation);

export default router;