import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import THREEObject from './THREE';

class SpinalDynamicObjectForgeExtention {
	constructor(viewer, options) {
		window.Autodesk.Viewing.Extension.call(this, viewer, options);
		this.viewer = viewer;
		this.THREE = new THREEObject();
	}
	load(){ 
		init.call(this);
		return true;
	}

    /**
    * method called when the viewer unload of the extention
    * (managed by the autodesk viewer)
    */
    unload() {
		 this.context.unbind(contextBinded)
    }
    cb() {
    	handleTHREEObject.call(this);
    }
}

async function fillMySet() {
	this.MySet = new Set();
	let _ObjectGroup = await SpinalGraphService.getChildren(this.context.info.id.get(), []);

	for (var grp in _ObjectGroup) {

		let element = await SpinalGraphService.getChildren(_ObjectGroup[grp].id.get(), []);

		for (var current in element) {
			console.log("fill", element[current]);
			this.MySet.add(element[current].name.get());
			this.THREE.NewObject(element[current]);
		}
	}
}

async function handleTHREEObject() {
	let obj = {};
	this.NewSet = new Set();
	let _ObjectGroup = await SpinalGraphService.getChildren(this.context.info.id.get(), []);
	for (var grp in _ObjectGroup) {

		let element = await SpinalGraphService.getChildren(_ObjectGroup[grp].id.get(), []);

		for (var current in element) {
			console.log("handle", element[current]);
			this.NewSet.add(element[current].name.get());
			obj[element[current].name.get()] = element[current];
		}
	}
	//console.log(this.NewSet)
	let deleteObject = difference(this.MySet, this.NewSet)
	let newObject = difference(this.NewSet, this.MySet);

	if (newObject.size > 0) {
		const it = newObject.values();
		const first = it.next();
		const value = first.value;
		this.THREE.NewObject(obj[value]);
	}
	else if (deleteObject.size > 0) {
		const it = deleteObject.values();
		const first = it.next();
		const value = first.value;
		this.THREE.DeleteObject(value);
	}
}

async function init() {
	let _graph = SpinalGraphService.getGraph()
	let _ObjectContext;
	let _context = await SpinalGraphService.getChildren(_graph.getId().get(), [])
	let test = await SpinalGraphService.getChildren(_context[0].id.get(), []);
	for (var i in _context) {
		if (_context[i].type.get() === "DynamicObject") {
			console.log("in if === dynamic object", _context[i], i);
			_ObjectContext = _context[i];
		}
	}

	if (_ObjectContext !== undefined ) {
		let _ObjectGroup = await SpinalGraphService.getChildren(_ObjectContext.id.get(), []);
		this.context = SpinalGraphService.getRealNode(_ObjectContext.id.get());
		this.contextBinded = this.context.bind(() => this.cb.call(this) );
		//self.unbind = SpinalGraphService.bindNode(self.context.id.get(), self, self.cb)
		fillMySet.call(this);
	}
}

function difference(setA, setB) {
  var difference = new Set(setA);
  for (var elem of setB) {
    difference.delete(elem);
  }
  return difference;
}

window.Autodesk.Viewing.theExtensionManager.registerExtension(
         "SpinalDynamicObjectForgeExtention",
         SpinalDynamicObjectForgeExtention
       );

/// register to viewer
window.spinal.ForgeExtentionManager.addExtention("SpinalDynamicObjectForgeExtention");

export { SpinalDynamicObjectForgeExtention };
