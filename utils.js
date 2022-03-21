const moment = require('moment-timezone');

const replaceSpecials = (original) => {
    original = original.replace('æ', 'ae');
    original = original.replace('œ', 'oe');
    return original;
}

const filterUpcoming = (readings) => {
    const currentDate = moment();

    const sortedReadings = [];
    for (let reading of readings) if (reading[5]) {
        const scheduleDate = moment.tz(`${reading[5]} 19:00`, 'America/Chicago');
        const diff = scheduleDate - currentDate;

        if (diff > 0) {
            const nextReading = {
                title: reading[0],
                collection: reading[1],
                author: reading[2],
                genres: reading[3].split(', '),
                seminar: reading[4],
                scheduled: scheduleDate,
                diff: diff
            };

            let insertIndex = 0;
            let inserted = false;
            while (insertIndex < sortedReadings.length) {
                if (nextReading.diff < sortedReadings[insertIndex].diff) {
                    sortedReadings.splice(insertIndex, 0, nextReading);
                    inserted = true;
                    insertIndex = sortedReadings.length + 50;
                } else insertIndex++;
            }
            if (!inserted) sortedReadings.push(nextReading);
        }
    }

    const returnReadings = [];
    for (let reading of sortedReadings) {
        if (!returnReadings.length || returnReadings[returnReadings.length - 1].date.format('MMMM Do YYYY, h:mm:ss a') !== reading.scheduled.format('MMMM Do YYYY, h:mm:ss a')) returnReadings.push({
            date: reading.scheduled,
            readings: [
                {
                    title: reading.title,
                    collection: reading.collection,
                    author: reading.author,
                    genres: [...reading.genres]
                }
            ]
        });
        else returnReadings[returnReadings.length - 1].readings.push({
            title: reading.title,
            collection: reading.collection,
            author: reading.author,
            genres: [...reading.genres]
        });
    }

    return returnReadings;
}

const filterPast = (readings) => {
    const currentDate = moment();

    const sortedReadings = [];
    for (let reading of readings) if (reading[5]) {
        const scheduleDate = moment.tz(`${reading[5]} 19:00`, 'America/Chicago');
        const diff = scheduleDate - currentDate;

        if (diff < 0) {
            const nextReading = {
                title: reading[0],
                collection: reading[1],
                author: reading[2],
                genres: reading[3].split(', '),
                seminar: reading[4],
                scheduled: scheduleDate,
                diff: diff
            };

            let insertIndex = 0;
            let inserted = false;
            while (insertIndex < sortedReadings.length) {
                if (nextReading.diff > sortedReadings[insertIndex].diff) {
                    sortedReadings.splice(insertIndex, 0, nextReading);
                    inserted = true;
                    insertIndex = sortedReadings.length + 50;
                } else insertIndex++;
            }
            if (!inserted) sortedReadings.push(nextReading);
        }
    }

    const returnReadings = [];
    for (let reading of sortedReadings) {
        if (!returnReadings.length || returnReadings[returnReadings.length - 1].date.format('MMMM Do YYYY, h:mm:ss a') !== reading.scheduled.format('MMMM Do YYYY, h:mm:ss a')) returnReadings.push({
            date: reading.scheduled,
            readings: [
                {
                    title: reading.title,
                    collection: reading.collection,
                    author: reading.author,
                    genres: [...reading.genres]
                }
            ]
        });
        else returnReadings[returnReadings.length - 1].readings.push({
            title: reading.title,
            collection: reading.collection,
            author: reading.author,
            genres: [...reading.genres]
        });
    }

    return returnReadings;
}

const filterByTerms = (readings, title, author, collection) => {
    const currentDate = moment();

    const sortedReadings = [];
    for (let reading of readings) {
        const titleCheck = replaceSpecials(reading[0].toLowerCase());
        const authorCheck = replaceSpecials(reading[2].toLowerCase());
        const collectionCheck = replaceSpecials(reading[1].toLowerCase());

        if (title && titleCheck.indexOf(title) === -1) continue;
        if (author && authorCheck.indexOf(author) === -1) continue;
        if (collection && collectionCheck.indexOf(collection) === -1) continue;

        const scheduleDate = reading[5] ? moment.tz(`${reading[5]} 19:00`, 'America/Chicago') : null;
        const diff = scheduleDate ? scheduleDate - currentDate : null;

        const nextReading = {
            title: reading[0],
            collection: reading[1],
            author: reading[2],
            genres: reading[3].split(', '),
            seminar: reading[4],
            scheduled: scheduleDate,
            diff: diff
        };

        if (nextReading.diff) {
            let insertIndex = 0;
            let inserted = false;
            while (insertIndex < sortedReadings.length) {
                if (!sortedReadings[insertIndex].diff || nextReading.diff < sortedReadings[insertIndex].diff) {
                    sortedReadings.splice(insertIndex, 0, nextReading);
                    inserted = true;
                    insertIndex = sortedReadings.length + 50;
                } else insertIndex++;
            }
            if (!inserted) sortedReadings.push(nextReading);
        } else sortedReadings.push(nextReading);
    }

    return sortedReadings;
}

module.exports = { filterUpcoming, filterPast, filterByTerms };
