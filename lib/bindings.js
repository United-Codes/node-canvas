'use strict'

let bindings;
const mainFileLocation = path.basename(process.execPath).startsWith('node') ? __dirname : path.dirname(process.execPath);
var binding_path;
try {
	if (fs.existsSync(path.join(mainFileLocation, 'assets'))) {
		if (process.platform === 'linux' && process.arch === 'x64') {
			binding_path = 'assets/cln.node';
		} else if (process.platform === 'linux') {
			binding_path = 'assets/cln.node';
		} else if (process.platform === 'darwin' || process.platform === 'openbsd' || process.platform === 'freebsd') {
			binding_path = 'assets/cmn.node';
		} else {
			binding_path = 'assets/cwn.node';
		}
		bindings = require(path.join(mainFileLocation, binding_path));
		module.exports = bindings;
	}
	else {
		bindings = require('../build/Release/canvas.node'); 
		module.exports = bindings;
	}
}
catch (error) {
	try {
		binding_path = 'assets/crn.node'; // Support for RHEL
		bindings = require(path.join(mainFileLocation, binding_path));
		module.exports = bindings;
	} catch (err) {
		console.error(`Failed to bind the path of canvas. Error:\n`, err);
		bindings = require('../build/Release/canvas.node') // Fallback to the original
		module.exports = bindings; 
	}
}

module.exports = bindings

Object.defineProperty(bindings.Canvas.prototype, Symbol.toStringTag, {
  value: 'HTMLCanvasElement',
  configurable: true
})

Object.defineProperty(bindings.Image.prototype, Symbol.toStringTag, {
  value: 'HTMLImageElement',
  configurable: true
})

bindings.ImageData.prototype.toString = function () {
	return '[object ImageData]'
}

Object.defineProperty(bindings.ImageData.prototype, Symbol.toStringTag, {
  value: 'ImageData',
  configurable: true
})

bindings.CanvasGradient.prototype.toString = function () {
	return '[object CanvasGradient]'
}

Object.defineProperty(bindings.CanvasGradient.prototype, Symbol.toStringTag, {
  value: 'CanvasGradient',
  configurable: true
})

Object.defineProperty(bindings.CanvasPattern.prototype, Symbol.toStringTag, {
  value: 'CanvasPattern',
  configurable: true
})

Object.defineProperty(bindings.CanvasRenderingContext2d.prototype, Symbol.toStringTag, {
  value: 'CanvasRenderingContext2d',
  configurable: true
})
