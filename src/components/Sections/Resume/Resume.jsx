import Card from "@/components/Card/Card";
import "./Resume.css"
const Resume = () => {
    return (
        <section id="resume">
            <Card id="resume-title">
                <h1>Resume</h1>
            </Card>
            <Card id="resume-card">
            <iframe 
                id="resume-embed"
                src="https://docs.google.com/document/d/e/2PACX-1vTNwH8Etn0GzTuFsyWIOpU_XDdQceZR6PL4eA2CZhK6-jlWpqYNWZ8N3nas-aK-Ul-DspPoj-Pz53EK/pub?embedded=true">    
            </iframe>

            </Card>

        </section>
    );
}

export default Resume;