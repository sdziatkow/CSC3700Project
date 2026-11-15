import {useState, useEffect} from "react";
import useFetch from "../hooks/useFetch.js";
import usePrereqNumMap from "../util/usePrereqNumMap.js";
import CourseList from "../components/CourseList.jsx";

/**
 * Parent component to CourseList
 * @returns {React.JSX.Element} A visual representation of Course Objects dependent on user input.
 */
function HomePage() {

    // Send GET request for all course data and get its results.
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const URL = `${BASE_URL}/courses`;
    const {data, isPending, error} = useFetch(URL);

    // Ensure data is an Array and is not empty.
    const allCourses = Array.isArray(data) ? data : [];
    const hasCourses = allCourses.length > 0;

    // Generate Map Object CourseID -> [coursePrerequisite.number, ...]
    const {prereqNumMap} = usePrereqNumMap(allCourses, hasCourses);

    // Load completed state from server.
    const { data: savedCompletions } = useFetch(`${BASE_URL}/completions`);
    const [completed, setCompleted] = useState([]);

    // NOTE: when the fetch finishes, copy the server's list into editable state
    useEffect(() => {
        if (Array.isArray(savedCompletions)) setCompleted(savedCompletions)
    }, [savedCompletions]);

    return (
        <div className="container-lg">
            {/* Display data retrieval information and list of courses (if data was properly retrieved). */}
            {isPending && <p className="text-warning">Loading...</p>}
            {error && <p className="text-danger">{String(error)}</p>}
            {hasCourses &&
                <CourseList courses={allCourses}
                            prereqNumMap={prereqNumMap}
                            savedCompletions={completed}
                            setSavedCompletions={setCompleted}
                />
            }
        </div>
    )
}
export default HomePage;