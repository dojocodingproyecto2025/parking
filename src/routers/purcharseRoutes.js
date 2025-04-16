import {Router} from 'express';
import { purcharse, getLinkBuy, downloadDocument } from '../controllers/purcharseController.js';
import { validateProductData } from '../middlewares/validatePurcharse.js';

const router = Router();

router.post("/", validateProductData, purcharse);
router.post("/link", validateProductData, getLinkBuy);
router.get('/getDocument/:sessionId', downloadDocument);

export default router;