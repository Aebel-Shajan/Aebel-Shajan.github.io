import Card from "@/components/Card/Card";
import "./ProjectCard.css";
import { FaGithub} from "react-icons/fa";

const ProjectCard = ({ projectData}) => {
    const projectDate = new Date(projectData["created_at"])
    const projectLink = projectData["homepage"] ? projectData["homepage"] : projectData["html_url"]
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    
    return (
        <Card 
            className="project-card"
            >
            <a 
                className="github-link-overlay"
                href={projectData["html_url"]} >
                <FaGithub />
            </a>
            <div 
                className="project-image"
                onClick={() => openInNewTab(projectLink)}
                >
            </div>
            <div className="project-title">
                {projectData["name"]}
            </div>
            <div className="project-date">
                {projectDate.toDateString()}
            </div>
            <div className="project-skills">
                <div className="project-skill">
                    {projectData["language"]}
                </div>
            </div>
        </Card>
    );
}
 
export default ProjectCard;