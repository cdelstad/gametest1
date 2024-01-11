import * as ex from 'excalibur';
import { Resources } from './resources';
import { Config } from './config';
import { TiledObjectComponent } from '@excaliburjs/plugin-tiled';

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
        this.on("collisionstart", evt => {
            console.log(evt);
            console.log(evt.other.hasTag('reqlvl'));
            
            const data = evt.other.get(TiledObjectComponent);
            console.log(data);
            // console.log(data?.object.properties);
        });

        const leftIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 3) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('left-idle', leftIdle);

        const rightIdle = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 2) as ex.Sprite, duration: Config.PlayerFrameSpeed},
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
                {graphic: playerSpriteSheet.getSprite(0, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 7) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        })
        this.graphics.add('left-walk', leftWalk);

        const rightWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 6) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('right-walk', rightWalk);

        const upWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 5) as ex.Sprite, duration: Config.PlayerFrameSpeed},
            ]
        });
        this.graphics.add('up-walk', upWalk);

        const downWalk = new ex.Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(0, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(1, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(2, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(3, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(4, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
                {graphic: playerSpriteSheet.getSprite(5, 4) as ex.Sprite, duration: Config.PlayerFrameSpeed},
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

    onPreUpdate(engine: ex.Engine, elapsedMs: number): void {
        // TODO this breaks my logic, but since I don't have an idle it doesn't stop movement.
        // this.vel = ex.Vector.Zero;
        // this.graphics.use(this.facing+'-idle');

        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowRight)) {
        //     this.vel = ex.vec(Config.PlayerSpeed, 0);
        //     this.graphics.use('right-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowLeft)) {
        //     this.vel = ex.vec(-Config.PlayerSpeed, 0);
        //     this.graphics.use('left-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowUp)) {
        //     this.vel = ex.vec(0, -Config.PlayerSpeed);
        //     this.graphics.use('up-walk');
        // }
        // if (engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown)) {
        //     this.vel = ex.vec(0, Config.PlayerSpeed);
        //     this.graphics.use('down-walk');
        // }

    }
}