const { findAll, findById, save, update, deletear } = require('./../services-controllers/wallet.services');
const express = require('express');

const router = express.Router();

router.use(express.json());
router.get('/', findAll);
router.get('/:id', findById);
router.post('/', save);
router.patch('/:id', update);
router.delete('/:id', deletear);

module.exports = router;