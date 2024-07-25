import Card from "@/components/Card/Card.jsx";
import "./Navbar.css"

const Navbar = () => {
    return ( 
        <Card id="navbar">
            <a className="navlinks" href="#about">Me</a>
            <a className="navlinks" href="#projects">Projects</a>
            <a className="navlinks" href="#resume">Resume</a>
            <a className="navlinks" href="#contact">Contact</a>
        </Card>
     );
}
 
export default Navbar;