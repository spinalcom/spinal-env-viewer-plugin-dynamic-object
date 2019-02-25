import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
let self;

export default class THREEObjectsManager {
	constructor() {
		if (!self) {
			this.CreatedObject = {};
			this.selectedObject = {};
			this.selectedObjectColor = {};

			this._viewer = window.spinal.ForgeViewer.viewer;

			this.material_green = new THREE.MeshPhongMaterial(
				{ color: 0x00FF00 });
			//add material green to collection

			this._viewer.impl.matman().addMaterial(
				'ADN-Material' + 'green',
				this.material_green,
				true);

			this.material_blue = new THREE.MeshPhongMaterial(
				{ color: 0x95b7ed });
			//add material green to collection

			this._viewer.impl.matman().addMaterial(
				'ADN-Material' + 'blue',
				this.material_blue,
				true);

			this.material_red = new THREE.MeshPhongMaterial(

				{ color: 0xff0000 });
			//add material red to collection

			this._viewer.impl.matman().addMaterial(
				'ADN-Material' + 'red',
				this.material_red,
				true);

			this.material_yellow = new THREE.MeshPhongMaterial(

				{ color: 0xffff00 });
			//add material red to collection

			this._viewer.impl.matman().addMaterial(
				'ADN-Material' + 'yellow',
				this.material_yellow,
				true);

			this.colorRef = {red: this.material_red, blue: this.material_blue, green: this.material_green, yellow: this.material_yellow};
			self = this;
		} else {
			return self;
		}
    }
    NewObject(obj) {
		if (obj.form.get() === "sphere") {
			this.CreateSphere(obj);
		} else if (obj.form.get() === "square") {
			this.CreateSquare(obj);
		}
	}
	CreateSphere(obj) {
		//const getZ = obj.radius.get() || 2.5;

		let colorReference = new THREE.MeshPhongMaterial({color: obj.color.get() });

		this._viewer.impl.matman().addMaterial(
				'ADN-Material' + obj.color.get(),
				colorReference,
				true);

		var sphere_maxpt =
		new THREE.Mesh(
			this.CreateDynamicMesh(obj),
			colorReference);
		sphere_maxpt.position.set( obj.x.get(),
			obj.y.get(),
			obj.z.get() );

		sphere_maxpt.matrixAutoUpdate = false;
		obj["threeObj"] = sphere_maxpt;
		//add two spheres to scene
		sphere_maxpt.updateMatrix();
		let test = this._viewer.impl.scene.add(sphere_maxpt);

		this._viewer.fitToView([], sphere_maxpt);

		//update the viewer
		//this._viewer.impl.invalidate(true);
		this.CreatedObject[obj.name.get()] = { mesh: obj["threeObj"], id: obj.id.get() };
	}
	CreateSquare(obj) {
		//const newColor = this.colorRef[`${obj.color.get()}`]
		let colorReference = new THREE.MeshPhongMaterial({color: obj.color.get() });

		this._viewer.impl.matman().addMaterial(
				'ADN-Material' + obj.color.get(),
				colorReference,
				true);

		var sphere_maxpt =
		new THREE.Mesh(
			this.CreateDynamicMesh(obj),
			colorReference);
		sphere_maxpt.position.set( obj.x.get(),
			obj.y.get(),
			obj.z.get() );

		sphere_maxpt.matrixAutoUpdate = false;
		obj["threeObj"] = sphere_maxpt;
		//add two spheres to scene
		sphere_maxpt.updateMatrix();
		let test = this._viewer.impl.scene.add(sphere_maxpt);

		this._viewer.fitToView([], sphere_maxpt);

		//update the viewer
		this.CreatedObject[obj.name.get()] = { mesh: obj["threeObj"], id: obj.id.get() };
	}
	CreateDynamicMesh(obj) {
		if (obj.form.get() === "sphere") {
			return new THREE.SphereGeometry( obj.radius.get() , obj.widthSegments.get(), obj.heightSegments.get() );
		} else if (obj.form.get() === "square") {
			return new THREE.BoxGeometry(obj.width.get() , obj.height.get(), obj.depth.get());
		}
	}
	DeleteObject(name) {
		for (var i in this.CreatedObject) {
			if (i === name) {
				this._viewer.impl.scene.remove(this.CreatedObject[i].mesh);
				this._viewer.impl.invalidate(true);
				delete this.CreatedObject[i];
			}
		}
	}
	CustomObject(obj) {
		let name = obj.name.get();

		for (var i in this.CreatedObject) {
			if (i === name) {
				this.CreatedObject[obj.name.get()].mesh.position.set(obj.x.get(), obj.y.get(), obj.z.get());
				this.CreatedObject[obj.name.get()].mesh.updateMatrix();
				this.CreatedObject[obj.name.get()].mesh.updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObjectColor(obj) {
		let name = obj.name.get();
		let colorReference = new THREE.MeshPhongMaterial({color: obj.color.get() });

		this._viewer.impl.matman().addMaterial(
				'ADN-Material' + obj.color.get(),
				colorReference,
				true);

		for (var i in this.CreatedObject) {
			if (i === name) {
				this.CreatedObject[obj.name.get()].mesh.material = colorReference;
				this.CreatedObject[obj.name.get()].mesh.updateMatrix();
				this.CreatedObject[obj.name.get()].mesh.updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObjectRadius(obj) {
		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {
				this.DeleteObject(obj.name.get());
				this.NewObject(obj);
				this.CreatedObject[obj.name.get()].mesh.updateMatrix();
				this.CreatedObject[obj.name.get()].mesh.updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObjectForm(obj) {
		obj = obj.info
		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {
				this.DeleteObject(obj.name.get());
				this.NewObject(obj);

				this.CreatedObject[obj.name.get()].mesh.updateMatrix();
				this.CreatedObject[obj.name.get()].mesh.updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	ZoomObject(obj) {
		if (this.oldzoom) {
			this.CreatedObject[this.oldzoom.obj].mesh.material = this.colorRef[this.oldzoom.color];
		}

		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {

				this.oldzoom = {};
				this.oldzoom.color = this.CreatedObject[obj.name.get()].mesh.material
				this.CreatedObject[obj.name.get()].mesh.material = this.colorRef['yellow'];
				this.CreatedObject[obj.name.get()].mesh.updateMatrix();
				this.CreatedObject[obj.name.get()].mesh.updateMatrixWorld();
				this._viewer.impl.invalidate(true);
				let self = this;
				setTimeout(function() {
					self.CreatedObject[obj.name.get()].mesh.material = self.oldzoom.color;
					delete self.oldzoom;
					self.CreatedObject[obj.name.get()].mesh.updateMatrix();
					self.CreatedObject[obj.name.get()].mesh.updateMatrixWorld();
					self._viewer.impl.invalidate(true);
				}, 8000);
			}
		}
	}
	SelectObject(obj) {
		if (Object.keys(this.selectedObject).indexOf(obj.node.info.name.get()) == -1) {
			this.selectedObject[obj.node.info.name.get()] = {};
			this.selectedObject[obj.node.info.name.get()][`model`] = obj.model;
			this.selectedObject[obj.node.info.name.get()][`material`] = obj.model.material;
			this.CreatedObject[obj.node.info.name.get()].mesh.material = this.colorRef['blue'];
			this.CreatedObject[obj.node.info.name.get()].mesh.updateMatrix();
			this.CreatedObject[obj.node.info.name.get()].mesh.updateMatrixWorld();
			this._viewer.impl.invalidate(true);
		} else {
			this.CreatedObject[obj.node.info.name.get()].mesh.material = this.selectedObject[obj.node.info.name.get()][`material`];
			this.CreatedObject[obj.node.info.name.get()].mesh.updateMatrix();
			this.CreatedObject[obj.node.info.name.get()].mesh.updateMatrixWorld();
			this._viewer.impl.invalidate(true);
		}
	}
	ResetSelection() {
		for (var i in this.selectedObject) {
			this.selectedObject[i][`model`].material = this.selectedObject[i][`material`];
			this.selectedObject[i][`model`].updateMatrix();
			this.selectedObject[i][`model`].updateMatrixWorld();
			delete this.selectedObject[i];
		}
		this._viewer.impl.invalidate(true);
	}
	getAllMesh() {
		let arr = [];
		for (var i in this.CreatedObject) {
				arr.push(this.CreatedObject[i].mesh);
		}
		return arr;
	}
	getNode(nodeUuid) {
		for (var i in this.CreatedObject) {
			if (this.CreatedObject[i].mesh.uuid == nodeUuid) {
				//console.log(this.CreatedObject[i].mesh.uuid, " found ", this.CreatedObject[i].id);
				this.CreatedObject[i].mesh.depthTest = false;
				return { model: this.CreatedObject[i].mesh, node: SpinalGraphService.getRealNode(this.CreatedObject[i].id) };
			}
		}
	}
	hideObject() {
		for (var i in this.CreatedObject) {
			this.CreatedObject[i].mesh.visible = false;
		}
	}
	showObject() {
		for (var i in this.CreatedObject) {
			this.CreatedObject[i].mesh.visible = true;
		}
	}
	DynamicObjectSelected() {
		return (this.selectedObject.length < 1);
	}
}
