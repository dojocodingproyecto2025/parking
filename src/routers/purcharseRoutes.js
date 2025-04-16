import {Router} from 'express';
import { purcharse, getLinkBuy, downloadDocument } from '../controllers/purcharseController.js';

const router = Router();

router.post("/", purcharse);
router.post("/link", getLinkBuy);
router.get('/getDocument/:sessionId', downloadDocument);

export default router;