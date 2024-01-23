import * as ex from 'excalibur';
import { Resources } from './InitialResources';
import { Config } from './config';
// import { TiledEntity, TiledLayerComponent, TiledMap, TiledMapResource, TiledObject, TiledObjectComponent, TiledTilesetTile } from '@excaliburjs/plugin-tiled';

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
        const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.HeroSpriteSheetPng as ex.ImageSource,
            grid: {
                spriteWidth: 64,
                spriteHeight: 64,
                rows: 8,
                columns: 8
            }
        });
        
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

        const spriteRIdle = playerSpriteSheet.getSprite(0, 2);
        const spriteLIdle = spriteRIdle!.clone();
        spriteLIdle!.flipHorizontal = true;


        const leftIdle = new ex.Animation({
            frames: [
                {graphic: spriteLIdle as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('left-idle', leftIdle);

        const rightIdle = new ex.Animation({
            frames: [
                {graphic: spriteRIdle as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('right-idle', rightIdle);


        const upIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 1) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('up-idle', upIdle);

        const downIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 0) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('down-idle', downIdle);

        const leftWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 4, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('left-walk', leftWalk);

        const rightWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('right-walk', rightWalk);

        const upWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(4, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(6, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(6, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('up-walk', upWalk);

        const downWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(0, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 3, {flipHorizontal:  true}) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('down-walk', downWalk);

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
            this.graphics.use(this.facing+'-idle');
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
        console.log('in onPreCollisionResolve');
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

    // onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
    // }
}