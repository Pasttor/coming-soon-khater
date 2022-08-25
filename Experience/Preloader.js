import {EventEmitter} from "events";
import Experience from "./Experience.js";
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
           this.playIntro();
        })

    }


    playIntro() {
        
        this.svgi = document.getElementById("svgi");
        this.tl = new GSAP.timeline({defaults: { ease: 'easeOutQuart', duration: '0.6'}});
        this.curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        this.flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        this.tl.from(".ring-logo-loader", {
            delay: 1,
            scale: 6,
            opacity: 0,
        }, 'same').to(".ring-logo-loader", {
            delay: 1.5,
            scale: 0,
            opacity: 0,
        }, 'same-s');
        this.tl.from(".k-logo-loader", {
            delay: 1,
            opacity: 0,
            scale: 3
        }, 'same').to(".k-logo-loader", {
            delay: 1.5,
            scale: 0,
            opacity: 0,
        }, 'same-s');
        this.tl.to(this.svgi, {
            duration: 0.8,
            attr: { d: this.curve },
            //ease: "power2.easeIn",
        }).to(this.svgi, {
            duration: 0.8,
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
        this.tl.from(
            ".hero-main h2", { y: 100, opacity: 0,},"-=1.6");

        this.tl.from(".animation", { stagger: {each: 0.1}, y: 100, opacity: 0,},"-=1.3");    
        console.log("playing intro...")
    }
}