const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';

class CreateDynamicContextBtn extends SpinalContextApp {
  constructor() {
    super("Create DOC", "This button create a DynamicObject context", {
      icon: "business",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown() {
    if (!SpinalGraphService.getContext("DynamicObject")) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(-1);
    }
  }

  action() {
    if (!SpinalGraphService.getContext("DynamicObject")) {
      SpinalGraphService.addContext("DynamicObject", "DynamicObject");
    }
  }
}

module.exports = CreateDynamicContextBtn;
