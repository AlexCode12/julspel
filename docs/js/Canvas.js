class Canvas {
    constructor(width, height, parent, level, colorMode)
    {
        this.width = Math.min(width, level.width * scale);
        this.height = Math.min(height, level.height * scale);

        this.bgLayer = document.createElement("canvas");
        this.bgLayer.width = this.width;
        this.bgLayer.height = this.height;
        this.bgCtx = this.bgLayer.getContext("2d");

        this.mapLayer = document.createElement("canvas");
        this.mapLayer.width = this.width;
        this.mapLayer.height = this.height;
        this.mapCtx = this.mapLayer.getContext("2d");

        this.actorsLayer = document.createElement("canvas");
        this.actorsLayer.width = this.width;
        this.actorsLayer.height = this.height;
        this.actorsCtx = this.actorsLayer.getContext("2d");

        this.uiLayer = document.createElement("canvas");
        this.uiLayer.width = this.width;
        this.uiLayer.height = this.height;
        this.uiCtx = this.uiLayer.getContext("2d");

        parent.appendChild(this.bgLayer);
        parent.appendChild(this.mapLayer);
        parent.appendChild(this.actorsLayer);
        parent.appendChild(this.uiLayer);

        this.flipPlayer = false;
        this.colorMode = colorMode || false;

        this.viewport = {
            left: 0,
            top: 0,
            width: this.width / scale,
            height: this.height / scale
        };
    }

    updateViewport = function(state)
    {
        let view = this.viewport;
        let margin = view.width / 3;
        let player = state.player;
        let center = player.pos.plus(player.size.times(0.5));

        if (center.x < view.left + margin) {
            view.left = Math.max(center.x - margin, 0);
        } else if (center.x > view.left + view.width - margin) {
            view.left = Math.min(center.x + margin - view.width, state.level.width - view.width);
        }
        
        if (center.y < view.top + margin) {
            view.top = Math.max(center.y - margin, 0);
        } else if (center.y > view.top + view.height - margin) {
            view.top = Math.min(center.y + margin - view.height, state.level.height - view.height);
        }
    }


    drawMap = function(level)
    {
        let { left, top, width, height } = this.viewport;
        let xStart = Math.floor(left);
        let xEnd = Math.ceil(left + width);
        let yStart = Math.floor(top);
        let yEnd = Math.ceil(top + height);

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                let tile = level.layout[y][x];
                if (tile !== "empty" && tile !== "clip") {
                    let screenX = (x - left) * scale;
                    let screenY = (y - top) * scale;

                    if (tile !== undefined) {
                        if (this.colorMode) {
                            this.mapCtx.fillStyle = sources[tile].color;
                            this.mapCtx.fillRect(screenX, screenY, scale, scale);    
                        } else {
                            this.mapCtx.drawImage(sources[tile].image, screenX, screenY, scale, scale);
                        }
                    }
                }
            }
        }
    }

    drawBg = function(state)
    {
        let { left, top, width, height } = this.viewport;
        if (state.status == "won") {
            this.bgCtx.fillStyle = "rgb(255, 255, 255)";
        } else if (state.status == "lost") {
            this.bgCtx.fillStyle = "rgb(255, 0, 0)";
        } else {
            var gradient = this.bgCtx.createLinearGradient(left, top, this.width, this.height);
            gradient.addColorStop(1, "rgb(16, 42, 81)");
            this.bgCtx.fillStyle = gradient;
            //this.bgCtx.fillStyle = "rgb(152, 266, 251)";
        }
        this.bgCtx.fillRect(0, 0, this.width, this.height);
        let _top = (height - top) * 32;
        let _left = left * 32;

        // this.bgCtx.drawImage(sources.mountain.image, 512, _top + 128, sources.mountain.width, sources.mountain.height);
        // this.bgCtx.drawImage(sources.mountain.image, 128, _top + 128, sources.mountain.width, sources.mountain.height);
        // this.bgCtx.drawImage(sources.mountains.image, left + 64, _top + 128, sources.mountains.width, sources.mountains.height);
        // this.bgCtx.drawImage(sources.mountains.image, left + 640, _top + 128, sources.mountains.width, sources.mountains.height);
        // this.bgCtx.drawImage(sources.cloud1.image, (_left / 50) + 128, _top + 128, sources.cloud1.width, sources.cloud1.height);
        // this.bgCtx.drawImage(sources.cloud2.image, (_left / 30) + 320, _top + 32, sources.cloud2.width, sources.cloud2.height);
        // this.bgCtx.drawImage(sources.cloud3.image, (_left / 10) + 640, _top + 96, sources.cloud3.width, sources.cloud3.height);
        // this.bgCtx.drawImage(sources.cloud1.image, (_left / 55) + 480, _top - 320, sources.cloud1.width, sources.cloud1.height);
        // this.bgCtx.drawImage(sources.cloud2.image, (_left / 35) + 768, _top - 128, sources.cloud2.width, sources.cloud2.height);
        // this.bgCtx.drawImage(sources.cloud3.image, (_left / 15) + 32, _top - 256, sources.cloud3.width, sources.cloud3.height);
    }

    syncState = function(state)
    {
        this.updateViewport(state);
        this.clearDisplay(this.mapCtx);
        this.clearDisplay(this.actorsCtx);
        this.drawBg(state);
        this.drawMap(state.level);
        this.drawActors(state.actors, state.rocks);
        this.drawUi(state);
    }

    drawUi = function(state)
    {
        if (state.status == "won") {
            this.uiCtx.clearRect(0, 0, 200, 200);
            this.uiCtx.fillStyle = "black";
            this.uiCtx.font = '40px sans-serif';
            this.uiCtx.textAlign = "center";
            this.uiCtx.fillText("Congratulations, you " + state.status + "! Christmas has been saved!", width / 2, height / 2 - 40);
        } else if (state.status == "lost") {
            this.uiCtx.clearRect(0, 0, 200, 200);
            this.uiCtx.fillStyle = "black";
            this.uiCtx.font = '40px sans-serif';
            this.uiCtx.textAlign = "center";
            this.uiCtx.fillText("Unlucky, you " + state.status + ". Press space to try again", width / 2, height / 2 - 40);
        } else {
            this.uiCtx.clearRect(0, 0, 300, 100);
            this.uiCtx.fillStyle = "white";
            this.uiCtx.font = '20px sans-serif';
            this.uiCtx.fillText("HEALTH: "+ state.health + " /100", 20, 20);
            this.uiCtx.font = '14px sans-serif';
            this.uiCtx.fillText("Presents (gathered/remaining): " + state.score + "/" + state.itemCount, 20, 40);
        }
    }

    clear()
    {
        this.mapLayer.remove();
        this.actorsLayer.remove();
    }

    clearDisplay = function(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
    }

    drawActors = function(actors, rocks)
    {
        for (let actor of actors) {
            let width = actor.size.x * scale;
            let height = actor.size.y * scale;
            let x = (actor.pos.x - this.viewport.left) * scale;
            let y = (actor.pos.y - this.viewport.top) * scale;
            let tileY = 0;
            let tileX = 0; 
            if (actor.type == "player") {
                this.drawPlayer(actor, x, y, width, height, rocks);
            } else if (actor.type == "enemy") {
                y = y + 4;
                let tile = Math.floor(Date.now() / 60) % 9;

                tileX = tile * sources.enemy.width;

                if (actor.delta > 0) {
                    tileY = 1;
                }

                tileY = tileY * sources.enemy.height;
                this.actorsCtx.drawImage(sources.enemy.image, tileX, tileY, sources.enemy.width, sources.enemy.height, x, y, width, height);
                actor.prevX = x;
                actor.prevY = y;
            } else {
                if (actor.type == "lava") {
                    tileX = Math.floor(Date.now() / 60) % 1 * scale;
                }

                if (this.colorMode) {
                    this.mapCtx.fillStyle = sources[actor.type].color;
                    this.mapCtx.fillRect(x, y, width, height);    
                } else {
                    this.actorsCtx.drawImage(sources[actor.type].image, 
                                            tileX, tileY,
                                            sources[actor.type].width, sources[actor.type].height,
                                            x, y, 
                                            width, height);
                }
            }
        }
    }

    drawPlayer = function(player, x, y, width, height, rocks)
    {
        y = y + 4;
        let tile = 1;
        let jump = 0;

        if (player.speed.x != 0) {
            this.flipPlayer = player.speed.x > 0;
        }

        if (player.speed.y != 0) {
            tile = Math.floor(Date.now() / 180) % 3;
            jump = 0;
        } else if (player.speed.x != 0) {
            tile = Math.floor(Date.now() / 60) % 4;
        }

        // this.actorsCtx.clearRect(player.prevX , player.prevY , width, height);
        this.actorsCtx.save();
        if (this.flipPlayer) {
            this.flipHorizontally(this.actorsCtx, x + width / 2);
            player.facing = "right";
        } else {
            player.facing = "left";
        }

        let tileX = tile * sources.player.width;
        let tileY = jump * sources.player.height;
        
        this.actorsCtx.drawImage(sources.player.image, tileX, tileY, sources.player.width, sources.player.height, x, y, width, height);
        this.actorsCtx.restore();
        player.prevX = x;
        player.prevY = y; 

        if (rocks > 0) {
            let fx;
            if (player.facing == "right") {
                fx = x + 20;
            } else {
                fx = x + 30;
            }
            this.actorsCtx.drawImage(sources.rock.image, 
                fx, y + 40,
                16, 16);
        }
    }

    flipHorizontally = function(ctx, around)
    {
        ctx.translate(around, 0);
        ctx.scale(-1, 1);
        ctx.translate(-around, 0);
    }
}