//A dictionary containing the sites with the corresponding hotkeys
const sites = {};

// TRY TO GET THE JSON FILE FROM LOCAL STORAGE AND RETURN A DEFAULT OTHERWISE
function getCategories() {
	try {
		let categoriesJSON = localStorage.getItem("categoriesJSON");
		categoriesJSON = JSON.parse(categoriesJSON);
		return categoriesJSON;
	} catch {
		const categories = {
			social: {
				reddit: {
					R: "https://www.reddit.com",
				},
				discord: {
					D: "https://www.discord.com/login",
				},
				"4chan": {
					4: "https://www.4chan.org/",
				},
			},
			learn: {
				youtube: {
					Y: "https://www.youtube.com",
				},
				freecodecamp: {
					F: "https://www.freecodecamp.org",
				},
				w3school: {
					W: "https://www.w3schools.com/",
				},
			},
			work: {
				github: {
					G: "https://github.com",
				},
				"codepen.io": {
					C: "https://codepen.io/pen",
				},
				coolors: {
					O: "https://coolors.co",
				},
				pixlr: {
					X: "https://pixlr.com/x/",
				},
			},
			misc: {
				"yewtu.be": {
					Y: "https://yewtu.be",
				},
				mega: {
					M: "https://mega.nz",
				},
				TPB: {
					T: "https://thepiratebay.org",
				},
				"1337x": {
					1: "https://1337x.to",
				},
			},
		};
		let categoriesJSON = JSON.stringify(categories);
		localStorage.setItem("categoriesJSON", categoriesJSON);
		return categories;
	}
}

// loop thro the categories and dynamically fill the sites object
function getSites() {
	const categories = getCategories();

	for (category in categories) {
		let category_card = document.getElementById(category);
		const category_sites = {};
		for (site in categories[category]) {
			for (hotkey in categories[category][site]) {
				let link = categories[category][site][hotkey];
				sites[hotkey] = link;
				category_sites[site] = link;
			}
		}
		for (category_site in category_sites) {
			const link = category_sites[category_site];
			category_card.innerHTML += `<li><a href=${link}>${category_site}</a></li>`;
		}
	}
}

//  Get the ASCII key code (int) of the key pressed then convert it to (string) the corresponding letter name
window.addEventListener("keydown", (event) => {
	let pressed_key = String.fromCharCode(event.keyCode);
	//event.preventDefault();
	let keys = Object.keys(sites);
	if (keys.includes(pressed_key)) {
		//  Lookup the corresponding key value in the dictionary
		let target_site = sites[pressed_key];
		//  Change window location to the corresponding site
		window.location.href = target_site;
	}
});

getSites();
