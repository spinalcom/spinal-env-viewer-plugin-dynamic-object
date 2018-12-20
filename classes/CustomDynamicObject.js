import Vue from 'vue';
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import aComponent from '../vue/customDynamicObject.vue';

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service")
const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

class CustomDynamicObjectBtn extends SpinalContextApp {
  constructor() {
    super("Custom DynamicObject", "This button custom a DynamicObject", {
      icon: "3d_rotation",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    let id = option.selectedNode.id.get();
    if (SpinalGraphService.getInfo(id).type.get() === "dynamicObject") {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(-1);
    }
  }

  action(option) {
      spinalPanelManagerService.openPanel("CustomObjectPanel", option);
    }
}

const extentionCustomObjectPanel = SpinalForgeExtention.createExtention({
  name: "CustomObjectPanel",
  vueMountComponent: Vue.extend(aComponent),
  // toolbar is optional
  panel: {
    title: "Custom DynamicObject",
    classname: "spinal-pannel",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px",
     height: "259px",
     width: "16px"
  },
  onload: () => {},
  onUnLoad: () => {}
});

export { CustomDynamicObjectBtn, extentionCustomObjectPanel };
