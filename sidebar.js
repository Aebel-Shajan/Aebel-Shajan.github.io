document.addEventListener("DOMContentLoaded", function() {
    const sidebar = `
    <div class="sidebar">
    <h2>About Me</h2>
    <p>
      MMath & MPhys Masters graduate from The University of Manchester. Looking for roles
      in data science, acturial science, machine learning and software development.
    </p>
    <h3>Socials</h3>
    
    <div style="display:flex; flex-direction:column; align-items:center;">
      <a class="button" target="_blank" href="mailto:aebelshajan.work@gmail.com">Email</a>
      <a class="button" target="_blank" href="https://www.linkedin.com/in/aebel-shajan-08a87a242/">LinkedIn</a>
      <a class="button" target="_blank" href="https://github.com/Aebel-Shajan">Github</a>
      <a class="button" target="_blank" href="https://www.hackerrank.com/profile/aebelshajan_work">HackerRank</a>
      <a class="button" target="_blank" href="https://www.freecodecamp.org/Aebel">FreeCodeCamp</a>
    </div>
    `;
    document.body.getElementsByClassName("row")[0].insertAdjacentHTML("beforeend", sidebar);
  });