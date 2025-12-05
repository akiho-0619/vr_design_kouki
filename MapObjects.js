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
    constructor(width){
        this.width = width;
        this.startingPoint = [Math.random()*20-10, 0, Math.random()*20-10];
        this.endingPoint = [Math.random()*20-10, 0, Math.random()*20-10];
    }
}