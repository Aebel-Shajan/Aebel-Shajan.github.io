document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code goes here
  // It will only execute after the DOM is fully loaded
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      const projectsContainer = document.getElementById('projects-container');

      data.forEach((project) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-container');

        projectElement.innerHTML = `
          <a href="${project.url}" target="_blank" class="project-image">
            <img src="${project.image}" alt="${project.title}" />
          </a>
          <div class="project-description">
            <h2>${project.title}</h2>
            <p>Date: ${project.date}</p>
            <p>${project.description}</p>
            <ul class="project-skills">
              ${project.skills.map((skill) => `<li>${skill}</li>`).join('')}
            </ul>         
          </div>
          
          `;

        projectsContainer.appendChild(projectElement);
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

});