import { FaGithub, FaHackerrank, FaLinkedin } from "react-icons/fa";
import Card from "@/components/Card/Card.jsx";
import ThreeDModel from "./ThreeDModel/ThreeDModel";
import "./About.css";
import { Typewriter } from "react-simple-typewriter";


const whoIAm = [
    'data engineer 📊',
    'frontend react dev 🧑‍🎨',
    'threejs sculptor 🗿',
    'shadcn fan 🎨',
    'software enthusiast 🧑‍💻',
    'dashboard wrangler 📈',
    'linux enjoyer 🐧',
    'typing noises appreciator ⌨️🎵',
    'spaghetti code untangler 🍝',
    'late-stage autocomplete enjoyer ',
    'part human part chat gpt api wrapper 🤖🎁',
]

const About = () => {
    return (
        <section id="about">
            <Card id="hello">
                <div>
                    Hello 👋, my name is Aebel.
                </div>
                <br />
                <br />
                <div>

                    <span>I am a ...</span>
                    <Typewriter
                        words={whoIAm}
                        loop={0} // 0 = infinite
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={30}
                        delaySpeed={2000}
                    />
                </div>
            </Card>
            <Card id="head">
                <ThreeDModel modelUrl="/aebel-avatar.glb" />
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