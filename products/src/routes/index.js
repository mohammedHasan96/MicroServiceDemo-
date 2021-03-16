import express from 'express';
import productsRouters from './products';


const router = express.Router();

router.use('/', [
  productsRouters,
]);

module.exports = router;
