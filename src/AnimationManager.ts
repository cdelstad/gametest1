import { Actor, Animation, AnimationStrategy, GetSpriteOptions, ImageFiltering, ImageSource, SpriteSheet } from 'excalibur';
import * as animations from "./data/animations.json";

export async function setupSpriteAnims(target: Actor, ss: any, animsSet: any): Promise<void> {
    const characterSS = new ImageSource(ss.sheet, false, ImageFiltering.Pixel);

    try {
        await characterSS.load();
    } catch (error) {
        console.error(`Failed to load spritesheet: ${ss.sheet}`, error);
        throw error;
    }

    const spriteSheet = SpriteSheet.fromImageSource({
        image: characterSS as ImageSource,
        grid: {
            spriteWidth: ss.spriteWidth,
            spriteHeight: ss.spriteHeight,
            rows: ss.rows,
            columns: ss.columns
        }
    });

    // loop through all animation names
    const entries = Object.entries(animations[animsSet as keyof typeof animations]);
    entries.forEach((currentElement) => {
        const subentries = Object.entries(currentElement[1]);
        const frameCoordinates = subentries.map(([_, frame]) => ({
            x: frame.col,
            y: frame.row,
            duration: frame.duration,
            options: 'config' in frame ? frame.config as GetSpriteOptions : undefined
        }));

        target.graphics.add(
            currentElement[0],
            Animation.fromSpriteSheetCoordinates({
                spriteSheet,
                frameCoordinates,
                strategy: AnimationStrategy.Loop
            })
        );
    });
}