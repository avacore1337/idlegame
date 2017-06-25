import { MainGame } from "./MainGame";
import { MaterialContainer } from "./MaterialContainer";
import { CONSTRUCTIONCLASSES, CONSTRUCTIONS } from "./Constants";

export function loadMaterials(game:MainGame):void{
  if (typeof(Storage) !== "undefined") {
    let materials = localStorage.getItem("materials")
    if (materials !== null) {
      materials = JSON.parse(materials);
      game.materialContainer = new MaterialContainer(materials);
    } else {
      game.materialContainer = new MaterialContainer(undefined);
    }
  } else {
    game.materialContainer = new MaterialContainer(undefined);
  }
}

export function loadMap(game:MainGame):void{
  if (typeof(Storage) !== "undefined") {
    let map = localStorage.getItem("map")
    if (map !== null) {
      let tmp:Array<Array<object>> = JSON.parse(map);
      for (var y = 0; y < tmp.length; y++) {
        for (var x = 0; x < tmp[y].length; x++) {
          game.hexMatrix[y][x].reset();
          game.hexMatrix[y][x].set(tmp[y][x]);
        }
      }
    }
  }
}

export function saveGame(game:MainGame):void{
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("materials", JSON.stringify(game.materialContainer.materials.toJSON()));
    localStorage.setItem("map", JSON.stringify(game.hexMatrix));
    localStorage.setItem("constructions", getConstructionJSON());
  }
}

function getConstructionJSON():string{
  let constructionData:Array<[CONSTRUCTIONS, number]> = [];
  for (let construction:CONSTRUCTIONS = 0; construction < CONSTRUCTIONS.Length; construction++) {
    constructionData.push([construction, CONSTRUCTIONCLASSES[construction].amount]);
  }
  return JSON.stringify(constructionData);
}

export function resetSave():void{
  if (typeof(Storage) !== "undefined") {
    localStorage.removeItem("materials");
    localStorage.removeItem("map");
  }
}
