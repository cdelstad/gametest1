import { DefaultLoader, Engine, Scene, vec } from "excalibur";
import { resourcesLoader } from "../utils/resourcesLoader";
import { Character } from "../Character";
import outlineFrag from '../utils/Outline';
import { addPortal } from '../utils/utils';

class GameScene extends Scene {
    // TODO Fix the any
    resources: any;

    constructor (resources: object) {
        super();
        this.resources = resources;
    }

    override onPreLoad(loader: DefaultLoader) {
        resourcesLoader(this.resources, loader);
    }

    /**
     * Start-up logic, called once
     */
    onInitialize(engine: Engine) {
        if ("TiledMap" in this.resources ) {
            // Loop through TiledMap data to process objects and scripts layers
            // const objects = this.resources.TiledMap.data.getObjectLayerByName("Objects");
            const objects = this.resources.TiledMap.getObjectLayers('Objects')[0];
            ///const script = this.resources.TiledMap.data.getObjectLayerByName("script");
            const script = this.resources.TiledMap.getObjectLayers('script')[0];

            for (let obj of script.objects) {
                // TODO search for type/name and then do a switch/case on value instead of below???
                for (let prop of obj.properties) {
                    switch (prop[0]) {
                        case 'portal':
                            addPortal(engine,obj);
                            break;
                        case 'adv_guild':
                            // TODO Add adv guild logic
                            // console.log("Adv Guild");
                            break;
                        case 'bank':
                            // TODO Add bank logic
                            // console.log("Bank");
                            break;
                        case 'shop':
                            // TODO Add shop logic
                            // console.log("Shop");
                            break;
                        case 'special':
                            // TODO Add special logic
                            // console.log("Special");
                            break;
                        // These are handled elsewhere
                        case 'wall': // handled by TiledPlugin
                        case 'levelreq': // Handled in portal
                            break;
                        default:
                            console.log('Oh no! Undefined prop type:'+prop);
                            break;
                    }
                }
            } // End for all obj loop.
        
            const player = objects.getObjectsByName("Player");
            if (player) {
                const playerActor = new Character(vec(player.x, player.y));
        
                // playerActor.on('collisionstart', evt => {
                //     const data = evt.other.get(TiledObjectComponent)
                //     console.log(data);
                // });
        
                engine.currentScene.add(playerActor);
                playerActor.z = 100;
                // playerActor.scale = new ex.Vector(2, 2);
                // game.currentScene.camera.strategy.elasticToActor(playerActor, .8, .9); <- makes weird pixelshifting problems on player
                engine.currentScene.camera.strategy.lockToActor(playerActor);
                engine.currentScene.camera.zoom = 1.8;
        
                var outlineMaterial = engine.graphicsContext.createMaterial({
                    name: 'outline',
                    fragmentSource: outlineFrag
                })
                
                playerActor.graphics.material = outlineMaterial;
            }

            this.resources.TiledMap.addToScene(engine.currentScene);
        }
    }
  
    onActivate(ctx: any) {
    // const { spawnLocation } = ctx.data
    // console.log(spawnLocation)
    }

    // When scene is exited perform these steps
    onDeactivate(ctx: any) {
    // this.saveState()
    }
}

export default GameScene;