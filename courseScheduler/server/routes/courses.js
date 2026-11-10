const express = require('express');
const router = express.Router();
const pool = require('../util/database');
const {getCoursesWithPrereqs, replacePrerequisites} = require('../util/courseData');
const {validateCourse} = require('../util/validateCourse');

//GET--------------------------------------------------------------------------------------------------------------------

// ALL courses.
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCoursesWithPrereqs(pool);
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// INDIVIDUAL course with given ":id".
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await getCoursesWithPrereqs(pool, req.params.id);
        if (!course) return res.status(404).json({error: `Course Not Found. Given ID: ${req.params.id}`});
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

});

//POST-------------------------------------------------------------------------------------------------------------------

// CREATE new course.
router.post('/courses', async (req, res) => {
    const isValid = await validateCourse(req.body, pool);
    if (!isValid) {
        return res.status(400).json({error: `Given course information is invalid.`});
    }
    const {number, title, credits, description, prerequisites} = req.body;
    try {

        // Insert new course into courses table and store newly generated ID in [result].
        const [result] = await pool.query(
            "INSERT INTO courses (number, title, credits, description) VALUES (?, ?, ?, ?)",
            [number, title, credits, description || null]
        );

        // Insert all prerequisites into the prerequisites table.
        const prereqRows = prerequisites.map((id) => [result.insertId, id]);
        await pool.query(
            "INSERT INTO prerequisites (course_id, prereq_id) VALUES ?",
            [prereqRows]
        );

        const course = await getCoursesWithPrereqs(pool, result.insertId);
        res.status(201).json(course);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//PUT--------------------------------------------------------------------------------------------------------------------

// OVERWRITE course with given ":id".
router.put('/courses/:id', async (req, res) => {
    const isValid = await validateCourse(req.body, pool);
    if (!isValid) {
        return res.status(400).json({error: `Given course information is invalid.`});
    }
    const {number, title, credits, description, prerequisites} = req.body;
    const id = parseInt(req.params.id);
    try {
        const [result] = await pool.query(
          'UPDATE courses SET `number`=?, `title`=?, `credits`=?, `description`=? WHERE `id`=?',
          [number, title, credits, description || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({error: `Course Not Found. Given ID: ${req.params.id}`});
        }
        await replacePrerequisites(pool, id, prerequisites);
        const course = await getCoursesWithPrereqs(pool, id);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//DELETE-----------------------------------------------------------------------------------------------------------------

// REMOVE course with given ":id".
router.delete('/courses/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const course = await getCoursesWithPrereqs(pool, req.params.id);
        if (!course) return res.status(404).json({error: `Course Not Found. Given ID: ${req.params.id}`});
        await pool.query("DELETE FROM courses WHERE id=?", [id]);
        res.status(200).json(course);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
