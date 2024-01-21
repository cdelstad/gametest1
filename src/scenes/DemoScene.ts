import GameScene from './GameScene';
import { TiledMapResource } from '@excaliburjs/plugin-tiled';

class DemoScene extends GameScene {
    constructor() {
        const resources = {
            // TODO Consider changing the tile map to a string and move the new TiledMapResource into the GameScene?
            TiledMap: new TiledMapResource('./res/beginner_town.tmx')
        };
        super(resources);
    }

    /**
     * Start-up logic, called once
     */
    // onInitialize(engine: Engine) {
    // // load scene-specific assets
    // // engine.start(sceneLoader).then(() => {
    // //   this._loaded = true
    // // })
    // }
  
    // onActivate(ctx: any) {
    // // const { spawnLocation } = ctx.data
    // // console.log(spawnLocation)
    // }

    // // When scene is exited perform these steps
    // onDeactivate(ctx: any) {
    // // this.saveState()
    // }
}

export default DemoScene;