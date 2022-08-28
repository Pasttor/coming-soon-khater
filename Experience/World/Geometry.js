import * as THREE from "three";
import Experience from "../Experience.js";

import GSAP from "gsap";

export default class Geometry { 
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        
        this.setGeometry();   

        
        this.countdown(); 
        
        
    }

    countdown = () => {
        this.countDate = new Date( 'Nov 25, 2022 00:00:00').getTime();
        this.now = new Date().getTime();
        this.gap = this.countDate - this.now;

        this.second = 1000;
        this.minute = this.second * 60;
        this.hour = this.minute * 60;
        this.day = this.hour * 24;

        this.txtDay = Math.floor(this.gap / this.day);
        this.txtHour = Math.floor((this.gap % this.day) / this.hour);
        this.txtMinute = Math.floor((this.gap % this.hour) / this.minute);
        this.txtSecond = Math.floor((this.gap % this.minute) / this.second);

        document.querySelector('.day').innerText = this.txtDay;
        document.querySelector('.hour').innerText = this.txtHour;
        document.querySelector('.minute').innerText = this.txtMinute;
        document.querySelector('.second').innerText = this.txtSecond;


    }



    setGeometry() {
        this.geometry1 = new THREE.IcosahedronGeometry( 0.3, 0,);
        this.geometry3 = new THREE.IcosahedronGeometry( 0.5, 0,);
        this.geometry2 = new THREE.IcosahedronGeometry( 0.2, 0,);

        this.material = new THREE.MeshStandardMaterial({
            flatShading : true,
        });


        this.material.color = new THREE.Color(0xFFFFFF)
        this.material.metalness = 0.258
        this.material.roughness = 0
        
/*         this.material.metalness = 0.7
        this.material.roughness = 1 */

        // RightMesh
        this.sphere = new THREE.Mesh(this.geometry1, this.material)
        this.sphere.position.x = 0.9;
        this.sphere.position.y = 0;
        this.sphere.position.z = 0;
        this.scene.add(this.sphere)

        //CenterMesh
        this.sphere1 = new THREE.Mesh( this.geometry3, this.material);
        this.sphere1.castShadow = true;
        this.sphere1.position.x = 0;
        this.sphere1.position.y = .9;
        this.sphere1.position.z = -0.5;
        this.scene.add( this.sphere1 );
        //LeftMesh
        this.sphere2 = new THREE.Mesh( this.geometry2, this.material);
        this.sphere2.castShadow = true;
        this.sphere2.position.x = -0.5;
        this.sphere2.position.y = -0.4;
        this.sphere2.position.z = 0.4;
        this.scene.add( this.sphere2 );

    }

    resize() {}

    update() {
        // Update objects
        this.sphere.rotation.x -= 0.006
        this.sphere1.rotation.x += 0.003
        this.sphere2.rotation.x -= 0.009
        
        setInterval(this.countdown, 1000);
    }
}