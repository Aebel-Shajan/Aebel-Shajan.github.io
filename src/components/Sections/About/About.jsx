import Card from "../../Card/Card";
import "./About.css";

const About = () => {
    return ( 
        <section id="about">
            <Card id="hello">
                Hello 👋, my name is Aebel.
                I am a Data Engineer.
            </Card>
            <Card id="head">
                Head
            </Card>
            <Card id="socials">
                Socials:
                linkedIn
            </Card>
        </section>
    );
}
 
export default About;