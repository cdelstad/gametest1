// initialResources is intended to be ONLY for assets that need to be loaded the entire game. Use Scene's loading functionality for anything specific to a scene.

import { ImageFiltering, ImageSource, Loader } from "excalibur";

export const Resources = {
    HeroSpriteSheetPng: new ImageSource('./img/FREE Mana Seed Character Base Demo/char_a_p1/char_a_p1_0bas_humn_v01.png', false, ImageFiltering.Pixel)
}

// Uncomment if a TiledMap is added to be used for the entire game - If I use tilemaps to show a zoomed out world map, this would be a good use case.
// Change the path to be relative to the root directory for the webpack prod build
// const convertPath = Resources.TiledMap.convertPath;
// Resources.TiledMap.convertPath = (originPath: string, relativePath: string) => {
//     if (relativePath.indexOf('../') > -1) {
//         return './' + relativePath.split('../')[1];
//     }
//     return convertPath(originPath, relativePath);
// }

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}