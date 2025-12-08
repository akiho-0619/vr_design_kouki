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

export class Tree extends MapObject{
    constructor(model, position, rotation){
        super(model, position, rotation);
        this.type = "tree";
        this.woodAmount = 50;
    }
}

export class AppleTree extends MapObject{
    constructor(model, position, rotation){
        super(model, position, rotation);
        this.type = "tree";
        this.woodAmount = 50;
    }
}

export class Rock extends MapObject{
    constructor(model, position, rotation){
        super(model, position, rotation);
        this.type = "rock";
        this.stoneAmount = 100;
    }
}

export class River{
    constructor(value){
        this.width = value.width;
        this.groundSegments = value.groundSegments;
        this.mapSize = value.mapSize;
        this.ground = value.ground;
        
        this.startingPoint = [this.mapSize[0]/2, 0, Math.round(Math.random()*this.mapSize[1]-this.mapSize[1]/2)];
        this.routes = [];

        let positions = this.ground.geometry.attributes.position;
        let seg = Math.sqrt(positions.count);
        let offset = 0;
        for (let i=0; i<seg; i++){
            for (let j = -this.width; j < this.width+1; j++){
                let index  = i * seg +Math.round(this.startingPoint[0] / this.mapSize[0] * seg) + j;
                let x = positions.getZ(index+Math.round(offset));
                positions.setZ(index + Math.round(offset), x+(-5 + Math.abs(j)) * 0.075); //(j-5)*0.2);
                offset += Math.random() < 0.1? 0.1: 0;
            }
        }
    }
}