/** MIGHT NOT NEED TO VALIDATE PREREQ IDS CUZ DB DOES IT FOR YOU.
 * This function will:
 * Get all existing course IDs from the database.
 * Validate each given field.
 *      The course IDs will be used to ensure that the given prerequisite IDs actually exist.
 */
async function validateCourse({number, title, credits, prerequisites}, pool) {
    const [rows] = await pool.query("SELECT id FROM courses"); // Get all course IDs from DB.
    const ids = rows.map((row) => row.id); // Map IDs to an array.
    return (isValidNum(number) && title && parseInt(credits) && isValidPrereqs(prerequisites, ids));
}

function isValidNum(number) {
    number = String(number);
    let csc = number.substring(0, 3);
    let num = parseInt(number.substring(3));
    if (csc !== "CSC") throw new Error("Course number must begin with 'CSC'.");
    if (!num) throw new Error("Course number must end with an integer.");
    if (num > 9999) throw new Error("Course number must end with an integer less than ten-thousand.");
    return true;
}

function isValidPrereqs(prereqs, allIDs) {
    const isArray = prereqs && Array.isArray(prereqs); // Ensure prereqs exist as an Array object.
    if (!isArray) throw new Error("Course prerequisites must be an array.");
    const prereqsExist = prereqs.every((prereq) =>  allIDs.includes(prereq)); // Ensure prereq IDs actually exist in the DB.
    if (!prereqsExist) throw new Error("Course prerequisites must exist.");
    return true
}

// courses: array in the Section 5 shape, completed: array of ids
const isValidCompletionSet = (courses, completed) => {
    return completed.every((id) => {
        const course = courses.find((c) => c.id === id);
        return course && course.prerequisites.every((p) => completed.includes(p));
    });
}

module.exports = {validateCourse, isValidCompletionSet};