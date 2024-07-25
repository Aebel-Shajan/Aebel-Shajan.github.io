import Card from "@/components/Card/Card"
import "./Contact.css"
import { useState } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);

  const showStateMessage = (message) => {
    setStateMessage(message);
    setIsSubmitting(false);
    setTimeout(() => {
      setStateMessage(null);
    }, 5000); // hide message after 5 seconds
  }

  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.init({
      publicKey: import.meta.env.VITE_PUBLIC_KEY
    })

    let templateParams = {
      user_name: e.target.querySelector("#contact-name").value,
      user_email: e.target.querySelector("#contact-email").value,
      message: e.target.querySelector("#contact-message").value,
    };

    let emptyValues = []
    Object.keys(templateParams).forEach((key) => {
      if (templateParams[key] === "") {
        emptyValues.push(key)
      }
    })

    if (emptyValues.length) {
      showStateMessage(`Values: ${emptyValues} should not be empty!`)
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams
      )
      .then(
        (result) => showStateMessage('Message sent!'),
        (error) => showStateMessage('Something went wrong, please try again later')
      );

    // Clears the form after sending the email
    e.target.reset();
  };

  return (
    <section id="contact">
      <Card id="contact-title">
        <h1>Contact</h1>
      </Card>
      <Card id="contact-card">
        <form id="contact-form" onSubmit={sendEmail}>
          <input
            id="contact-name"
            type="text"
            placeholder="name"
            name="user_name"
          />
          <input
            id="contact-email"
            type="email"
            placeholder="email"
            name="user_email"
          />
          <textarea
            id="contact-message"
            name="message" />
          <input
            id="contact-submit"
            type="submit"
            value="Contact 📨"
            disabled={isSubmitting} />
        </form>
        {stateMessage && <Card id="state-message">{stateMessage}</Card>}
      </Card>
    </section>
  );
}

export default Contact;