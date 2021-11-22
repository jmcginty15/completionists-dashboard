const express = require('express');
const Reading = require('../models/reading');

const ExpressError = require('../expressError');

const router = new express.Router();

router.get('/', async function (req, res, next) {
    try {
        const readings = await Reading.getAll();
        return res.json({ readings: readings });
    } catch (err) {
        return next(err);
    }
});

router.get('/upcoming', async function (req, res, next) {
    try {
        const readings = await Reading.getUpcoming();
        return res.json({ readings: readings });
    } catch (err) {
        return next(err);
    }
});

router.get('/past', async function (req, res, next) {
    try {
        const readings = await Reading.getPast();
        return res.json({ readings: readings });
    } catch (err) {
        return next(err);
    }
});

router.get('/search', async function (req, res, next) {
    try {
        const readings = await Reading.search(req.query);
        return res.json({ readings: readings });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;