import Vue from 'vue';
import aComponent from '../vue/dynamicGroupPanel.vue';

const {
  SpinalContextApp,
} = require("spinal-env-viewer-context-menu-service");

const {
  spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

class CreateGroupDynamicBtm extends SpinalContextApp {
  constructor() {
    super("Create Groupe Object", "This button create a DynamicObject group", {
      icon: "playlist_add",
      icon_type: "in",
      backgroundColor: "#FF0000",
      fontColor: "#FFFFFF"
    });
  }

  isShown(option) {
    if (option.selectedNode.type.get() === "DynamicObject") {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(-1);
    }
  }

  action(option) {
    spinalPanelManagerService.openPanel("CreateGroupPanel", option);
  }
}

const extentionCreateGroupPanel = SpinalForgeExtention.createExtention({
  name: "CreateGroupPanel",
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
    'min-height': '16vh'
  },
  onload: () => {},
  onUnLoad: () => {}
});

export { CreateGroupDynamicBtm, extentionCreateGroupPanel };
