import * as ex from 'excalibur';
import { Resources, loader } from './resources';
import { Player } from './player';
import { DevTool } from '@excaliburjs/dev-tools';
import { addPortal, getActor, getEntities } from './utils/utils';
import { TiledObjectComponent } from '@excaliburjs/plugin-tiled';

const game = new ex.Engine({
    width: 800,
    height: 600,
    canvasElementId: 'game',
    antialiasing: false,
    displayMode: ex.DisplayMode.FitScreenAndFill,
    // suppressPlayButton : true,
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

        // playerActor.on('collisionstart', evt => {
        //     const data = evt.other.get(TiledObjectComponent)
        //     console.log(data);
        // });

        game.currentScene.add(playerActor);
        playerActor.z = 100;
        // playerActor.scale = new ex.Vector(2, 2);
        // game.currentScene.camera.strategy.elasticToActor(playerActor, .8, .9);
        game.currentScene.camera.strategy.lockToActor(playerActor);
        game.currentScene.camera.zoom = 1.8;



        // var glsl = x => x[0];

        var outline = `#version 300 es
        precision mediump float;
        
        uniform float u_time_ms;
        uniform sampler2D u_graphic;
        
        in vec2 v_uv;
        in vec2 v_screenuv;
        out vec4 fragColor;
        
        vec3 hsv2rgb(vec3 c){
          vec4 K=vec4(1.,2./3.,1./3.,3.);
          return c.z*mix(K.xxx,clamp(abs(fract(c.x+K.xyz)*6.-K.w)-K.x, 0., 1.),c.y);
        }
        
        void main() {
          const float TAU = 6.28318530;
          const float steps = 4.0; // up/down/left/right pixels
          float radius = 2.0;
          float time_sec = u_time_ms / 1000.;
        
          vec3 outlineColorHSL = vec3(sin(time_sec/2.0) * 1., 1., 1.);
          vec2 aspect = 1.0 / vec2(textureSize(u_graphic, 0));
        
          for (float i = 0.0; i < TAU; i += TAU / steps) {
            // Sample image in a circular pattern
            vec2 offset = vec2(sin(i), cos(i)) * aspect * radius;
            vec4 col = texture(u_graphic, v_uv + offset);
        
            // Mix outline with background
            float alpha = smoothstep(0.5, 0.7, col.a);
            fragColor = mix(fragColor, vec4(hsv2rgb(outlineColorHSL), 1.0), alpha); // apply outline
          }
        
          // Overlay original texture
          vec4 mat = texture(u_graphic, v_uv);
          float factor = smoothstep(0.5, 0.7, mat.a);
          fragColor = mix(fragColor, mat, factor);
        }
        `
        var outlineMaterial = game.graphicsContext.createMaterial({
            name: 'outline',
            fragmentSource: outline
          })
        
        //   playerActor.graphics.material = outlineMaterial;
        //   setTimeout(() => {
        //     playerActor.graphics.material = null;
        //   }, 5000);
    }

    const devtool = new DevTool(game);

    Resources.TiledMap.addTiledMapToScene(game.currentScene);

    game.input.pointers.primary.on('down', evt => {
        const tile = Resources.TiledMap.getTileByPoint('ground', evt.worldPos);
        console.log('id', tile?.id, 'tile props:', tile?.properties);
    });

    // console.log(game.currentScene.entities);
    // const portal = game.currentScene.entities.find(p => p.name ==='player');

    // console.log(getActor('player',game));
    // console.log(getEntities('chest',game));
   
});