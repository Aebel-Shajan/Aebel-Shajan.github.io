import Card from "@/components/Card/Card.jsx"
import ProjectCard from "./ProjectCard/ProjectCard";
import "./Projects.css";
import projectLinks from "@/assets/data/projects.json";
import { useEffect, useState } from "react";



const Projects = () => {
    const [projectRepos, setProjectRepos] = useState([])

    const getProjectRepos = async (githubLinks) => {
        const response = await fetch("https://api.github.com/users/aebel-shajan/repos?per_page=100");
        if (!response.ok) {
            throw new Error(`Failed to fetch repos! status: ${response.status}`)
        }
        let githubRepos = await response.json();
        githubRepos = githubRepos.filter((repo) => {
            return githubLinks.includes(repo["html_url"])
        })
        setProjectRepos(githubRepos)
        return githubRepos
    }

    useEffect(() => {
        getProjectRepos(projectLinks)
    }, [])
    
    return (
        <section id="projects">
            <Card id="projects-title">
                <h1>Projects</h1>
            </Card>
            <Card id="projects-form">
                <form action="/search" method="GET">
                    <input 
                        type="text" 
                        name="query" 
                        placeholder="Search..." 
                        className="search-input" />
                    <button 
                        type="submit" 
                        className="search-button">
                        Search
                    </button>
                </form>
            </Card>
            <div id="project-cards">
                {
                    projectRepos.map(project => {
                        return (
                            <Card>
                                {project.name}
                            </Card>
                        )
                    })
                }
            </div>
        </section >
     );
}

export default Projects;