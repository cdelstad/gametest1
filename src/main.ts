import * as ex from 'excalibur';
import { Resources, loader } from './resources';
import { Player } from './player';
import { DevTool } from '@excaliburjs/dev-tools';
import { addPortal } from './utils/utils';
import { TiledObjectComponent } from '@excaliburjs/plugin-tiled';

const game = new ex.Engine({
    width: 800,
    height: 600,
    canvasElementId: 'game',
    antialiasing: false
});

game.start(loader).then(() => {
    const objects = Resources.TiledMap.data.getObjectLayerByName("Objects");
    const script = Resources.TiledMap.data.getObjectLayerByName("script");
    // console.log(script.objects);
    for (let obj of script.objects) {
        // TODO search for type/name and then do a switch/case on value instead of below.

        for (let prop of obj.properties) {
            // console.log(prop);
            switch (prop.name) {
                case 'portal':
                    addPortal(game,obj);
                    break;
                case 'adv_guild':
                    // TODO Add adv guild logic
                    console.log("Adv Guild");
                    break;
                case 'bank':
                    // TODO Add bank logic
                    console.log("Bank");
                    break;
                case 'shop':
                    // TODO Add shop logic
                    console.log("Shop");
                    break;
                case 'special':
                    // TODO Add special logic
                    console.log("Special");
                    break;
                // These are handled elsewhere
                case 'wall': // handled by TiledPlugin
                case 'levelreq': // Handled in portal
                    break;
                default:
                    console.log('Oh no! Undefined prop type.');
                    break;
            }
        }

        // if (obj.properties.some(p => p.name ==='portal')){
        //     addPortal(game,obj);
        // }

    } // End for all obj loop.

    const player = objects.getObjectByName("Player");
    if (player) {
        const playerActor = new Player(ex.vec(player.x, player.y));

        playerActor.on('collisionstart', evt => {
            const data = evt.other.get(TiledObjectComponent)
            console.log(data);
        });

        game.currentScene.add(playerActor);
        playerActor.z = 100;
        playerActor.scale = new ex.Vector(2, 2);
        game.currentScene.camera.strategy.elasticToActor(playerActor, .8, .9);
    }

    const devtool = new DevTool(game);

    Resources.TiledMap.addTiledMapToScene(game.currentScene);
});