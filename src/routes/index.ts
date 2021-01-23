import { Router } from 'express';

const router: Router = require('express').Router();
import urlShortnerController from '../app/controllers/urlShortnerController';


router.post('/', urlShortnerController.create);
router.get('/', urlShortnerController.get);

module.exports = router;
