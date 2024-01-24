import * as ex from 'excalibur';
// import { Resources } from './InitialResources';
import { Config } from './config';
// import { getSpriteSheetCoord } from './utils/utils';
import { ImageFiltering, ImageSource } from 'excalibur';
import * as animations from "../src/data/animations.json";
import * as spriteSheets from "../src/data/spritesheets.json";

export class Player extends ex.Actor {
    facing: string;
    // vent: ex.EventEmitter<any>;
    constructor(pos: ex.Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: ex.CollisionType.Active,
            name: 'player'
        })
        // this.vent = new ex.EventEmitter()
        this.facing = 'down';
        // this.graphics.use(this.facing+'-idle');
    }
    onInitialize(engine: ex.Engine): void {
        // TODO add loop to load each spritesheet in list, currently hardcoded to one.
        // TODO since Manaseed uses the same for each movement, can I reuse instead of needing to duplicate with a differernt name?
        // TODO add array for layers on the paperdoll. may be able to use that to add a tag to the end like left-walk-hair?
        // TODO add base Actor for Character, then logic to add child Actors for each layer including the base - or does the base do in parent actor?
        let ss = spriteSheets.fbas_1body_human_00;

        let spriteSheet: ex.SpriteSheet;
        let playerSS = new ImageSource(ss.sheet, false, ImageFiltering.Pixel);
            playerSS.load().then(() => {
                spriteSheet = ex.SpriteSheet.fromImageSource({
                image: playerSS as ex.ImageSource,
                grid: {
                    spriteWidth: ss.spriteHeight,
                    spriteHeight: ss.spriteWidth,
                    rows: ss.rows,
                    columns: ss.columns
                }
            });

            // loop through all animation names
            // TODO Once I create character JSON, need to pass in which animation entries to use instead of hardcoding manaseed
            const entries = Object.entries(animations.manaseed);
            entries.forEach((currentElement) => { 
                const subentries = Object.entries(currentElement[1]);
                let frames: { graphic: ex.Sprite; duration: number; }[] = [];

                    // Create frames object to use in setting up the animation
                    subentries.forEach(element => {
                    // @ts-ignore - TS doesn't like config because it doesn't think it is part of the 'shape.'
                    frames.push( {graphic: spriteSheet.getSprite(element[1].row, element[1].col, element[1].config) as ex.Sprite, duration: element[1].duration} )
                });
                
                this.graphics.add(currentElement[0], new ex.Animation({
                    frames: frames,
                }));
            })
        }); // End of load spritesheet

        // TODO : How do I figure out the object collided with? I am trying to identify that I hit the portal circle collider from Tiled
        // this.on("collisionstart", evt => {
        //     // console.log(evt.contact.colliderB.offset.x,evt.contact.colliderB.offset.y);
        //     // side is on the player
        //     // console.log(evt.contact.info.side);
        //     console.log(evt.contact);
        //     // console.log(evt.other.hasTag('reqlvl'));

        //     // if (evt.other instanceof ex.TileMap) {
        //     //     console.log(evt.other.tileHeight,evt.other.tileWidth);
        //     // }
        //     // const data = evt.other.get(TiledObjectComponent);
        //     // console.log(data);
        //     // console.log(data?.object.properties);
        // });
        
        // this.on("precollision", evt => {
        //     // console.log(evt);
        //     // console.log(evt.other.hasTag('reqlvl'));

        //     if (evt.other instanceof ex.TileMap) {
        //         console.log(evt.other.tileHeight,evt.other.tileWidth);
        //     }
        //     // const data = evt.other.get(TiledLayerComponent);
        //     // console.log(data);
        //     // console.log(data?.object.properties);
        // });

        // const spriteRIdle = playerSpriteSheet.getSprite(0, 2);
        // const spriteLIdle = spriteRIdle!.clone();
        // spriteLIdle!.flipHorizontal = true;


        // const leftIdle = new ex.Animation({
        //     frames: [
        //         {graphic: spriteLIdle as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // })
        // this.graphics.add('left-idle', leftIdle);

        // const rightIdle = new ex.Animation({
        //     frames: [
        //         {graphic: spriteRIdle as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // })
        // this.graphics.add('right-idle', rightIdle);


        // const upIdle = new ex.Animation({
        //     frames: [
        //         {graphic: playerSpriteSheet.getSprite(0, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // })
        // this.graphics.add('up-idle', upIdle);

        // const downIdle = new ex.Animation({
        //     frames: [
        //         {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // })
        // this.graphics.add('down-idle', downIdle);

        // const leftWalk = new ex.Animation({
        //     frames: [
        //         {graphic: playerSpriteSheet.getSprite(0, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(1, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(2, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(3, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(4, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(5, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // })
        // this.graphics.add('left-walk', leftWalk);

        // const rightWalk = new ex.Animation({
        //     frames: [
        //         {graphic: playerSpriteSheet.getSprite(0, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(1, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(2, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(3, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(4, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(5, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // });
        // this.graphics.add('right-walk', rightWalk);

        // const upWalk = new ex.Animation({
        //     frames: [
        //         {graphic: playerSpriteSheet.getSprite(4, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(5, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(6, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(4, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(5, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(6, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // });
        // this.graphics.add('up-walk', upWalk);

        // const downWalk = new ex.Animation({
        //     frames: [
        //         {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(1, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(0, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(1, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //         {graphic: playerSpriteSheet.getSprite(2, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
        //     ]
        // });
        // this.graphics.add('down-walk', downWalk);

        const bindings:any = {
            "kb": {
                "KeyA": "moveLeft",
                "KeyD": "moveRight",
                "KeyW": "moveUp",
                "KeyS": "moveDown",
                "KeyC": "interact",
                "KeyX": "attack"
            },
            // I have not tried with gamepad controls so names may be incorrect
            'gamepad': {
                "DpadLeft": "moveLeft",
                "DpadRight": "moveRight",
                "DpadUp": "moveUp",
                "DpadDown": "moveDown",
                "A": "interact",
                "X": "attack"
            }
        }

        // Listen to all keypresses and emit a custom event matching key pressed
        // Only set if keyboard is selected so we don't have listeners for multiple inputs?
        engine.input.keyboard.on("hold", (evt: ex.KeyEvent) => {
            this.events.emit(bindings.kb[evt.key],this);
            // this.vent.emit(bindings.kb[evt.key], new ex.GameEvent())
        });

        engine.input.keyboard.on("release", (evt: ex.KeyEvent) => {
            this.vel = ex.Vector.Zero;
        });

        // This will catch the custom event when fired elsewhere in the code.
        this.events.on('moveLeft',  () => {
            this.facing = 'left';
            this.vel = ex.vec(-Config.PlayerSpeed, 0);
            this.graphics.use('left-walk');
        });
        this.events.on('moveRight',  () => {
            this.facing = 'right';
            this.vel = ex.vec(Config.PlayerSpeed, 0);
            this.graphics.use('right-walk');
        });
        this.events.on('moveDown',  () => {
            this.facing = 'down';
            this.vel = ex.vec(0, Config.PlayerSpeed);
            this.graphics.use('down-walk');
        });
        this.events.on('moveUp',  () => {
            this.facing = 'up';
            this.vel = ex.vec(0, -Config.PlayerSpeed);
            this.graphics.use('up-walk');
        });

    }

    onPreCollisionResolve(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
        const otherOwner = other.owner;
        if (otherOwner instanceof ex.TileMap) {
            for (let contactPoint of contact.points) {
                // Nudge into the tile zone by direction
                const maybeTile = otherOwner.getTileByPoint(contactPoint.add(this.vel.normalize()));
                if (maybeTile?.solid) {
                    const targetMidW = maybeTile.pos.x + (maybeTile.width / 2);
                    const targetMidH = maybeTile.pos.y + (maybeTile.height / 2);
    
                    // This logic causes player to slide to nearest edge to go around objects.
                    if (this.facing === 'left' || this.facing === 'right') {
                        if (this.pos.y < targetMidH) { 
                            this.pos.y -= 1;
                        } else {
                            this.pos.y += 1;
                        }
                    } else { // source.facing === 'up' || source.facing === 'down'
                        if (this.pos.x < targetMidW) { 
                            this.pos.x -= 1;
                        } else {
                            this.pos.x += 1;
                        }
                    }
                    break;
                }
            }
        }
    }

    onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
        // TODO check to make sure down-idle is registered before using it to clear warning.
        this.graphics.use(this.facing+'-idle');
    }
}