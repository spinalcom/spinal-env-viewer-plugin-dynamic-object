
export default class THREEObject {
	constructor(windows) {
		this.CreatedObject = {}
		this._viewer = windows.spinal.ForgeViewer.viewer;

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
		this.colorRef = {red: this.material_red, blue: this.material_blue, green: this.material_green};
    }
    NewObject(obj) {
		console.log("NEWOBJECT = ");
		//console.log(obj);

		console.log(this.colorRef[`${obj.color.get()}`])
		console.log(this.material_blue)
		const newColor = this.colorRef[`${obj.color.get()}`]
		var sphere_maxpt =
		new THREE.Mesh(
			new THREE.SphereGeometry(
				obj.radius.get() , obj.widthSegments.get(), obj.heightSegments.get()),
			newColor);//.material_blue);
		sphere_maxpt.position.set(  obj.x.get(),
			obj.y.get(),
			obj.z.get());

		obj["threeObj"] = sphere_maxpt;
		//add two spheres to scene

		let test = this._viewer.impl.scene.add(sphere_maxpt);
		//console.log(test);
		//console.log(sphere_maxpt);
		//console.log(sphere_maxpt.id);

		this._viewer.fitToView([], sphere_maxpt);
		//update the viewer
		this._viewer.impl.invalidate(true);
		this.CreatedObject[obj.name.get()] = obj["threeObj"];

	}
	DeleteObject(name) {
		console.log("in deleteObject ",name);
		console.log(this.CreatedObject);
		for (var i in this.CreatedObject) {
			console.log(i);
			if (i === name) {
				this._viewer.impl.scene.remove(this.CreatedObject[i]);
				this._viewer.impl.invalidate(true);
			}
		}
		//this._viewer.impl.scene.remove(obj["threeObj"]);
	}
}
