import * as ex from 'excalibur';
// import { loader } from './InitddialResources';
import DemoScene from '../src/scenes/DemoScene';
import { uiManager } from './utils/UIManager';

const uiMgr = uiManager.initRegistry({baseZIndex: 1000});

uiMgr.create({   
    id: 'test1',
    worldPos: {x:1,y:1},
    screenPos: {x:10,y:10},
    isComposite: false,
    // children?: Element[],
    isVisible: true, 
    isReady: true, 
    zIndex: 10, 
    pointerEvent: 'all' 
});

uiMgr.create({   
    id: 'test2',
    worldPos: {x:1,y:1},
    screenPos: {x:40,y:10},
    isComposite: false,
    // children?: Element[],
    isVisible: true, 
    isReady: true, 
    zIndex: 10, 
    pointerEvent: 'all' 
});
    
// console.log('getElement',uiMgr.getElement('test1'));

// uiMgr.remove('test2');

//uiMgr.clearRegistry();

const button1 = uiMgr.getElement('test1');
// We want to use the UI manager to create mechanism for devs to modify, perhaps signals, though since it is HTML, a developer can modify it as they want.
setTimeout(() => {
    button1!.innerText = "Don't click me!";
    button1!.ariaLabel = "Don't click me, ARIA!";
}, 2000);
// button1!.style.left = "100px";


const button2 = document.createElement("button");
button2.innerText = 'Click me2!';
button2.id = 'test3';
button2.style.position = "absolute";
button2.style.top = "100px";
button2.style.left = "100px";
// button2.style.display = "none";
// button2.style.visibility = "hidden";
document.body.appendChild(button2);

uiMgr.register(button2!);

// console.log(uiMgr.getRegistry());

// console.log("isVisible",uiMgr.calcVisibility(button2));

// console.log("uiMgr", uiMgr);

const game = new ex.Engine({
    width: 800,
    height: 600,
    canvasElementId: 'game',
    antialiasing: false,
    displayMode: ex.DisplayMode.FitScreenAndFill,
    // suppressPlayButton : true,
});

game.start().then(() => {
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
    game.goToScene('demo');
});