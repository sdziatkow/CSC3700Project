import {CourseStateTheme} from "../util/CourseState.js"

/**
 * @param totalCourses - The total amount of Course Objects fetched from the DB.
 * @param totalCompleted - The total amount of CourseCards that are marked completed.
 * @param totalAvailable - The total amount of Courses that are not locked and not completed.
 * @returns {React.JSX.Element} Bootstrap animated ProgressBar with written progress status.
 */
function ProgressSummary({totalCourses, totalCompleted, totalAvailable}) {
    const progress= Math.trunc((totalCompleted / totalCourses) * 100);
    const totalLocked = totalCourses - (totalCompleted + totalAvailable);
    return (
        <div className="bg-light border border-2 border-dark-subtle rounded p-2">
            {/* Text Information */}
            <div className="d-sm-inline-flex mx-2 mb-2 gap-2">
                <span >
                    <span className={`${CourseStateTheme.COMPLETED.progressTxt}`}>
                        {totalCompleted + " "}
                    </span>
                of {totalCourses} completed
                </span>
                <span className="ms-auto">
                    <span className={`${CourseStateTheme.AVAILABLE.progressTxt}`}>
                        {totalAvailable + " "}
                    </span>
                    available
                </span>
                <span className="ms-auto">
                    <span className={`${CourseStateTheme.LOCKED.progressTxt}`}>
                        {totalLocked + " "}
                    </span>
                    locked
                </span>
            </div>
            {/* Bootstrap ProgressBar */}
            <div className="progress mb-2">
                <div
                    className="progress-bar"
                    style={{width:`${progress}%`}}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    {progress}%
                </div>
            </div>
        </div>
    )
}

export default ProgressSummary;