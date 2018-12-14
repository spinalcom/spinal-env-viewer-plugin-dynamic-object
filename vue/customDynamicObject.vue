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
  <div class="delete-panel-container">
      <div class="warningMessage">
          <p class="warningDelete">Custom your object</p>
    </div>
    <div class="md-layout md-input-div center-div">
            <p>name : <input v-model="name">
            <md-button class="md-button-accept"
                 v-on:click="changeName">Change</md-button>
            </p>
            <br>
            <p>x : <input v-model="x" style="margin-left:30px">
            <md-button class="md-button-accept"
                 v-on:click="changeX">Change</md-button>
            </p>
            <br>
            <p>y : <input v-model="y" style="margin-left:30px">
            <md-button class="md-button-accept"
                 v-on:click="changeY">Change</md-button>
            </p>
            <br>
            <p>z : <input v-model="z" style="margin-left:30px">
            <md-button class="md-button-accept"
                 v-on:click="changeZ">Change</md-button>
            </p>
            <br>
            <p>color :  
              <select v-model="color" style="margin-right:74px; margin-left:7px;width: 107px;">
                 <option v-for="option in optionsColor" v-bind:value="option">
                 {{ option }}
                </option>
              </select>

                      <!-- <input v-model="color" style="margin-left:6px"> -->
            <md-button class="md-button-accept"
                 v-on:click="changeColor">Change</md-button>
            </p>
            <br>
            <p>radius : <input v-model="radius" style="margin-left:1px">
            <md-button class="md-button-accept"
                 v-on:click="changeRadius">Change</md-button>
            </p>
<!--             <md-button class="md-button-cancel"
                 v-on:click="cancelMethod">Cancel</md-button> -->
    </div>
    <hr/>

  </div>
</template>

<script>
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import THREEObject from '../THREE';
export default {
  name: "my_compo",
  data() {
    return {
      currentNode: "",
      x: 0,
      y: 0,
      z: 0,
      color: "",
      radius: 1,
      name: "",
      colorSelected: "",
      optionsColor: [
        "red",
        "green",
        "blue"
      ]
    };
  },
  methods: {
    opened(option, viewer) {
      this.currentNode = option.selectedNode;
      this.x = option.selectedNode.x.get();
      this.y = option.selectedNode.y.get();
      this.z = option.selectedNode.z.get();
      this.color = option.selectedNode.color.get()
      this.radius = option.selectedNode.radius.get();
      this.name = option.selectedNode.name.get();
      this.THREE = new THREEObject(window);
    },
    changeX(option, viewer) {
      this.THREE.DeleteObject(this.currentNode);
      this.currentNode.x.set(this.x);
      this.THREE.NewObject(this.currentNode);
      console.log(this.currentNode.x.get())

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.x.color.set(this.currentNode.x.get());
    },
    changeY(option, viewer) {
      this.THREE.DeleteObject(this.currentNode);
      this.currentNode.y.set(this.y);
      //this.THREE.DeleteObject();
      this.THREE.NewObject(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.y.set(this.currentNode.y.get());
    },
    changeZ(option, viewer) {
      this.THREE.DeleteObject(this.currentNode);
      this.currentNode.z.set(this.z);
      //this.THREE.DeleteObject();
      this.THREE.NewObject(this.currentNode);


     // this.THREE.DeleteObject(this.currentNode.selectedNode.id.get())


      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.z.set(this.currentNode.z.get());
    },
    changeColor(option, viewer) {
      this.THREE.DeleteObject(this.currentNode);
      this.currentNode.color.set(this.color);
      //this.THREE.DeleteObject();
      this.THREE.NewObject(this.currentNode);

      console.log("----------------------------------------")
      console.log(this.currentNode)
      console.log(this.color)
      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.color.set(this.currentNode.color.get());
      console.log(this.currentNode.color.get());
    },
    changeName(option, viewer) {
      this.THREE.DeleteObject(this.currentNode);
      this.currentNode.name.set(this.name);
      //this.THREE.DeleteObject();
      this.THREE.NewObject(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.name.set(this.currentNode.name.get());
    },
    changeRadius(option, viewer) {
      this.THREE.DeleteObject(this.currentNode);
      this.currentNode.radius.set(this.radius);
      //this.THREE.DeleteObject();
      this.THREE.NewObject(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.radius.set(this.currentNode.radius.get());

      //console.log(this.currentNode);
    //  SpinalGraphService.removeFromGraph(this.currentNode.selectedNode.id.get())
      //this.currentNode.selectedNode.removeFromGraph();
    //  let el = document.getElementsByClassName("dockingPanelClose");
    //  el[4].click();
      //  removeChild( nodeId, childId, relationName, relationType, stop = false )
    },
    cancelMethod(option, viewer) {
    //  let el = document.getElementsByClassName("dockingPanelClose");
    //  el[4].click();
    }
  }
};
</script>

<style>
.delete-panel-container * {
  box-sizing: border-box;
}
.warningDelete {
  text-align: center;
  font-size: 120%;
}
.md-button-accept {
  background-color: white;
  margin: auto;
  padding: auto;
  height: 24px;
}
.md-input-div {
  margin: auto;
  padding: auto;
}
.center-div {
  margin-left: 40px;
}
</style>
