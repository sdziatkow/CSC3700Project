import {useEffect} from "react";
import {CourseStateTheme} from "../util/CourseState.js";

/**
 * @param course A Course Object.
 * @param prereqNames A Map CourseID -> [coursePrerequisite.number, ...]
 * @param totalCompleted The total amount of courses that are marked completed by the user.
 * @param onCompletionChange Function called when completed status is changed.
 * @param isCompleted Boolean flag whether this course is marked completed by the user.
 * @param isAvailable Boolean flag whether this course is considered available (determined by parent).
 * @returns {React.JSX.Element} Visual representation of the given Object in card format.
 */
function CourseCard({course, prereqNames, totalCompleted, onCompletionChange, isCompleted, isAvailable}) {
    const available = isAvailable;
    const complete = isCompleted;

    // Determine theme based on flags.
    let cardTheme = CourseStateTheme.LOCKED;
    if (complete) cardTheme = CourseStateTheme.COMPLETED;
    else if (available) cardTheme = CourseStateTheme.AVAILABLE;

    /* Specific case: Completed checkbox becomes un-checked NOT BY USER causing data inconsistency.
      How it happens -
        1. User checks "completed" which runs onChange -> onCompletionChange:
            complete now equals true; this CourseCard props.course.id is now tracked by CourseList.
        2. available now equals true (due to prereq system).
        3. User checks "completed" on Other CourseCard.
        PROBLEM ---
            User un-checks "completed" on Original CourseCard:
                complete now equals false; this CourseCard props.course.id is not tracked by CourseList.
                available now equals FALSE on CourseCards that depend on this one (due to prereq system):
                    Those that changed become un-checked, BUT NOT BY THE USER - onChange never runs.
                    Their isCompleted remains true; still tracked by HomePage.
        SOLUTION ---
            Each time given completedIDs changes, check if this course is NOT available while still being completed.
            If a prerequisite's completion status was removed, then this course will no longer be available.
                If so, and this course is marked completed, remove its completion status with given state function
                onCompletionChange.
     */
    useEffect(() => {
        if (!available && complete) onCompletionChange(course, complete);
    }, [totalCompleted]);
    return (
        <div className={`card ${cardTheme.card} border-3 bg-opacity-25 h-100`}>
            <div className="card-header d-flex">
                <span className="p-1">{course.number}</span>
                <span className={`ms-auto p-1 text-light ${cardTheme.textBG}`}>
                        {cardTheme.cardTextValue}
                </span>
            </div>
            <div className="card-body text-dark h-75">
                <h5 className="card-title">
                    {course.title}
                </h5>
                <p className="card-subtitle text-muted small">
                    {course.credits} credits
                </p>
                <p className="card-text">
                    {course.description}
                </p>
            </div>
            <div className="card-body text-dark">
                <p className="card-text small">
                    Prerequisites:
                    {prereqNames.get(course.id) &&
                    prereqNames.get(course.id).length > 0 ?
                        " " + prereqNames.get(course.id).join(', '): " None"
                    }
                </p>
            </div>
            <div className="card-footer">
                <input
                    className="form-check-input mx-1"
                    id="completedStatus"
                    type="checkbox"
                    checked={complete && available}
                    disabled={!available}
                    onChange={() => onCompletionChange(course, complete)}
                />
                <label className={`form-check-label ${!available ? "text-text-opacity-50":""}`} >
                    Completed
                </label>
            </div>
        </div>
    )
}

export default CourseCard;