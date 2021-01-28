import { Router } from 'express';

import { createValidate, getValidate } from '../middlewares/index';
import urlShortnerController from '../app/controllers/urlShortnerController';

const router: Router = Router();

router.post('/', createValidate, urlShortnerController.create);
router.get('/:name', getValidate, urlShortnerController.get);
router.get('/:name/metrics', getValidate, urlShortnerController.getMetrics);

module.exports = router;
