import { Engine, DisplayMode } from 'excalibur';
// import { loader } from './InitialResources';
import DemoScene from './scenes/DemoScene';
import { uiManager } from './utils/UIManager';
import { Config } from './config';

// Delay before updating the test button label (~120 frames at 60fps)
const SCENE_TRANSITION_DELAY_MS = 2000;

// const uiMgr = uiManager.initRegistry({baseZIndex: Config.BASE_Z_INDEX});
const uiMgr = uiManager.initRegistry();

uiMgr.create({   
    id: 'test1',
    type: "button",
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
    id: 'littest1',
    type: "ex-text",
    worldPos: {x:1,y:1},
    screenPos: {x:365,y:400},
    isComposite: false,
    // children?: Element[],
    isVisible: true, 
    isReady: true, 
    zIndex: 10, 
    pointerEvent: 'all' 
});
    
// console.log('getElement',uiMgr.getElement('test1'));

// uiMgr.remove('test2');

// uiMgr.clearRegistry();

const button1 = uiMgr.getElement('test1');
// We want to use the UI manager to create mechanism for devs to modify, perhaps signals, though since it is HTML, a developer can modify it as they want.
setTimeout(() => {
    if (button1) {
        button1.innerText = "Don't click me!";
        button1.ariaLabel = "Don't click me, ARIA!";
    }
}, SCENE_TRANSITION_DELAY_MS);
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

uiMgr.register(button2);

// console.log(uiMgr.getRegistry());

// console.log("isVisible",uiMgr.calcVisibility(button2));

// console.log("uiMgr", uiMgr);

const game = new Engine({
    width: Config.GAME_WIDTH,
    height: Config.GAME_HEIGHT,
    canvasElementId: 'game',
    pixelArt: true,
    displayMode: DisplayMode.FitScreenAndFill,
    // suppressPlayButton : true,
});

async function startGame(): Promise<void> {
    try {
        await game.start();
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
    } catch (error: unknown) {
        console.error('Failed to start game engine:', error);
    }
}

startGame();