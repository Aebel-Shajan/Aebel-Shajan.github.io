import Button from "../Button/Button";
import style from "./Hero.module.css";
import { FaGithub, FaLinkedin, FaHackerrank} from "react-icons/fa";

const Hero = () => {

  return (
    <section id="me">
      <div className={style.col1}>
        <div className={style.title}>
          <h1>
            Aebel Shajan
          </h1>
          <p>
            (pronounced ay-bl)
          </p>
        </div>
        <div>
          I'm a Data Scientist
        </div>
        <Button text="Contact me" />
      </div>

      <div className={style.col2}>
        <a href="https://github.com/Aebel-Shajan">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/aebel-shajan/">
          <FaLinkedin/>
        </a>
        <a href="https://www.hackerrank.com/profile/aebelshajan_work">
          <FaHackerrank />
        </a>
      </div>
    </section>
  );
}

export default Hero;