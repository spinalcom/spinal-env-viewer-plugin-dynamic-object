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
  <div class="rename-panel-container">
    <p class="rename-element">New name for groupe :</p>
    <div class="rename-element">
      <input v-model="input">
    </div>
    <div class="md-layout">
      <md-button class="md-layout-item"
                 v-on:click="createMethod">Create</md-button>
    </div>
    <hr />

  </div>
</template>

<script>
import { SpinalGraphService, SPINAL_RELATION_TYPE } from 'spinal-env-viewer-graph-service';
export default {
  name: "my_compo",
  data() {
    return {
      currentNode: "",
      input: "",
      contextId: ""
    };
  },
  methods: {
    opened(option) {
      this.currentNode = option.selectedNode;
      this.contextId = option.context.id.get();
    },
    createMethod() {
      let id = SpinalGraphService.createNode({name: this.input, type: "dynamicObjectGroup"});
      SpinalGraphService.addChildInContext(this.contextId, id, this.contextId, "hasDynamicObjectGroup", SPINAL_RELATION_TYPE);
    }
  }
};
</script>

<style>
.rename-panel-container * {
  box-sizing: border-box;
}
.rename-element {
  margin: auto;
  padding: auto;
  text-align: center;
  margin-top: 3%;
}
</style>