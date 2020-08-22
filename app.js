
class Translate {
	constructor() {
	}
}
let container = document.getElementById("text");

let api = async () => {
	let data = await fetch("https://type.fit/api/quotes").then(x => {
		return x.json();
	})
	let btn = document.getElementById("ask");
	btn.classList.add("scale");
	await setTimeout(() => btn.style.display = "none", 600)
	setTimeout(() => {
		let random = Math.floor(Math.random() * data.length);
		container.innerHTML = `<h1>"${data[random].text}"</h1>
													<h4>${data[random].author || "Anónimo"}</h4>`
	}, 1000)



	translate();
	// // document.getElementsByClassName("goog-te-combo")[0].value = "su"
}


document.getElementById("ask").addEventListener("click", api);


async function translate() {
	let translate = await new google.translate.TranslateElement(
		{
			pageLanguage: 'en',
			includedLanguages: 'es',
			layout: google.translate.TranslateElement.InlineLayout.SIMPLE
		}, 'translate');
	}
