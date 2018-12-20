let self;

export default class THREEObjectsManager {
	constructor() {
		if (!self) {
			this.CreatedObject = {}

			this._viewer = window.spinal.ForgeViewer.viewer;

			this.material_green = new THREE.MeshPhongMaterial(
				{ color: 0x00FF00 });
			//add material green to collection

			this._viewer.impl.matman().addMaterial(
				'ADN-Material' + 'green',
				this.material_green,
				true);

			this.material_blue = new THREE.MeshPhongMaterial(
				{ color: 0x1D017C });
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

		const newColor = this.colorRef[`${obj.color.get()}`]
		const getZ = obj.radius.get() || 2.5;
		var sphere_maxpt =
		new THREE.Mesh(
			this.CreateDynamicMesh(obj),
			newColor);//.material_blue);
		sphere_maxpt.position.set(  obj.x.get(),
			obj.y.get(),
			(obj.z.get() + getZ ) );


		sphere_maxpt.matrixAutoUpdate = false;
		obj["threeObj"] = sphere_maxpt;
		//add two spheres to scene
		sphere_maxpt.updateMatrix();
		let test = this._viewer.impl.scene.add(sphere_maxpt);

		this._viewer.fitToView([], sphere_maxpt);

		//update the viewer
		this.CreatedObject[obj.name.get()] = obj["threeObj"];

	}
	CreateDynamicMesh(obj) {
		if (obj.form.get() === "sphere") {
			return new THREE.SphereGeometry( obj.radius.get() , obj.widthSegments.get(), obj.heightSegments.get() );
		} else if (obj.form.get() === "square") {
			return new THREE.BoxGeometry(2.5, 2.5, 2.5);
		}
	}
	DeleteObject(name) {
		for (var i in this.CreatedObject) {
			if (i === name) {
				this._viewer.impl.scene.remove(this.CreatedObject[i]);
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObject(obj) {
		let name = obj.name.get();
		const getZ = (obj.z.get() + obj.radius.get());

		for (var i in this.CreatedObject) {
			if (i === name) {
				this.CreatedObject[obj.name.get()].position.set(obj.x.get(), obj.y.get(), getZ);
				this.CreatedObject[obj.name.get()].updateMatrix();
				this.CreatedObject[obj.name.get()].updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObjectColor(obj) {
		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {
				console.log(this.CreatedObject[obj.name.get()]);
				this.CreatedObject[obj.name.get()].material = this.colorRef[obj.color.get()];
				this.CreatedObject[obj.name.get()].updateMatrix();
				this.CreatedObject[obj.name.get()].updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObjectRadius(obj) {
		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {
				console.log(this.CreatedObject[obj.name.get()]);
				this.DeleteObject(obj.name.get());
				this.NewObject(obj);
				this.CreatedObject[obj.name.get()].updateMatrix();
				this.CreatedObject[obj.name.get()].updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	CustomObjectForm(obj) {
		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {
				console.log(this.CreatedObject[obj.name.get()]);
				this.DeleteObject(obj.name.get());
				this.NewObject(obj);


				this.CreatedObject[obj.name.get()].updateMatrix();
				this.CreatedObject[obj.name.get()].updateMatrixWorld();
				this._viewer.impl.invalidate(true);
			}
		}
	}
	ZoomObject(obj) {
		if (this.oldzoom) {
			console.log(this.oldzoom.obj,this.CreatedObject[this.oldzoom.obj]);
			this.CreatedObject[this.oldzoom.obj].material = this.colorRef[this.oldzoom.color];
		}

		let name = obj.name.get();
		for (var i in this.CreatedObject) {
			if (i === name) {
				console.log(this.CreatedObject[obj.name.get()]);

				this.oldzoom = {};
				this.oldzoom.obj = obj.name.get();
				this.oldzoom.color = obj.color.get();

				this.CreatedObject[obj.name.get()].material = this.colorRef['yellow'];
				this.CreatedObject[obj.name.get()].updateMatrix();
				this.CreatedObject[obj.name.get()].updateMatrixWorld();
				this._viewer.impl.invalidate(true);
				let self = this;
				setTimeout(function() {
					self.CreatedObject[obj.name.get()].material = self.colorRef[obj.color.get()];
					self.CreatedObject[obj.name.get()].updateMatrix();
					self.CreatedObject[obj.name.get()].updateMatrixWorld();
					self._viewer.impl.invalidate(true);
				}, 8000);
			}
		}
	}
}
