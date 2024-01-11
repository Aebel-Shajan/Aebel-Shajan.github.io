import projects from './projects.json' assert {type: "json"};
import codepenProjects from './codepen-projects.json' assert {type: "json"};

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
			case "youtube":
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

let codepenIndex = 0;
document.querySelector("#next-codepen").addEventListener("click", () => {
	codepenIndex = (codepenIndex + 1 ) % codepenProjects.length;
	console.log("codepenIndex: ", codepenIndex);
	document.querySelector("#codepen-iframe").src = codepenProjects[codepenIndex]["link"];
})
document.querySelector("#previous-codepen").addEventListener("click", () => {
	codepenIndex -= 1;
	if (codepenIndex < 0) {codepenIndex += codepenProjects.length}
	console.log("codepenIndex: ", codepenIndex);
	document.querySelector("#codepen-iframe").src = codepenProjects[codepenIndex]["link"];
})