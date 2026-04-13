import { PluginObject } from "@excaliburjs/plugin-tiled";
import { CollisionType, vec, Actor, Engine } from "excalibur";
import { Config } from "../config";
// TODO(backlog): Should I just pass in ex instead of individuals since this is a utils file?

// Configures the plugin's existing portal actor with the correct collider and collision handler.
// The plugin places the ellipse actor at its top-left (obj.x, obj.y); the circle collider offset
// centers it within the bounding box so it aligns with the Tiled ellipse visually.
export function addPortal(portalActor: Actor, obj: PluginObject) {
    let sceneName: string = 'Undefined';

    // Plugin actor pos = top-left of ellipse bounding box. Offset the circle into the center.
    const width = obj.tiledObject.width ?? Config.DEFAULT_PORTAL_RADIUS_FALLBACK;
    const height = obj.tiledObject.height ?? Config.DEFAULT_PORTAL_RADIUS_FALLBACK;
    const radius = Math.min(width, height) / 2;
    portalActor.collider.useCircleCollider(radius, vec(width / 2, height / 2));
    portalActor.body.collisionType = CollisionType.Passive;
    portalActor.name = 'portal';

    // TODO(backlog): .some wouldn't define p in TS so switched to a loop
    for (const prop of obj.properties) {
        // Maybe make this a switch if there are more options to consider like quest requirement? This is where sending to textMessage and letting it figure out the right message makes it one lovcation for this.
        // The text can be pulled from a single source as well and not duplicated?
        if (prop[0] === 'portal') {
            sceneName = String(prop[1]);
        }
        if (prop[0] === 'levelreq') {
            // TODO(backlog): query player level and if meets textMessage asking if they are sure they want to go to X, else textMessage stating the energies refuse to activate? aka: too low level.
            // Actually, just call the scenario and let the req decide which message? Or do we keep the messages dynamic so we don't have a ton of portal messages with the location different.
            // portalActor.addTag("reqlvl|12");
            // console.log('level req: '+prop.value);
        }
    }

    portalActor.on('collisionstart', () => {
        /// TODO(backlog): Why is this firing on game load? It used to fire only when character collided with it.
        console.log(`Look, there's a portal to: ${sceneName}`);
    });
    // TiledDataComponent already attached by the plugin in ObjectLayer._recordObjectEntityMapping.
    // scene.add() not needed — tiledMap.addToScene() handles adding this entity to the scene.

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
    return game.currentScene.entities.filter(p => p.name.toLowerCase() === name.toLowerCase());
}

// Convert ManaSeed frame numbers to row/col positioning
export function getSpriteSheetCoord(spriteIndex: number, columnsPerRow: number) {
    return {"col": spriteIndex % columnsPerRow, "row": Math.trunc(spriteIndex/columnsPerRow)}
}

// Generate unique id. Looks like this: m56w6q1o0ynlbofiluea
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}