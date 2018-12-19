const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import THREEObject from '../THREE';

class ZoomBtn extends SpinalContextApp {
  constructor() {
    super("", "", {
      icon: " ",
      icon_type: "",
      backgroundColor: "",
      fontColor: ""
    });
    //this.THREE = new THREEObject();
  }
  isShown(option) {
  
      // this.currentNode = option.selectedNode;

      // this.THREE.DeleteObject(this.currentNode);
      // this.currentNode.color.set(this.color);
      // //this.THREE.DeleteObject();
      // this.THREE.NewObject(this.currentNode);

      // console.log("----------------------------------------")
      // console.log(this.currentNode)
      // console.log(this.color)
      // let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      // realNode.info.color.set(this.currentNode.color.get());
      // console.log(this.currentNode.color.get());




   if (option.selectedNode.type.get() === "dynamicObject") {
      console.log("ok");
   }
   return Promise.resolve(1);
  }
}

module.exports = ZoomBtn;
