import { init } from "easy-three";
const { camera, create, animate, controls, load } = init();
export class MapObject{
    constructor(model, position, rotation){
        this.model = model;
        this.position = position;
        this.rotation = rotation;
        this.remainingDurability = 100;
    }

    reverseProxy(methodName, ...args){
        if (!this.model){
            return false;
        }

        switch(methodName){
            case "dig":
                this.dig(...args);
                break;
            default:
                console.warn(`Method ${methodName} not found on MapObject`);
        }
    }

    dig(){
        if (this.remainingDurability > 10){
            this.remainingDurability -= 10;
            return true;
        }
    }
}