/** Constant bootstrap style classes to be added in order to style components that display Course Object information. */
export const CourseStateTheme = Object.freeze( {
    COMPLETED: Object.freeze({
        card: "bg-success border-success",
        cardTextValue: "Completed",
        textBG: "bg-success rounded",
        progressTxt: "fw-bold fs-5 text-success"
    }),
    AVAILABLE: Object.freeze({
        card: "bg-primary border-primary",
        cardTextValue: "Available",
        textBG: "bg-primary rounded",
        progressTxt: "fw-bold fs-5 text-primary"
    }),
    LOCKED:    Object.freeze({
        card: "bg-muted border-muted",
        cardTextValue: "Locked",
        textBG: "bg-secondary rounded",
        progressTxt: "fw-bold fs-5 text-muted"
    })
});