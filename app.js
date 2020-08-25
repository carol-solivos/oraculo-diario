
class Translate {
	constructor() {
	}
}

let container = document.getElementById("text");
let data;

(
	async function api() {
		data = await fetch("https://type.fit/api/quotes").then(x => {
			return x.json();
		})
	}
)();

let initBtn = async () => {
	let btn = document.getElementById("ask");
	btn.classList.add("scale");
	setTimeout(() => btn.style.display = "none", 600);
	setTimeout(() => { showData() }, 1000)
}

let showData = () => {
	let random = Math.floor(Math.random() * data.length);
	container.innerHTML = 
		`<div><h1>"${data[random].text}"</h1>
		<h4>- ${data[random].author || "Anónimo"}</h4></div>`
}


document.getElementById("ask").addEventListener("click", initBtn);
document.getElementById("back").addEventListener("click", showData);
