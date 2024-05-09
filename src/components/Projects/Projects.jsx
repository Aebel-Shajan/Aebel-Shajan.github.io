import projectJson from "../../data/projects.json";
import Carousel from "../Carousel/Carousel";
import styles from "./Projects.module.css";

const Projects = () => {
  return ( 
    <section className={styles.section} id="projects">
      <h1 className={styles.title}>Projects</h1>
      <Carousel childData={projectJson}/>
    </section>
   );
}
 
export default Projects;