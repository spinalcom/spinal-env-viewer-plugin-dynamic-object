import Vue from 'vue';
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import aComponent from '../vue/dynamicObjectPanel.vue';

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service")
const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

class CreateDynamicObjectBtn extends SpinalContextApp {
  constructor() {
    super("Create DynamicObject", "This button create a DynamicObject", {
      icon: "add_location",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    let id = option.selectedNode.id.get();
    if (SpinalGraphService.getInfo(id).type.get() === "dynamicObjectGroup") {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(-1);
    }
  }

  action(option) {
      spinalPanelManagerService.openPanel("CreateObjectPanel", option);
    }
}

const extentionCreateObjectPanel = SpinalForgeExtention.createExtention({
  name: "CreateObjectPanel",
  vueMountComponent: Vue.extend(aComponent),
  // toolbar is optional
  panel: {
    title: "Create DynamicObject",
    classname: "spinal-pannel",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px",
    height: "159px",
    'min-height': '21vh'
  },
  onload: () => {},
  onUnLoad: () => {}
});

export { CreateDynamicObjectBtn, extentionCreateObjectPanel };
