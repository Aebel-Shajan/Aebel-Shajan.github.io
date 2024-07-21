import "./Navbar.css"

const Navbar = () => {
    return ( 
        <div className="navbar">
            <a className="navlinks" href="#me">Me</a>
            <a className="navlinks" href="#projects">Projects</a>
            <a className="navlinks" href="#resume">Resume</a>
            <a className="navlinks" href="#contact">Contact</a>
        </div>
     );
}
 
export default Navbar;