import { Actor, DefaultLoader, Engine, Scene, SceneActivationContext, vec } from "excalibur";
import { resourcesLoader } from "../utils/resourcesLoader";
import { Character } from "../Character";
import outlineFrag from '../utils/Outline';
import { addPortal } from '../utils/utils';
import { Config } from '../config';
import { GameSceneResources } from '../types/scene.types';
import { TiledResource } from '@excaliburjs/plugin-tiled';

class GameScene extends Scene {
    // TODO(backlog): Fix the any
    resources: GameSceneResources;

    constructor (resources: GameSceneResources) {
        super();
        this.resources = resources;
    }

    override onPreLoad(loader: DefaultLoader) {
        resourcesLoader(this.resources, loader);
    }

    // Start-up logic, called once
    override onInitialize(engine: Engine) {
        if ("TiledMap" in this.resources ) {
            const tiledMap = this.resources.TiledMap as TiledResource;
            // Loop through TiledMap data to process objects and scripts layers
            // const objects = this.resources.TiledMap.data.getObjectLayerByName("Objects");
            const objects = tiledMap.getObjectLayers('Objects')[0];
            ///const script = this.resources.TiledMap.data.getObjectLayerByName("script");
            const script = tiledMap.getObjectLayers('script')[0];

            for (let obj of script.objects) {
                // TODO(backlog): search for type/name and then do a switch/case on value instead of below???
                for (let prop of obj.properties) {
                    switch (prop[0]) {
                        case 'portal': {
                            const entity = script.getEntityByObject(obj);
                            if (entity instanceof Actor) addPortal(entity, obj);
                            break;
                        }
                        case 'adv_guild':
                            // TODO(backlog): Add adv guild logic
                            // console.log("Adv Guild");
                            break;
                        case 'bank':
                            // TODO(backlog): Add bank logic
                            // console.log("Bank");
                            break;
                        case 'shop':
                            // TODO(backlog): Add shop logic
                            // console.log("Shop");
                            break;
                        case 'special':
                            // TODO(backlog): Add special logic
                            // console.log("Special");
                            break;
                        // These are handled elsewhere
                        case 'wall': // handled by TiledPlugin
                        case 'levelreq': // Handled in portal
                            break;
                        default:
                            console.warn(`Undefined prop type: ${prop}`);
                            break;
                    }
                }
            } // End for all obj loop.
        
            const player = objects.getObjectsByName("Player")[0];
            if (player) {
                const playerActor = new Character(vec(player.x, player.y));
        
                // playerActor.on('collisionstart', evt => {
                //     const data = evt.other.get(TiledObjectComponent)
                //     console.log(data);
                // });
        
                engine.currentScene.add(playerActor);
                playerActor.z = Config.PLAYER_Z_INDEX;
                // playerActor.scale = new ex.Vector(2, 2);
                // game.currentScene.camera.strategy.elasticToActor(playerActor, .8, .9); <- makes weird pixelshifting problems on player
                engine.currentScene.camera.strategy.lockToActor(playerActor);
                engine.currentScene.camera.zoom = Config.CAMERA_ZOOM;
        
                const outlineMaterial = engine.graphicsContext.createMaterial({
                    name: 'outline',
                    fragmentSource: outlineFrag
                })
                
                playerActor.graphics.material = outlineMaterial;
            }

            tiledMap.addToScene(engine.currentScene);
        }
    }
  
    override onActivate(_ctx: SceneActivationContext) {
    // const { spawnLocation } = ctx.data
    // console.log(spawnLocation)
    }

    // When scene is exited perform these steps
    override onDeactivate(_ctx: SceneActivationContext) {
    // this.saveState()
    }
}

export default GameScene;