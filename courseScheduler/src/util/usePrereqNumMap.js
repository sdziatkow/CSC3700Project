import {useEffect} from "react";

const prereqNumMap = new Map();
/**
 * Will re-map each time allCourses changes and hasCourses is True.
 * @param allCourses All course objects whose IDs will be mapped.
 * @param hasCourses True when given allCourses is not empty.
 * @returns {{prereqNumMap: Map<any, any>}} {CourseID -> [prerequisite.number, ...]}
 */
function usePrereqNumMap(allCourses, hasCourses) {
    useEffect(() => {
        if (!hasCourses) return; // No courses to map.
        prereqNumMap.clear(); // Always start w/clear Map.

        // For each course...
        allCourses.forEach((course) => {

            // Will store the number field (CourseObj.number) of all prerequisites related to this course.
            const prereqNums = [];

            course.prerequisites.forEach((prereqID) => {

                // Get the actual Object by searching allCourses for its ID.
                const nextPrereq = allCourses.find((c) =>  Number(c.id) === prereqID)
                if (nextPrereq) prereqNums.push(nextPrereq.number);
            })
            prereqNumMap.set(course.id, prereqNums);
        })
    }, [allCourses]);
    return {prereqNumMap};
}
export default usePrereqNumMap;