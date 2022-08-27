import {EventEmitter} from "events";
import Experience from "./Experience.js";
import Room from "./World/Room.js";
import GSAP from "gsap";


export default class Preloader extends EventEmitter{ 
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        
        
        

        this.world.on('worldready', ()=> {
            //this.setAssets();
            this.playIntro();
        })

    }
/*     setAssets() {
        this.logo = this.experience.world.room.actualLogo;
        console.log(this.logo)
    }
 */
        

    playIntro() {
        this.logo = this.experience.world.room.actualLogo;
        this.logoRing = this.experience.world.room.actualLogo.children[1];
        this.logoK = this.experience.world.room.actualLogo.children[0];
        
        

        
        this.svgi = document.getElementById("svgi");
        
        console.log(this.logoRing);
        this.tl = new GSAP.timeline({defaults: { ease: 'easeOutQuart', duration: '0.6'}});
        this.curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        this.flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        this.tl.to(".ring-logo-loader", {
            delay: 1,
            scale: 1,
            opacity: 100,
        }, 'same').to(".ring-logo-loader", {
            delay: 1.5,
            scale: 0,
            opacity: 0,
        }, 'same-s');
        this.tl.to(".k-logo-loader", {
            delay: 1,
            opacity: 100,
            scale: 1
        }, 'same').to(".k-logo-loader", {
            delay: 1.5,
            scale: 0,
            opacity: 0,
        }, 'same-s');
        this.tl.to(this.svgi, {
            duration: 0.9,
            attr: { d: this.curve },
            //ease: "power2.easeIn",
        }).to(this.svgi, {
            duration: 0.9,
            attr: { d: this.flat },
            //ease: "power2.easeOut",
        });
        this.tl.to(".loader-wrap", {
        y: -1500,
        });
        this.tl.to(".loader-wrap", {
            zIndex: -1,
            display: "none",
        });
        this.tl.to(this.logo.position, {
            duration: 1,
            y: 0
            //ease: "power2.easeIn",
        }, "-=2.3");
        this.tl.to(this.logoRing.rotation, {
            duration: 3,
            x: 1.5,
            ease: "power2.easeIn",
        }, "-=3");
        this.tl.to(this.logoK.rotation, {
            duration: 3,
            z: 0,
            ease: "power2.easeIn",
        }, "-=3");
        this.tl.to(".digital", {
            duration: 3,
            x:-66,
        }, 'same-l');
        this.tl.to(".agency", {
            duration: 3,
            x:66,
        }, 'same-l');
        this.tl.from(
            ".hero-main h2", { duration: 1, y: 100, opacity: 0,},'same-l');
        this.tl.from(
            ".social", { duration: 1, y: 100, opacity: 0,},'same-l');

        this.tl.from(".animation", { duration: 1, stagger: {each: 0.1}, y: 100, opacity: 100,},'same-l');    
        
    }
}