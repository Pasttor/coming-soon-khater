import * as THREE from "three";
import Experience from "../Experience.js";

import GSAP from "gsap";

export default class Room { 
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.logo = this.resources.items.logo;
        this.actualLogo = this.logo.scene;

        this.lerp = {
            current: 0, 
            target: 0, 
            ease: 0.1,
        };


        //console.log(this.actualLogo)

        this.setModel();
        //this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        //positioning logo
        this.actualLogo.position.set(0, 0.1, 0)
        this.actualLogo.children[1].rotation.x = Math.PI / 2 * 3
        this.actualLogo.children[0].rotation.z = Math.PI / 2 
        

        this.actualLogo.children.forEach((child) => {
            child.castShadow = true;
            child.reciveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    child.castShadow = true;
                    child.reciveShadow = true;
                })
            }

            if (child.name === 'Curve', 'Curve030') {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.57;
                child.material.metalness = 0;
                child.material.clearcoat = 1;
                child.material.clearcoatRoughness = 0;
                child.material.color.set(0x000000);
                //child.material.specularColor.set(0x002b70);
                child.material.ior = 2;
                child.material.transmission = 0;
                child.material.thickness = 5;
                child.material.specularIntensity = 0;
                child.material.opacity = 1;
            }

/*             if (child.name === "Curve030") {
                child.material = new THREE.MeshBasicMaterial({ 
                    map: this.resources.items.screen, 
                });
            } */
            //console.log(child);
        });

        this.scene.add(this.actualLogo);
        this.actualLogo.scale.set(0.5, 0.5);
    }


    onMouseMove(){ 
        window.addEventListener("pointermove", (e) => {
            //console.log(e)
            this.rotation = 
            ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            //console.log(e.clientX, this.rotation);
            this.lerp.target = this.rotation * 0.3;
        })
        
    }


    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        //mousemove
        this.actualLogo.rotation.y = this.lerp.current;


        this.actualLogo.children[1].rotation.y += 0.0006


    }
}