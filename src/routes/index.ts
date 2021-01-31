import { Router } from 'express';

import { createValidate, getValidate } from '../middlewares/index';
import urlShortnerController from '../app/controllers/urlShortnerController';
import homeController from '../app/controllers/homeController';

const router: Router = Router();

router.get('/', homeController.get);
router.post('/', createValidate, urlShortnerController.create);
router.get('/:name', getValidate, urlShortnerController.get);
router.get('/:name/metrics', getValidate, urlShortnerController.getMetricsByUrl);

export default router;
