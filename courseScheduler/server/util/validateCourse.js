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
    return number.substring(0, 3) === "CSC";
}
function isValidPrereqs(prereqs, allIDs) {
    const prereqsExist = prereqs && Array.isArray(prereqs); // Ensure prereqs exist as an Array object.
    if (!prereqsExist) return false;
    return prereqs.every((prereq) =>  allIDs.includes(prereq)); // Ensure prereq IDs actually exist in the DB.
}
module.exports = {validateCourse};