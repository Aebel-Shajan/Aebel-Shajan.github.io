import Card from "@/components/Card/Card"
import "./Contact.css"

const Contact = () => {
    return (
        <section id="contact">
            <Card id="contact-title">
                <h1>Contact</h1>
            </Card>
            <Card id="contact-card">
                <form id="contact-form">
                    <input
                        id="contact-name"
                        type="text"
                        placeholder="name"/>
                    <input
                        id="contact-email"
                        type="email"
                        placeholder="email" />
                    <textarea 
                        id="contact-message"
                        name="message" />
                    <input
                        id="contact-submit"
                        type="submit"
                        value="Contact 📨" />
                </form>
            </Card>
        </section>
    );
}

export default Contact;