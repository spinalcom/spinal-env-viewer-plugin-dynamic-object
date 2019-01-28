/////////////////////////////////////////////////////////////////////
//
// Illustrates how to perform double ray casting to detect selection
// of custom meshes added to the scene and handle occlusion with
// Viewer meshes from loaded model.
//
/////////////////////////////////////////////////////////////////////
import THREEObject from './THREE';

class MeshSelectionExtension extends window.Autodesk.Viewing.Extension {

  constructor (viewer, options) {
    super (viewer, options)
    this.THREE = new THREEObject();
    this.viewer = viewer
  }

  load () {
    console.log('Viewing.Extension.MeshSelection loaded')
    this.viewer.addEventListener(
      Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, () => {
        this.dbIds = this.getAllDbIds()
      })

    this.viewer.toolController.registerTool(this)
    this.viewer.toolController.activateTool(
      'Viewing.Extension.MeshSelection')
    this.intersectMeshes = []

    return true
  }

  getNames () {
    return ['Viewing.Extension.MeshSelection']
  }

  activate () { }

  deactivate () { }

  unload () {
    console.log('Viewing.Extension.MeshSelection unloaded')
    this.viewer.toolController.deactivateTool(
      'Viewing.Extension.MeshSelection')
    this.viewer.toolController.unregisterTool(this)

    return true
  }
  pointerToRaycaster (domElement, camera, pointer) {
    const pointerVector = new THREE.Vector3()
    const pointerDir = new THREE.Vector3()
    const ray = new THREE.Raycaster()
    const rect = domElement.getBoundingClientRect()
    const x = ((pointer.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((pointer.clientY - rect.top) / rect.height) * 2 + 1

    if (camera.isPerspective) {
      pointerVector.set(x, y, 0.5)
      pointerVector.unproject(camera)

      ray.set(camera.position,
        pointerVector.sub(
          camera.position).normalize())
    } else {
      pointerVector.set(x, y, -1)
      pointerVector.unproject(camera)
      pointerDir.set(0, 0, -1)

      ray.set(pointerVector,
        pointerDir.transformDirection(
          camera.matrixWorld))
    }

    return ray
  }

  handleSingleClick (event) {

    const pointer = event.pointers
      ? event.pointers[0]
      : event

    const rayCaster = this.pointerToRaycaster(
      this.viewer.impl.canvas,
      this.viewer.impl.camera,
      pointer)

    const intersectResults = rayCaster.intersectObjects(
      this.THREE.getAllMesh(), true)

    const hitTest = this.viewer.model.rayIntersect(
      rayCaster, true, this.dbIds)

    const selections = intersectResults.filter( (res) =>
      (!hitTest || (hitTest.distance > res.distance)) )

    if (selections.length && event.shiftKey ) {
      this.THREE.SelectObject(this.THREE.getNode(selections[0].object.uuid));
      //event.stopPropagation();
      return true
    }
    else if (selections.length) {
      this.THREE.ResetSelection();
      this.viewer.clearSelection();
      this.THREE.SelectObject(this.THREE.getNode(selections[0].object.uuid));

       /*   Event for circular menu  */
      let HandleEvent = new Event('DynamicObjectClick');
      HandleEvent.nodeUuid = selections[0].object.uuid;
      HandleEvent.x = event.clientX;
      HandleEvent.y = event.clientY;
      HandleEvent.is = "dynamic";
      HandleEvent.dbId = [];
      HandleEvent.returnObj = this.THREE.getNode(selections[0].object.uuid);
      this.viewer.clientContainer.dispatchEvent(HandleEvent);
      return true
    }
    if (this.THREE.DynamicObjectSelected && !event.shiftKey) {
      this.THREE.ResetSelection();
    }
    return false
  }

  getAllDbIds() {
    const {instanceTree} = this.viewer.model.getData()
    const {dbIdToIndex} = instanceTree.nodeAccess
    return Object.keys(dbIdToIndex).map((dbId) => {
      return parseInt(dbId)
    })
  }
}


window.Autodesk.Viewing.theExtensionManager.registerExtension(
        "Viewing.Extension.MeshSelection",
        MeshSelectionExtension
        );

window.spinal.ForgeExtentionManager.addExtention("Viewing.Extension.MeshSelection");
