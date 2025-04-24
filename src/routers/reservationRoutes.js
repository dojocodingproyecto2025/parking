import {Router} from 'express';
import { createReservation, getReservations, deleteReservation } from '../controllers/reservationController.js';
import { validateReservation } from '../middlewares/validateReservation.js';

const router = Router();

router.post("/", validateReservation, createReservation);
router.get("/", getReservations);
router.delete("/:id", deleteReservation);

export default router;