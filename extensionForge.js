import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import THREEObject from './THREE';

class SpinalDynamicObjectForgeExtention {
	constructor(viewer, options) {
		window.Autodesk.Viewing.Extension.call(this, viewer, options);
		this.viewer = viewer;
		this.THREE = new THREEObject(window);
		//this.MySet = new Set();
	}
	load(){ 
		init.call(this);
		//fillMySet.call(this);	
		// this.context = getcontext
		return true;
		// this.contextbinded = this.context.bind(this.cb.bind(this))
	}

    /**
    * method called when the viewer unload of the extention
    * (managed by the autodesk viewer)
    */
    unload() {
		 this.context.unbind(contextBinded)
    }
    cb() {
    	console.log("-------------cb---------------");
    	handleTHREEObject.call(this);
		// this.context  ...  json
		// difference old et new return json de difference
    }
}

async function fillMySet() {
	this.MySet = new Set();
	let childrens = await SpinalGraphService.getChildren(this.context.info.id.get(), []);
	for (var i in childrens) {
		this.MySet.add(childrens[i].name.get());
		this.THREE.NewObject(childrens[i]);
	}
}

async function handleTHREEObject() {
	let obj = {};
	this.NewSet = new Set();
	let childrens = await SpinalGraphService.getChildren(this.context.info.id.get(), []);
	for (var i in childrens) {
		this.NewSet.add(childrens[i].name.get());
		obj[childrens[i].name.get()] = childrens[i];
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
		//console.log("Object deleted = ", value);
		this.THREE.DeleteObject(value);
	}
	//console.log("newobj = ", newObject, "deleted = ", deleteObject);
}

async function init() {
	let _graph = SpinalGraphService.getGraph()
	let _ObjectContext;
	let _context = await SpinalGraphService.getChildren(_graph.getId().get(), ["hasContext", "hasDynamicObjectGroup", "hasDynamicObject"])
	for (var i in _context) {
		if (_context[i].type.get() === "DynamicObject") {
			_ObjectContext = _context[i];
		}
	}
	//console.log(_ObjectContext);
	let _ObjectGroup = await SpinalGraphService.getChildren(_ObjectContext.id.get(), []);
	this.context = SpinalGraphService.getRealNode(_ObjectGroup[0].id.get());
	this.contextBinded = this.context.bind(() => this.cb.call(this) );
	//self.unbind = SpinalGraphService.bindNode(self.context.id.get(), self, self.cb)
	fillMySet.call(this);
	//console.log("hacontext ", _children);
	//console.log(_children.id.get())
	//let GroupObj = await SpinalGraphService.getChildren(_children.id.get(), ["hasDynamicObjectGroup", "hasDynamicObject"])
	//for (var i in _ObjectGroup) {
	//	console.log(_ObjectGroup[i].name.get());
	//}
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