import projects from './projects.json' assert {type: "json"};

console.log(projects);
projects.forEach(project => {
	let projectContainer = document.querySelector("template").content.querySelector(".project-container").cloneNode(true);
	projectContainer.querySelector(".project-image").src = project.image;
	projectContainer.querySelector(".project-title").innerText = project.title;
	projectContainer.querySelector(".project-date").innerText = project.date;
	projectContainer.querySelector(".project-description").innerText = project.description;
	for (let linkName in project.links) {
		let linkElement = document.createElement("a");
		linkElement.href = project.links[linkName];
		linkElement.target = "_blank";
		let linkIcon = document.createElement("i");
		let iconName = ""
		switch(linkName){
			case "github":
			case "chrome":
				iconName = "fab fa-" + linkName;
				break;
			case "pdf":
				iconName = "far fa-file-pdf";
				break;
			default:
				iconName = "fa fa-link";
		}
		linkIcon.className = iconName;
		linkElement.appendChild(linkIcon);
		projectContainer.querySelector(".project-links").appendChild(linkElement);
	}
	document.querySelector("#content-grid").appendChild(projectContainer);
});