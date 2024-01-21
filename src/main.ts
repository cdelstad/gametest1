import * as ex from 'excalibur';
import { loader } from './InitialResources';
import { DevTool } from '@excaliburjs/dev-tools';
import DemoScene from '../src/scenes/DemoScene';

const game = new ex.Engine({
    width: 800,
    height: 600,
    canvasElementId: 'game',
    antialiasing: false,
    displayMode: ex.DisplayMode.FitScreenAndFill,
    // suppressPlayButton : true,
});

game.start(loader).then(() => {
    const devtool = new DevTool(game);

    // BEGIN SAMPLE CODE SNIPPETS
    // game.input.pointers.primary.on('down', evt => {
    //     const tile = Resources.TiledMap.getTileByPoint('ground', evt.worldPos);
    //     console.log('id', tile?.id, 'tile props:', tile?.properties);
    // });

    // console.log(game.currentScene.entities);
    // const portal = game.currentScene.entities.find(p => p.name ==='player');

    // console.log(getActor('player',game));
    // console.log(getEntities('chest',game));
    // END SAMPLE CODE SNIPPETS

    game.add('demo', new DemoScene());
    game.goto('demo');
});