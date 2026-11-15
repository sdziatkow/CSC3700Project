/** Displays information about the page and current date. */
function AboutPage() {
    const date = new Date();
    const fullWeekdayName = date.toLocaleDateString("en-US", {weekday: "long"});
    const fullMonthName = date.toLocaleDateString("en-US", {month: "long"});
    const day = date.toLocaleDateString("en-US", {day: "2-digit"});
    const year = date.toLocaleDateString("en-US", {year: "numeric"});
    const dispDate = `${fullWeekdayName}, ${fullMonthName} ${day}, ${year}`;
    return (
        <div className="container-lg border border-3 border-secondary-subtle rounded w-50 mx-auto p-3">
            <div className="row border-bottom border-bottom-1 border-secondary-subtle mb-2">
                <div className="col-12">
                    <h2>About</h2>
                </div>
            </div>
            <div className="row border-bottom border-bottom-1 border-secondary-subtle mb-2">
                <div className="col-12">
                    <p>
                        The Aurora CS Course Scheduler shows the CS Developer Track catalog,
                        tracks which courses you have completed, and shows which courses you are
                        eligible to take next.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-4 fw-bolder">Author</div>
                <div className="col-4">Sean Dziatkowiec</div>
            </div>
            <div className="row">
                <div className="col-4 fw-bolder">Date</div>
                <div className="col-4">{dispDate}</div>
            </div>
            <div className="row">
                <div className="col-4 fw-bolder">Version</div>
                <div className="col-2">2.0.0</div>
            </div>
        </div>
    )
}
export default AboutPage;