import CourseList from "../components/CourseList.jsx";
import useFetch from "../hooks/useFetch.js";
import {useState} from "react";

/**
 * Parent component to CourseList
 * The displayed courses are changed with radio-buttons.
 * @returns {React.JSX.Element} A visual representation of Course Objects dependent on user input.
 */
function HomePage() {

    // Send GET request for all course data and get its results.
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const URL = `${BASE_URL}/courses`;
    const {data, isPending, error} = useFetch(URL);
    let allCourses = Array.isArray(data) ? data : [];
    let hasCourses = allCourses.length > 0;

    // Display options to be mapped to radio buttons for course display filtering.
    const dispOptions = {all: "All Courses", completed: "Completed Only", remaining: "Remaining"};
    const [currOption, setCurrOption] = useState(dispOptions.all);

    // Filter courses based on user selection.
    if (hasCourses) {
        switch (currOption) {
            case dispOptions.completed:
                break;
            case dispOptions.remaining:
                break;
            case dispOptions.all:
            default:
        }
        hasCourses = allCourses.length > 0;
    }
    function handleOptionSelect(option) {
        setCurrOption(option);
    }
    return (
        <div>
            {/* Map dispOptions as radio buttons to control which data is displayed. */}
            <div className="form-check form-check-inline bg-light rounded m-2 p-2">
                {Object.values(dispOptions).map((option) => (
                <span key={option} className="m-1">
                        <input
                            type="radio"
                            className="btn-check"
                            id={option}
                            name="dispOptions"
                            value={option}
                            checked={currOption === option}
                            onChange={() => handleOptionSelect(option)}
                        />
                        <label className="btn btn-outline-dark" htmlFor={option}>{option}</label>
                </span>
                ))}
            </div>
            {/* Display data retrieval information and list of courses (if data was properly retrieved). */}
            {isPending && <p className="text-warning">Loading...</p>}
            {error && <p className="text-danger">{String(error)}</p>}
            {hasCourses && <CourseList courses={allCourses} />}
        </div>
    )
}
export default HomePage;