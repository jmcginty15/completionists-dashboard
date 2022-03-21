const axios = require('axios');
const { API_URL } = require('../config');
const { filterUpcoming, filterPast, filterByTerms } = require('../utils');
const ExpressError = require('../expressError');

class Reading {
    static async getAll() {
        const res = await axios.get(API_URL);
        return res.data;
    }

    static async getUpcoming() {
        const res = await axios.get(API_URL);
        const allReadings = res.data.values.slice(1);
        return filterUpcoming(allReadings);
    }

    static async getPast() {
        const res = await axios.get(API_URL);
        const allReadings = res.data.values.slice(1);
        return filterPast(allReadings);
    }

    static async search({ title = null, author = null, collection = null }) {
        const res = await axios.get(API_URL);
        const allReadings = res.data.values.slice(1);

        if (title) title = decodeURI(title);
        if (author) author = decodeURI(author);
        if (collection) collection = decodeURI(collection);

        return filterByTerms(allReadings, title, author, collection);
    }
}

module.exports = Reading;
