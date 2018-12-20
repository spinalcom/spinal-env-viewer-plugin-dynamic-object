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
  <div>
      <md-button v-on:click="changeValue" class="HeaderButton delete-panel-container">Custom your object</md-button>
            <p class="title">name : <input v-model="name"></p>

              <p class="title">Change X :</p>
            <div style="margin-left: 30px; margin-right: 90px;">
               <vue-slider ref="slider" v-bind="xValue" v-model="x"></vue-slider>
            </div> 
              <input type="number" v-model="x" class="slideWithInput" >

            <p class="title">Change Y :</p>
            <div style="margin-left: 30px; margin-right: 90px;">
               <vue-slider ref="slider" v-bind="yValue" v-model="y"></vue-slider>
            </div> 
              <input type="number" v-model="y" class="slideWithInput" >

            <p class="title">Change Z :</p>
            <div style="margin-left: 30px; margin-right: 90px;">
               <vue-slider ref="slider" v-bind="zValue" v-model="z"></vue-slider>
            </div> 
              <input type="number" v-model="z" class="slideWithInput" >

            <p class="title">Change Radius :</p>
            <div style="margin-left: 30px; margin-right: 90px;">
               <vue-slider ref="slider" v-bind="RadiusValue" v-model="radius"></vue-slider>
            </div> 
              <input type="number" v-model="radius" class="slideWithInput" >

            <p class="titleInput">Change Form :</p>
            <select class="selectedInput" style="margin-left: 150px;" v-model="formSelected">
                <option v-for="option in form" v-bind:value="option">
                 {{ option }}
                </option>
            </select>

            <p class="titleInput">Move element with click </p>
              <md-button class="md-button-accept selectedInput"
                style="margin-left: 210px;" v-on:click="getNewPosition">Change</md-button>

            <p class="titleInput">Change Color :</p>
              <select class="selectedInput" v-model="color" style="margin-left: 150px;">
                 <option v-for="option in optionsColor" v-bind:value="option">
                 {{ option }}
                </option>
              </select>


  </div>
</template>

<script>
import vueSlider from 'vue-slider-component/src/vue2-slider.vue'
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import THREEObject from '../THREE';
export default {
  name: "my_compo",
  components: {
    vueSlider
  },
  data() {
    return {
      xValue: {
        min: -300,
        max: 300,
        tooltip: false
      },
      yValue: {
        min: -300,
        max: 300,
        tooltip: false
      },
      zValue: {
        min: -300,
        max: 300,
        tooltip: false
      },
      RadiusValue: {
        min: 0,
        max: 25,
        tooltip: false
      },
      value: 1,
      currentNode: "",
      x: 0,
      y: 0,
      z: 0,
      color: "",
      radius: 1,
      name: "",
      formSelected: "",
      optionsColor: [
        "red",
        "green",
        "blue"
      ],
      form: [
       "sphere",
       "square",
       "triangle"
       ]
    };
  },
  methods: {
    opened(option) {
      this.currentNode = option.selectedNode;
      this.x = option.selectedNode.x.get();
      this.y = option.selectedNode.y.get();
      this.z = option.selectedNode.z.get();
      this.color = option.selectedNode.color.get()
      this.formSelected = option.selectedNode.form.get();
      this.radius = option.selectedNode.radius.get();
      this.name = option.selectedNode.name.get();
      this.THREE = new THREEObject();
    },
    changeX(){
      this.currentNode.x.set(this.x);
      this.THREE.CustomObject(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.x.set(this.currentNode.x.get());
    },
    changeY(){
      this.currentNode.y.set(this.y);
      this.THREE.CustomObject(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.y.set(this.currentNode.y.get());
    },
    changeZ(){
      this.currentNode.z.set(this.z);
      this.THREE.CustomObject(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.z.set(this.currentNode.z.get());
    },
    changeColor() {
      this.currentNode.color.set(this.color);
      this.THREE.CustomObjectColor(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.color.set(this.currentNode.color.get());
    },
    changeName() {
      this.currentNode.name.set(this.name);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.name.set(this.currentNode.name.get());
    },
    changeRadius() {
      this.currentNode.radius.set(this.radius);
      this.THREE.CustomObjectRadius(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.radius.set(this.currentNode.radius.get());
    },
    changeForm() {
      this.currentNode.form.set(this.formSelected);
      this.THREE.CustomObjectForm(this.currentNode);

      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());
      realNode.info.form.set(this.currentNode.form.get());
    },
    changePosition: function(e) {
      let clicked = window.spinal.ForgeViewer.viewer.clientToWorld(e.layerX, e.layerY, false);
      let realNode = SpinalGraphService.getRealNode(this.currentNode.id.get());

      if (clicked) {
        this.x = Math.round(clicked.intersectPoint.x);
        this.y = Math.round(clicked.intersectPoint.y);
        this.z = Math.round(clicked.intersectPoint.z);
        this.currentNode.x.set(this.x);
        this.currentNode.y.set(this.y);
        this.currentNode.z.set(this.z);
        realNode.info.x.set(this.currentNode.x.get());
        realNode.info.y.set(this.currentNode.y.get());
        realNode.info.z.set(this.currentNode.z.get());
      }
      document.removeEventListener("mousedown", this.changePosition, true);
      this.THREE.CustomObject(this.currentNode);
    },
    getNewPosition() {
      document.addEventListener("mousedown", this.changePosition, true);
    },
    changeValue() {
      if (this.x != this.currentNode.x.get()) {
        console.log("x changed");
        this.changeX();
      } if (this.y !== this.currentNode.y.get()) {
        console.log("y changed");
        this.changeY();
      } if (this.z !== this.currentNode.z.get()) {
        console.log("z changed");
        this.changeZ();
      } if (this.radius !== this.currentNode.radius.get()) {
        console.log("radius changed");
        this.changeRadius();
      } if (this.formSelected !== this.currentNode.form.get()) {
        console.log("form changed");
        this.changeForm();
      } if (this.color !== this.currentNode.color.get()) {
        console.log("color changed");
        this.changeColor();
      } if (this.name !== this.currentNode.name.get()) {
        console.log("name changed");
        this.changeName();
      }
    }
  }
};
</script>

<style scoped>
.delete-panel-container * {
  box-sizing: border-box;
}
.HeaderButton {
  text-align: center;
  font-size: 120%;
  background-color: #3C3B46;
  width: 380px;
}
.md-button-accept {
  background-color: #356BAB;
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
.title {
  margin: auto;
  margin-left: 40px;
}
.titleInput {
  margin-top: 3px;
  margin: auto;
  margin-left: 40px;
  height: 30px;
}
.selectedInput {
  margin-top:-30px;
  width:100px;
  position: absolute;
}
.slideWithInput {
  width: 50px;
  position: absolute;
  margin-left: 310px;
  margin-top:-20px;
}
</style>
