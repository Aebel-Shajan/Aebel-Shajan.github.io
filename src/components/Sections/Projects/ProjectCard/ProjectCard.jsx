import Card from "@/components/Card/Card";
import "./ProjectCard.css";
import { FaGithub} from "react-icons/fa";
import { useState } from "react";

const ProjectCard = ({ projectData}) => {
    const [imageError, setImageError]  = useState(false);

    const projectDate = new Date(projectData["created_at"])
    const projectLink = projectData["homepage"] ? projectData["homepage"] : projectData["html_url"]
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };
    const projectImage = `https://raw.githubusercontent.com/Aebel-Shajan/${projectData["name"]}/${projectData["default_branch"]}/thumbnail.png`
    
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
                {
                    !imageError && <img src={projectImage} onError={()=> setImageError(true)} />
                }
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