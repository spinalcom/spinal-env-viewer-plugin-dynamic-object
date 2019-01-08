const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
import THREEObject from '../THREE';

class ZoomBtn extends SpinalContextApp {
  constructor() {
    super("dynamicObject Zoom", "This button zoom on a DynamicObject", {
      icon: "gps_fixed",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }
  isShown(option) {
    if (option.selectedNode.type.get() === "dynamicObject") {
      return Promise.resolve(1);
    } else {
      return Promise.resolve(-1);
    }
  }
  action(option) {
      this.THREE = new THREEObject();
      this.THREE.ZoomObject(option.selectedNode);
  }
}

module.exports = ZoomBtn;
