import { Loadable, DefaultLoader } from "excalibur";
import { GameSceneResources } from '../types/scene.types';

    // convertPath is an untyped runtime property on TiledResource used for path rewriting
    type ConvertPathFn = (originPath: string, relativePath: string) => string;
    interface TiledMapWithConvertPath {
        convertPath: ConvertPathFn;
    }

    export function resourcesLoader(resources: GameSceneResources, loader: DefaultLoader) {

    // Change the path to be relative to the root directory for the webpack prod build
    const tiledMap = resources.TiledMap as TiledMapWithConvertPath | undefined;
    if (tiledMap) {
        const convertPath = tiledMap.convertPath;
        tiledMap.convertPath = (originPath: string, relativePath: string) => {
            if (relativePath.indexOf('../') > -1) {
                return './' + relativePath.split('../')[1];
            }
            return convertPath(originPath, relativePath);
        }
    }

    for (let resource of Object.values(resources)) {
        loader.addResource(resource as Loadable<unknown>);
    }
}