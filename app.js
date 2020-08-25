
class Translate {
	constructor() {
	}
}


let text = document.getElementById("text");
let back = document.getElementById("back");
let cursor = document.getElementById("cursor");
let data;

(
	async function api() {
		data = await fetch("https://type.fit/api/quotes").then(x => {
			return x.json();
		})
	}
)();

document.addEventListener("mousemove", (e)=>{
	let x = e.clientX;
	let y = e.clientY;
	cursor.style.left = x + "px";
	cursor.style.top = y + "px";
})

document.addEventListener("click", (e)=>{
	cursor.classList.add('clicked');
	setTimeout(() => {
		cursor.classList.remove('clicked');
	}, 1500)
})

let initBtn = async () => {
	let btn = document.getElementById("ask");
	back.style.opacity = "1"
	btn.classList.add("scale");
	setTimeout(() => btn.style.display = "none", 800);
	setTimeout(() => { showData() }, 1000)
}

let showData = () => {
	let random = Math.floor(Math.random() * data.length);
	text.innerHTML = 
		`<div id="text-child"><h1>"${data[random].text}"</h1>
		<h4>- ${data[random].author || "Anónimo"}</h4></div>`
}


document.getElementById("ask-btn").addEventListener("click", initBtn);
back.addEventListener("click", showData);


// var gl; // Un variable global para el contexto WebGL

// function start() {
//   var canvas = document.getElementById("glcanvas");

//   gl = initWebGL(canvas);      // Inicializar el contexto GL
  
//   // Solo continuar si WebGL esta disponible y trabajando
  
//   if (gl) {
//     gl.clearColor(1.0, 0.0, 0.0, 0.5);                      // Establecer el color base en negro, totalmente opaco
//     gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
//     gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
//     gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Limpiar el buffer de color asi como el de profundidad
//   }
// }

// start()