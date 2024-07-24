import Card from "@/components/Card/Card";
import "./Resume.css"
const Resume = () => {
    return (
        <section id="resume">
            <Card id="resume-title">
                <h1>Resume</h1>
            </Card>
            <Card id="resume-card">
                <embed
                    id="resume-embed"
                    type="application/pdf"
                    src="https://aebel-shajan.github.io/assets/Aebel's%20CV%20(v4).pdf"
                >

                </embed>
            </Card>

        </section>
    );
}

export default Resume;