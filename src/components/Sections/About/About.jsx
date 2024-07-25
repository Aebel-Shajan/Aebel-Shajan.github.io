import { FaGithub, FaHackerrank, FaLinkedin} from "react-icons/fa";
import Card from "@/components/Card/Card.jsx";
import ThreeDModel from "./ThreeDModel/ThreeDModel";
import "./About.css";

const About = () => {
    return ( 
        <section id="about">
            <Card id="hello">
                Hello 👋, my name is Aebel. 
                <br />
                <br />
                I am a Data Engineer.
            </Card>
            <Card id="head">
                <ThreeDModel modelUrl="/squirtle.glb" />
            </Card>
            <Card id="socials">
                <a href="https://www.github.com/aebel-shajan">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/aebel-shajan">
                    <FaLinkedin />
                </a>
                <a href="https://www.hackerrank.com/profile/aebelshajan_work">
                    <FaHackerrank />
                </a>
            </Card>
        </section>
    );
}
 
export default About;