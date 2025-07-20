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
                    src="https://docs.google.com/document/d/e/2PACX-1vTTlaxrMVNcplEfSsGD3MujDUcHFJvqu9g7P5NqwVOronFvi2gRVKr6QCIWtTodwv3hX2VaJSofuXqh/pub?embedded=true"
                ></iframe>
            </Card>

        </section>
    );
}

export default Resume;