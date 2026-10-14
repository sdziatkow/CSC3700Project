/**
 * @param course A Course Object.
 * @returns {React.JSX.Element} Visual representation of the given Object in card format.
 */
function CourseCard({course}) {
    return (
        <div className="card border-dark mb-3">
            <div className="card-header">
                {course.number}
            </div>
            <div className="card-body text-dark">
                <h5 className="card-title">
                    {course.title}
                </h5>
                <p className="card-subtitle text-muted small">
                    {course.credits} credits
                </p>
                <p className="card-text">
                    {course.description}
                </p>
                <p className="card-text small">
                    Prerequisites: {course.prerequisites.join(',')}
                </p>
            </div>
        </div>
    )
}
export default CourseCard;