document.addEventListener("DOMContentLoaded", function() {
    const navbar = `
    <div class="header">
    <h1>Aebel Shajan</h1>
    <p>A website created by me.</p>
    </div>
  
    <div class="navbar">
    <a href="index.html">Projects</a>
    <a href="skills.html">Skills</a>
    <a href="CV.html">CV</a>
    <a href="solar_system.html" class="right">Solar System</a>
    </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbar);
  });