import { Actor, Animation, AnimationStrategy, GetSpriteOptions, ImageFiltering, ImageSource, SpriteSheet } from 'excalibur';
import animations from "./data/animations.json";
import { SpriteSheetConfig } from './types/game.types';

export async function setupSpriteAnims(target: Actor, spriteSheetData: SpriteSheetConfig, animationSetName: string): Promise<void> {
    const characterSS = new ImageSource(spriteSheetData.sheet, false, ImageFiltering.Pixel);

    try {
        await characterSS.load();
    } catch (error) {
        console.error(`Failed to load spritesheet: ${spriteSheetData.sheet}`, error);
        throw error;
    }

    const spriteSheet = SpriteSheet.fromImageSource({
        image: characterSS as ImageSource,
        grid: {
            spriteWidth: spriteSheetData.spriteWidth,
            spriteHeight: spriteSheetData.spriteHeight,
            rows: spriteSheetData.rows,
            columns: spriteSheetData.columns
        }
    });

    // loop through all animation names
    const entries = Object.entries(animations[animationSetName as keyof typeof animations]);
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