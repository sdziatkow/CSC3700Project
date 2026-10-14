import CourseCard from "./CourseCard.jsx";

/**
 * @param courses An array of Course Objects.
 * @returns {React.JSX.Element} A visual representation of all given objects in grid format.
 */
function CourseList({courses}) {
    const TOTAL_COL_SPACE = 12;
    const MAX_COLS = 4;
    return (
        <div className="container container-lg">
            <div className={`row row-cols-md-${MAX_COLS}`}>
                {courses.map((course) => (
                    <div key={course.id} className={`col-md-${TOTAL_COL_SPACE / MAX_COLS}`}>
                        <CourseCard key={course.id} course={course} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseList;