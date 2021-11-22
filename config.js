const PORT = process.env.PORT || 3001;
const SHEET_ID = '1c8UQO8TV125Jx7r9P3eMHd8xWJMNkw355sRyqoqiPCY';
const API_KEY = process.env.API_KEY;
const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:F?key=${API_KEY}`;

module.exports = { PORT, API_URL };