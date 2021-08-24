import { Link } from "react-router-dom";
import classes from './Navbar.module.css'

const Navbar = (props) =>{
    return(
        <nav className = {classes.nav}>
            <h1>Learning Module</h1>
            <div className = "links">
                <Link to = "/" className = {classes.button} >Home page</Link>
                <Link to = "/AddStudent" className = {classes.button} >add Student</Link>
                <Link to = "/AddCourse" className = {classes.button} >add Course</Link>
                <Link to = "/StudentGrid" className = {classes.button} >student Grid</Link>
                <Link to = "/CoursesGrid" className = {classes.button} >courses Grid</Link>
            </div>

        </nav>

    );
}

export default Navbar;