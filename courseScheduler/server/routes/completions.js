const express = require('express');
const router = express.Router();
const pool = require('../util/database');
const {replaceCompletions} = require('../util/courseData');

//GET--------------------------------------------------------------------------------------------------------------------

// ALL completed course IDs.
router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM completions');
        res.json(rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database Error.'});
    }
});

//PUT--------------------------------------------------------------------------------------------------------------------

// OVERWRITE completed course IDs.
router.post('/completions', async (req, res) => {

});

module.exports = router;