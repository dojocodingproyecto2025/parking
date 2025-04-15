import {Router} from 'express';
import {sendmailReservation} from '../controllers/sendMailController.js';

const router = Router();

router.post("/", sendmailReservation);

export default router;