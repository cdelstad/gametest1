import { Loadable, DefaultLoader } from "excalibur";

    // TODO Fix any
    export function resourcesLoader(resources: any, loader: DefaultLoader) {

    // Change the path to be relative to the root directory for the webpack prod build
    const convertPath = resources.TiledMap.convertPath;
    resources.TiledMap.convertPath = (originPath: string, relativePath: string) => {
        if (relativePath.indexOf('../') > -1) {
            return './' + relativePath.split('../')[1];
        }
        return convertPath(originPath, relativePath);
    }

    for (let resource of Object.values(resources)) {
        loader.addResource(resource as Loadable<any>);
    }
}