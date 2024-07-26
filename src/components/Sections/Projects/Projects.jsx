import Card from "@/components/Card/Card.jsx"
import ProjectCard from "./ProjectCard/ProjectCard";
import "./Projects.css";
import projectLinks from "@/assets/data/projects.json";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";



const Projects = () => {
    const [projectRepos, setProjectRepos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getProjectRepos = async (githubLinks) => {
        // Fetch all github repos from github api.
        const response = await fetch("https://api.github.com/users/aebel-shajan/repos?per_page=100"
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            //     }
            // }
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch repos! status: ${response.status}`)
        }
        let githubRepos = await response.json();

        // Filter repos to desired ones defined in projects.json
        githubRepos = githubRepos.filter((repo) => {
            return githubLinks.includes(repo["html_url"])
        })
        setProjectRepos(githubRepos)
        return githubRepos
    }

    const filteredProjectComponents = () => {
        if (projectRepos.length == 0) {
            return (
                <Card id="error-card">
                    <h3>Failed to fetch projects from github api.</h3>
                </Card>
            )
        }

        return projectRepos
        .filter(projectData => {
            if (searchTerm === "") {
                return true
            }
            return projectData["name"].toLowerCase().includes(searchTerm.toLowerCase())
        })
        .map(projectData => {
            return <ProjectCard projectData={projectData} />
        })
    }

    useEffect(() => {
        getProjectRepos(projectLinks)
    }, [])
    
    return (
        <section id="projects">
            <Card id="projects-title">
                <h1>Projects</h1>
            </Card>
            <SearchForm setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <div id="project-cards">
                {
                    filteredProjectComponents()
                }
            </div>
        </section >
     );
}

export default Projects;