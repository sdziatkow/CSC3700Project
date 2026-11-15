const express = require('express');
const router = express.Router();
const pool = require('../util/database');
const {getCoursesWithPrereqs, replaceCompletions} = require('../util/courseData');
const {isValidCompletionSet} = require('../util/validateCourse');

//GET--------------------------------------------------------------------------------------------------------------------

// ALL completed course IDs.
router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT course_id FROM completions');
        let asArray = rows.map(row => row.course_id);
        res.status(200).json(asArray);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database Error.'});
    }
});

//PUT--------------------------------------------------------------------------------------------------------------------

// UPDATE completed course IDs.
router.put('/completions', async (req, res) => {
    try {
        const allCourses = await getCoursesWithPrereqs(pool);
        const {completed} = req.body;
        const isValid = isValidCompletionSet(allCourses, completed);
        if (!isValid) {
            return res.status(400).json({error: `Given completion information is invalid.`});
        }
        await replaceCompletions(pool, 1, completed);
        const [rows] = await pool.query('SELECT course_id FROM completions');
        let asArray = rows.map(row => row.course_id);
        res.status(200).json(asArray);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Database Error.'});
    }
});

module.exports = router;