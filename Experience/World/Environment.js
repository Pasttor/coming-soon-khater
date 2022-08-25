import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment { 
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.setSunlight();
        
    }

    setSunlight(){
        this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(1024,1024);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(1.5, 7, 3);
        this.scene.add(this.sunlight);

        //Frontlight
        this.pointLight1 = new THREE.PointLight(0xFFFFFF, 3)
        this.pointLight1.position.set(0, 0, 2)
        this.scene.add(this.pointLight1)

        //Rightlight
        this.pointLight2 = new THREE.PointLight(0xFFFFFF, 0.5)
        this.pointLight2.position.set(2, 0, 0)
        this.scene.add(this.pointLight2)
        //Backlight
        this.pointLight3 = new THREE.PointLight(0x001BFA, 9)
        this.pointLight3.position.set(0, 0, -1)
        //this.pointLight3.intensity = 9
        this.scene.add(this.pointLight3)
        
        //Leftlight
        this.pointLight4 = new THREE.PointLight(0xFFFFFF, 0.5)
        this.pointLight4.position.set(-2, 0, 0)
        this.scene.add(this.pointLight4)


        this.ambientLight = new THREE.AmbientLight( 0xffffff, 3);
        this.scene.add( this.ambientLight );
    }

    resize() {}

    update() {}
}