import {NavLink} from "react-router-dom";

/** Bootstrap NavBar with NavLinks for React Routing. */
function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
            <a className="navbar-brand fw-bold text-info-emphasis">Aurora CS Course Scheduler</a>
            <div className="navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" end> Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about"> About </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;