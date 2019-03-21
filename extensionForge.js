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
		this.viewer.addEventListener(
      		Autodesk.Viewing.ISOLATE_EVENT, (event) => {
      			if (event.nodeIdArray.length != 0) {
      				this.THREE.hideObject();
      				console.log("begin isolate");
      			} else {
      				 this.THREE.showObject();
      				console.log("end isolate");
      			}
     	})
		return true;
	}

    unload() {
    	this.viewer.removeEventListener(
      		Autodesk.Viewing.ISOLATE_EVENT, () => {
      		console.log('removeevent isolate');
     	})

		this.context.unbind(contextBinded)
    }
    cb() {
    	handleTHREEObject.call(this);
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
		this.THREE.DeleteObject(value);
	}
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
	if (_ObjectContext !== undefined) {
		let _ObjectGroup = await SpinalGraphService.getChildren(_ObjectContext.id.get(), []);
		if (_ObjectGroup[0] !== undefined) {
			this.context = SpinalGraphService.getRealNode(_ObjectGroup[0].id.get());
			this.contextBinded = this.context.bind(() => this.cb.call(this) );
			fillMySet.call(this);
		}
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
