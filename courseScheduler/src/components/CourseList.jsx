import {useState} from "react";
import {DisplayOptions} from "../util/DisplayOptions.js";
import ProgressSummary from "./ProgressSummary.jsx";
import CourseCard from "./CourseCard.jsx";

/**
 * @param courses An array of Course Objects.
 * @returns {React.JSX.Element} A visual representation of all given objects in grid format.
 */
function CourseList({courses, prereqNumMap, onSave, savedCompleted}) {
    const TOTAL_COL_SPACE = 12;
    const MAX_COLS = 4;

    // Display options to be mapped to radio buttons for course display filtering.
    const [currOption, setCurrOption] = useState(DisplayOptions.ALL);

    // Shows when no change to completedIDs has been made since last save.
    const [showSaveText, setSaveTextShowing] = useState(true);

    // Keep track of which courses are completed.
    const [completedIDs, setCompletedIDs] = useState(savedCompleted);
    const onCompletionChange = (course, isCompleted) => {
        if (!isCompleted) setCompletedIDs([...completedIDs, course.id]);
        else setCompletedIDs(completedIDs.filter((id) => id !== course.id));
        if (showSaveText) setSaveTextShowing(false);
    };

    // Used to compute whether a course is available.
    const isAvailable = (course, completed = completedIDs) => {
        return course.prerequisites.every((prereqId) => completedIDs.includes(String(prereqId)));
    };

    const handleSaveBtn = () => {
        onSave(completedIDs);
        setSaveTextShowing(true);
    };

    // Filter courses based on user selection.
    let dispCourses = courses;
    switch (currOption) {
        case DisplayOptions.COMPLETED:
            dispCourses = courses.filter((course) => completedIDs.includes(course.id));
            break;
        case DisplayOptions.REMAINING:
            dispCourses = courses.filter((course) => !completedIDs.includes(course.id));
            break;
        case DisplayOptions.ALL:
        default:
    }
    const totalAvailable = courses.filter((course) => isAvailable(course) && !completedIDs.includes(course.id)).length;
    return (
        <>
            <h2>CS Developer Track</h2>
            {/* Add ProgressSummary and re-compute progress on each render */}
            <div className="mb-1">
                <ProgressSummary
                    totalCourses={courses.length}
                    totalCompleted={completedIDs.length}
                    totalAvailable={totalAvailable}
                />
            </div>

            <div className="d-lg-inline-flex m-2 mb-4" style={{width:'95%'}}>
                {/* Map DispOptions as radio buttons to control which data is displayed. */}
                <span className="form-check-inline border border-3 border-black rounded">
                    {Object.values(DisplayOptions).map((option) => (
                    <span key={option}>
                        <input
                            type="radio"
                            className="btn-check"
                            id={option}
                            name="DispOptions"
                            value={option}
                            checked={currOption === option}
                            onChange={() => setCurrOption(option)}
                        />
                        <label className="btn btn-outline-dark rounded-0" htmlFor={option}>{option}</label>
                    </span>
                    ))}
                </span>
                <span className="ms-auto">
                    {/* Save text and Button */}
                    {showSaveText ?
                        <span className="d-inline-block text-success fw-medium fst-italic">
                            {showSaveText ? "Progress Saved" : null}
                        </span>
                        :
                        <button
                            className="btn btn-success border border-3 border-success rounded"
                            disabled={showSaveText}
                            onClick={handleSaveBtn}
                        >
                            Save
                        </button>
                    }
                </span>
            </div>

            {/* Map each course Object to an individual card display. */}
            <div className={`row row-cols-md-${MAX_COLS}`}>
                {dispCourses.length > 0 && dispCourses.map((course) => (
                    <div key={course.id} className={`col-md-${TOTAL_COL_SPACE / MAX_COLS} mb-3`}>
                        <CourseCard
                            key={course.id}
                            course={course}
                            prereqNames={prereqNumMap}
                            totalCompleted={completedIDs.length}
                            onCompletionChange={onCompletionChange}
                            isCompleted={completedIDs.includes(course.id)}
                            isAvailable={isAvailable(course)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}
export default CourseList;