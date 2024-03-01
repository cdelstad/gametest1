import { Actor, ImageFiltering, ImageSource, SpriteSheet, Animation, Sprite } from 'excalibur';
import * as animations from "./data/animations.json";

export function setupSpriteAnims(target: Actor, ss: any, animsSet: any) {
    let spriteSheet: SpriteSheet;
    let characterSS = new ImageSource(ss.sheet, false, ImageFiltering.Pixel);
    // Loads Spritesheet first
    characterSS.load().then(() => {
            spriteSheet = SpriteSheet.fromImageSource({
            image: characterSS as ImageSource,
            grid: {
                spriteWidth: ss.spriteHeight,
                spriteHeight: ss.spriteWidth,
                rows: ss.rows,
                columns: ss.columns
            }
        });

        // loop through all animation names
        let entries = Object.entries(animations[animsSet as keyof typeof animations]);
        entries.forEach((currentElement) => { 
            let subentries = Object.entries(currentElement[1]);
            let frames: { graphic: Sprite; duration: number; }[] = [];

                // Create frames object to use in setting up the animation
                subentries.forEach(element => {
                // @ts-ignore - TS doesn't like config because it doesn't think it is part of the 'shape.'
                frames.push( {graphic: spriteSheet.getSprite(element[1].row, element[1].col, element[1].config) as Sprite, duration: element[1].duration} )
            });
            
            target.graphics.add(currentElement[0], new Animation({
                frames: frames,
            }));
        })
    }); // End of load spritesheet
}