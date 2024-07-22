import Card from "@/components/Card/Card";
import "./ProjectCard.css";

const ProjectCard = ({ projectData}) => {
    const projectDate = new Date(projectData["created_at"])
    return (
        <Card className="project-card">
            <a 
                className="github-link-overlay"
                href={projectData["html_url"]} >
                Source
            </a>
            <div className="project-image">
            </div>
            <div className="project-title">
                {projectData["name"]}
            </div>
            <div className="project-date">
                {projectDate.toDateString()}
            </div>
            <div className="project-skills">
                {projectData["language"]}
            </div>
        </Card>
    );
}
 
export default ProjectCard;