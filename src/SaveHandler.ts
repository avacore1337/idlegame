import { MainGame } from './MainGame';
import { MaterialContainer } from './MaterialContainer';
import { TechList } from './TechTree';
import { CONSTRUCTIONCLASSES, CONSTRUCTIONS, BUILDINGCLASSES } from './Constants';

export function loadMaterials(game:MainGame, restarting:boolean):void{
  if (typeof(Storage) !== 'undefined') {
    let materials = localStorage.getItem('materials');
    if (materials !== null && !restarting) {
      materials = JSON.parse(materials);
      game.materialContainer = new MaterialContainer(materials);
    } else {
      game.materialContainer = new MaterialContainer();
    }
  } else {
    game.materialContainer = new MaterialContainer();
  }
}

export function loadGame(game:MainGame):void{

  const saveExists:boolean = localStorage.getItem('map') !== null;
  const restarting:boolean = localStorage.getItem('restarting') === 'true';
  if(saveExists){
    game.era = parseInt(localStorage.getItem('era'));
    game.evolutionPoints = parseInt(localStorage.getItem('evolutionPoints'));
  }

  loadMaterials(game, restarting);
  // if (saveExists && !restarting) {
  //   console.log('Loading old game');
  //   loadMap(game);
  //   loadConstructions(game);
  //   loadTechnologies(game);
  // }
  // else{
  //   console.log('making new game');
  //   newGame(game);
  //   if(restarting){
  //     loadRebirth(game);
  //   }
  // }
}

export function loadMap(game:MainGame):void{
  if (typeof(Storage) !== 'undefined') {
    const map = localStorage.getItem('map');
    if (map !== null) {
      const tmp:Array<Array<object>> = JSON.parse(map);
      for (let y = 0; y < tmp.length; y++) {
        for (let x = 0; x < tmp[y].length; x++) {
          game.hexMatrix[y][x].reset();
          game.hexMatrix[y][x].set(tmp[y][x]);
        }
      }
    }
  }
}

export function saveGame(game:MainGame):void{
  if (typeof(Storage) !== 'undefined') {
    localStorage.setItem('materials', JSON.stringify(game.materialContainer.materials.toJSON()));
    localStorage.setItem('map', JSON.stringify(game.hexMatrix));
    localStorage.setItem('constructions', getConstructionJSON());
    localStorage.setItem('technologies', getResearchJSON());
    localStorage.setItem('era', game.era.toString());
    localStorage.setItem('evolutionPoints', game.evolutionPoints.toString());
  }
}

function getConstructionJSON():string{
  const constructionData:Array<[CONSTRUCTIONS, number]> = [];
  for (let construction:CONSTRUCTIONS = 0; construction < CONSTRUCTIONS.Length; construction++) {
    constructionData.push([construction, CONSTRUCTIONCLASSES[construction].amount]);
  }
  return JSON.stringify(constructionData);
}

function getResearchJSON():string{
  const technologyData:string[] = [];
  for (const technology of TechList) {
    if(technology.researched){
      technologyData.push(technology.name);
    }
  }
  return JSON.stringify(technologyData);
}

export function prepareRebirth(game:MainGame):void {
  localStorage.setItem('restarting', 'true');
  localStorage.setItem('newEra', game.era.toString());
  localStorage.setItem('newEvolutionPoints', game.evolutionPoints.toString());
}

export function loadRebirth(game:MainGame):void {
  game.era = parseInt(localStorage.getItem('newEra'));
  game.evolutionPoints = parseInt(localStorage.getItem('newEvolutionPoints'));
  localStorage.removeItem('restarting');
  localStorage.removeItem('newEra');
  localStorage.removeItem('newEvolutionPoints');
  for (const technology of TechList) {
    technology.researched = false;
  }
  for (const construction of CONSTRUCTIONCLASSES) {
    construction.enabled = false;
    construction.amount = 0;
  }
  CONSTRUCTIONCLASSES[CONSTRUCTIONS.Library].enabled = true;
  for (const buildings of BUILDINGCLASSES) {
    buildings.reset();
  }
}

/* tslint:disable:no-string-literal */

export function loadConstructions(game:MainGame):void {
  if (typeof(Storage) !== 'undefined') {
    const constructionsData = localStorage.getItem('constructions');
    if (constructionsData !== null) {
      const constructions:Array<[CONSTRUCTIONS, number]> = JSON.parse(constructionsData);
      for (const construction of constructions) {
        CONSTRUCTIONCLASSES[construction[0]].amount = construction[1];
      }
    }
  }
}

export function loadTechnologies(game:MainGame):void {
  if (typeof(Storage) !== 'undefined') {
    const technologyData = localStorage.getItem('technologies');
    if (technologyData !== null) {
      const technologies:string[] = JSON.parse(technologyData);
      for (const technology of TechList) {
        if(technologies.indexOf(technology.name) !== -1){
          technology.researched = true;
          technology.research(game);
        }
      }
    }
  }
}
/* tslint:enable:no-string-literal */

export function resetSave():void{
  if (typeof(Storage) !== 'undefined') {
    localStorage.removeItem('materials');
    localStorage.removeItem('map');
    localStorage.removeItem('constructions');
    localStorage.removeItem('technologies');
    localStorage.removeItem('era');
    localStorage.removeItem('evolutionPoints');
  }
}
