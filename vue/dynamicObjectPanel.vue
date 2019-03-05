<!--
Copyright 2018 SpinalCom - www.spinalcom.com
This file is part of SpinalCore.
Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.
This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.
If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <div class="panel-container" v-if="hidden">
    <p class="rename-element"> Name for the new Object :</p>
    <div class="rename-element">
      <input v-model="input">
    <p class="titleInput">Form :</p>
    <select class="selectedInput" style="margin-left: -9px; margin-top: -18px;" v-model="formSelected">
      <option v-for="option in form" v-bind:value="option">
       {{ option }}
      </option>
    </select>
    </div>
    <div class="md-layout">
      <md-button class="md-layout-item"
                 v-on:click="createMethod">Create</md-button>
    </div>
    <hr />

  </div>
  <div class="click-message" v-else>
    <p>  Click where you want for your new object</p>
  </div>
</template>

<script>
import { SpinalGraphService, SPINAL_RELATION_TYPE } from 'spinal-env-viewer-graph-service';
import THREEObject from '../THREE';
export default {
  name: "my_compo",
  data() {
    return {
      currentNode: "",
      input: "",
      contextId: "",
      viewer: '',
      formSelected: "sphere",
      x: 0,
      y: 0,
      z: 0,
      hidden: true,
      form: [
       "sphere",
       "square"
      ]
    };
  },
  methods: {
    opened(option) {
      this.THREE = new THREEObject();
      this.currentNode = option.selectedNode;
      this.contextId = option.context.id.get();
      this.viewer = window.spinal.ForgeViewer.viewer;

    },
    positionObject: function(e) {
      let clicked = this.viewer.clientToWorld(e.layerX, e.layerY, false);

      if (clicked) {
        this.x = Math.round(clicked.intersectPoint.x);
        this.y = Math.round(clicked.intersectPoint.y);
        this.z = Math.round(clicked.intersectPoint.z);
        this.createNewObject();
        window.spinal.ForgeViewer.viewer.impl.invalidate(true);
      }
    },
    createNewObject() {
      document.removeEventListener("mousedown", this.positionObject, true);
      let id;
      console.log(this.formSelected);
      if (this.formSelected === "sphere") {
        console.log("SPHERE DETECTED");
        id = SpinalGraphService.createNode({name: this.input, type: "dynamicObject", x: this.x, y: this.y, z: this.z, color: "#0000FF"
          , radius: 1, widthSegments: 30, heightSegments: 30, form: "sphere"});
        SpinalGraphService.addChildInContext(this.currentNode.id.get(), id, this.contextId, "hasDynamicObject", SPINAL_RELATION_TYPE);
        let el = document.getElementsByClassName("dockingPanelClose");
        el[4].click();
        let obj = SpinalGraphService.getNode(id);
        this.THREE.NewObject(obj);
        this.hidden = true;
        this.input = "";
      } else if (this.formSelected === "square") {
        console.log("SQUARE DETECTED");
        id = SpinalGraphService.createNode({name: this.input, type: "dynamicObject", x: this.x, y: this.y, z: this.z, color: "#0000FF"
          , depth: 2.5, width: 2.5, height: 2.5, form: this.formSelected});
        SpinalGraphService.addChildInContext(this.currentNode.id.get(), id, this.contextId, "hasDynamicObject", SPINAL_RELATION_TYPE);
        let el = document.getElementsByClassName("dockingPanelClose");
        el[4].click();
        let obj = SpinalGraphService.getNode(id);
        this.THREE.NewObject(obj);
        this.hidden = true;
        this.input = "";
      }
    },
    createMethod() {
      this.hidden = false;
      document.addEventListener("mousedown", this.positionObject, true);
    }
  }
};
</script>

<style scoped>
.panel-container * {
  box-sizing: border-box;
}
.rename-element {
  margin: auto;
  padding: auto;
  text-align: center;
  margin-top: 3%;
}
.click-message {
  text-align: center;
  padding-top: 20px;
}
.selectedInput {
  margin-top:-30px;
  width:100px;
  position: absolute;
}
.titleInput {
  margin-top: 3px;
  margin: auto;
  margin-left: -115px;
  padding-top: 10px;
  height: 30px;
}
</style>
