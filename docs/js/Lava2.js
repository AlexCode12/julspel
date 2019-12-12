class Lava2 {
    constructor(pos, speed, reset)
    {
        this.pos = pos;
        this.speed = speed;
        this.size = new Vector(1, 1);
        this.reset = reset;
    }

    get type()
    {
        return "Lava2";
    }

    static create(pos, color) 
    {
        if (color == "255,255,155") {
            return new Lava2(pos, new Vector(0, 7), pos);
        } else {
            return new Lava2(pos, new Vector(0, 0));
        }
    }

    collide = function(state)
    {
        return new State(state.level, state.actors, "lost");
    }

    update = function(time, state)
    {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, groundTypes)) {
             return new Lava2(newPos, this.speed, this.reset);
        } else if (this.reset) {
            return new Lava2(this.reset, this.speed, this.reset);
        } else {
            return new Lava2(this.pos, this.speed.times(-1));
        }
    }
    
}