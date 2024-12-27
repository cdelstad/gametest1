import { TiledDataComponent } from "@excaliburjs/plugin-tiled";
import { CollisionType, vec, Actor, Engine, Component, ComponentCtor } from "excalibur";
// TODO Should I just pass in ex instead of individuals since this is a utils file?

// Adds a portal actor with collision
export function addPortal(game: Engine, obj: any) {
    let sceneName: string = 'Undefined';

    const actorWithCircleCollider = new Actor({
        pos: vec(obj.x + obj.width!/2, obj.y + obj.width!/2), // < -- tiled renders stuff oddly
        radius: (obj.width || 20) / 2, // < - radius is 1/2 width
        collisionType: CollisionType.Passive,
        // color: ex.Color.Green, // <-- debug color
        // z: 99,  // < -- debug z above all
        name:'portal',
        anchor: vec(0.5, 0.5), // < -- switch back to center
    });

    // TODO .some wouldn't define p in TS so switched to a loop
    for (let prop of obj.properties) {
        // Maybe make this a switch if there are more options to consider like quest requirement? This is where sending to textMessage and letting it figure out the right message makes it one lovcation for this.
        // The text can be pulled from a single source as well and not duplicated?
        if (prop[0] === 'portal') {
            sceneName = prop[1];
        }
        if (prop[0] === 'levelreq') {
            // TODO query player level and if meets textMessage asking if they are sure they want to go to X, else textMessage stating the energies refuse to activate? aka: too low level.
            // Actually, just call the scenario and let the req decide which message? Or do we keep the messages dynamic so we don't have a ton of portal messages with the location different.
            // actorWithCircleCollider.addTag("reqlvl|12");
            // console.log('level req: '+prop.value);
        }
    }

    actorWithCircleCollider.on('collisionstart', () => {
        /// TODO Why is this firing on game load? It used to fire only when character collided with it.
        console.log("Look, there's a portal to: "+sceneName);
    });
    
    // This loads the entire tileObject to the Actor. Probably don't want to do that as it loads a lot of extra data times ? tiles on bigger maps?
    // TODO uncomment once ECS fix is in place.
    actorWithCircleCollider.addComponent( new TiledDataComponent(obj) as unknown as Component);
    
    game.currentScene.add(actorWithCircleCollider);


    // if (obj.properties.some((p: { name: string;}) => p.name ==='levelreq')){
    //     console.log('levelReq: '+.value)
    //     }
}

// Gets first actor with name match.
export function getActor(name: string, game: Engine) {
    return game.currentScene.actors.find(p => p.name === name);
}

// Get list of entities that match with lowercase to avoid case issues
export function getEntities(name: string, game: Engine) {
    return game.currentScene.entities.filter(p => p.name.toLowerCase() === name);
}

// Convert ManaSeed frame numbers to row/col positioning
export function getSpriteSheetCoord(ssNum: number, spriteWidth: number) {
    return {"row": ssNum % spriteWidth, "col": Math.trunc(ssNum/spriteWidth)}
}

// Generate unique id. Looks like this: m56w6q1o0ynlbofiluea
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}