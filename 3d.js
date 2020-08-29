(
	function start() {
		let vertexShaderText = [
			'precision mediump float;',
			'',
			'attribute vec2 vertPosition;',
			'attribute vec3 vertColor;',
			'varying vec3 fragColor;',
			'',
			'void main()',
			'{',
			'fragColor = vertColor;',
			'  gl_Position = vec4(vertPosition,0.0,1.0);',
			'}'
		].join('\n');

		let fragmentShaderText = [
			'precision mediump float;',
			'',
			'varying vec3 fragColor;',
			'void main()',
			'{',
			'  gl_FragColor = vec4(fragColor,1.0);',
			'}'
		].join('\n');

		let canvas = document.getElementById("glcanvas");
		const gl = canvas.getContext("webgl");

		if (gl === null) {
			alert("Unable to initialize WebGL. Your browser or machine may not support it.");
			return;
		}
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		gl.viewport(0,0, window.innerWidth, window.innerHeight)
		gl.clearColor(0.4,0.5,0.2,1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);// Limpiar el buffer de color asi como el de profundidad
		
		// 	gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos

		let vertexShader = gl.createShader(gl.VERTEX_SHADER);
		let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		gl.shaderSource(vertexShader, vertexShaderText);
		gl.shaderSource(fragmentShader, fragmentShaderText);

		gl.compileShader(vertexShader);

		if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
			console.error('vertexShader', gl.getShaderInfoLog(vertexShader));
			return;		
		}

		gl.compileShader(fragmentShader);

		if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
			console.error('fragmentShader', gl.getShaderInfoLog(fragmentShader));
			return;		
		}

		let program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('error linking program', gl.getProgramInfoLog(program));
			return;
		}

		gl.validateProgram(program);

		if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
			console.error('error validating program', gl.getProgramInfoLog(program));
			return;
		}

		// create buffer

		let triangleVertices = [
			// x, y      r,g,b
			0.0, 0.5, 1.0, 1.0, 1.0,
			-0.5, -0.5, 0.0, 0.0, 1.0,
			0.5, -0.5, 1.0, 0.0, 0.0
		]

		let triangleVertexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

		let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
		let colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
		gl.vertexAttribPointer(
			positionAttribLocation, //atribute location
			2, //number of elements per attribute
			gl.FLOAT, //type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
			0 //offset from the beginning of a single vertex to this attribute
		)
		gl.vertexAttribPointer(
			colorAttribLocation, //atribute location
			3, //number of elements per attribute
			gl.FLOAT, //type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, //size of an individual vertex
			2 * Float32Array.BYTES_PER_ELEMENT, 
		)
		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(colorAttribLocation);

		// main render loop

		gl.useProgram(program);
		gl.drawArrays(gl.TRIANGLES, 0, 3)

	}
)();