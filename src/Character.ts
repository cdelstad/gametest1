import { Actor, CollisionContact, Collider, CollisionType, Engine, KeyEvent, Side, TileMap, Vector, vec } from 'excalibur';

import { Config } from './config';
import * as spriteSheets from "./data/spritesheets.json";
import { setupSpriteAnims } from './AnimationManager'

export class Character extends Actor {
    facing: string;
    // vent: ex.EventEmitter<any>;
    // TODO pass in params when instantiating - from JSON?
    constructor(pos: Vector) {
        super({
            pos,
            width: 16,
            height: 16,
            collisionType: CollisionType.Active,
            name: 'player',
            anchor: vec(0, 0)
        })
        // this.vent = new ex.EventEmitter()
        this.facing = 'down';
        // this.graphics.use(this.facing+'-idle');
    }
    async onInitialize(engine: Engine): Promise<void> {
        // TODO externalize this to a function so it can be used in other places than just initializing a character.
        // TODO since Manaseed uses the same for each movement, can I reuse instead of needing to duplicate with a different name?
        // TODO add array for layers on the paperdoll to load spritesheets for layers
        // TODO may be able to use layer name to add a tag to the end like left-walk-hair?
        // TODO add base Actor for Character, then logic to add child Actors for each layer including the base - or does the base do in parent actor?
        // TODO remove these hardcodes once I create JSON from player/character
        let ss = spriteSheets["fbas_1body_human_00"];
        let animsSet = 'manaseed';

        await setupSpriteAnims(this, ss, animsSet);

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
        this.scene!.input.keyboard.on("hold", (evt: KeyEvent) => {
            const action = bindings.kb[evt.key];
            if (action) {
                this.events.emit(action, this);
            }
            // this.vent.emit(bindings.kb[evt.key], new ex.GameEvent())
        });

        // This stops the player's movement when no inputs are pressed.
        this.scene!.input.keyboard.on("release", (evt: KeyEvent) => {
            this.vel = Vector.Zero;
        });

        // This will catch the custom event when fired elsewhere in the code.
        this.events.on('moveLeft',  () => {
            this.facing = 'left';
            this.vel = vec(-Config.PlayerSpeed, 0);
            this.graphics.use('left-walk');
        });
        this.events.on('moveRight',  () => {
            this.facing = 'right';
            this.vel = vec(Config.PlayerSpeed, 0);
            this.graphics.use('right-walk');
        });
        this.events.on('moveDown',  () => {
            this.facing = 'down';
            this.vel = vec(0, Config.PlayerSpeed);
            this.graphics.use('down-walk');
        });
        this.events.on('moveUp',  () => {
            this.facing = 'up';
            this.vel = vec(0, -Config.PlayerSpeed);
            this.graphics.use('up-walk');
        });

    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        const otherOwner = other.owner;
        if (otherOwner instanceof TileMap) {
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

    onPreUpdate(engine: Engine, elapsedMs: number): void {
        if (this.graphics.getGraphic(this.facing+'-idle')) {
            this.graphics.use(this.facing+'-idle');
        }
    }
}