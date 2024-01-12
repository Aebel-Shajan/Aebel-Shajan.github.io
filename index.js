import projects from './projects.json' assert {type: "json"};
import codepenProjects from './codepen-projects.json' assert {type: "json"};


// Loading projects 
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
		switch (linkName) {
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

// Handling code pen section logic
let codepenIndex = 0;
document.querySelector("#next-codepen").addEventListener("click", () => {
	codepenIndex = (codepenIndex + 1) % codepenProjects.length;
	console.log("codepenIndex: ", codepenIndex);
	document.querySelector("#codepen-iframe").src = codepenProjects[codepenIndex]["link"];
})
document.querySelector("#previous-codepen").addEventListener("click", () => {
	codepenIndex -= 1;
	if (codepenIndex < 0) { codepenIndex += codepenProjects.length }
	console.log("codepenIndex: ", codepenIndex);
	document.querySelector("#codepen-iframe").src = codepenProjects[codepenIndex]["link"];
})

// Animating letters
// https://web.dev/articles/building/split-text-animations#:~:text=Text%20letters%2C%20words%2C%20lines%2C,needs%20to%20be%20an%20element.
// const span = (text, index) => {
// 	const node = document.createElement('span')
// 	node.textContent = text
// 	node.style.setProperty('--index', index)
// 	return node
// }
// const byLetter = text => [...text].map(span);
// const splitTargets = document.querySelectorAll('[split-by]');

// const { matches: motionOK } = window.matchMedia(
// 	'(prefers-reduced-motion: no-preference)'
// )
// if (motionOK) {
// 	const splitTargets = document.querySelectorAll('[split-by]')

// 	splitTargets.forEach(node => {
// 		const type = node.getAttribute('split-by')
// 		let nodes = null

// 		if (type === 'letter')
// 			nodes = byLetter(node.innerText)
// 		else if (type === 'word')
// 			nodes = byWord(node.innerText)

// 		if (nodes)
// 			node.firstChild.replaceWith(...nodes)
// 	})
// } 