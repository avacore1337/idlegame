import { GameState } from './GameState';
import { Board } from './board/Board';
import { Tile } from './board/Tile';
import { newContent } from './board/gameStart';
import { MaterialContainer } from './MaterialContainer';
import { TechList, EraList } from './TechTree';
import { geneList } from './GeneTree';
import { CONSTRUCTIONCLASSES, CONSTRUCTIONS, BUILDINGCLASSES } from './Constants';

/** Load data from localStorage */
export function loadGame(state:GameState):void {
  if (typeof(Storage) !== 'undefined') {
    const saveExists:boolean = localStorage.getItem('map') !== null;
    const restarting:boolean = localStorage.getItem('restarting') === 'true';
    if (saveExists || restarting) {
      state.era = parseInt(localStorage.getItem('era'));
      state.evolutionPoints = parseInt(localStorage.getItem('evolutionPoints'));

      if (restarting) {
        console.log('Restarting');
        state.board.requestNewContent();
        loadRebirth(state);
      } else {
        console.log('Loading old state');
        loadMap(state.board);
        loadConstructions(state);
        loadTechnologies(state);
      }
      loadGenes(state);
    } else {
      state.board.requestNewContent();
    }
    loadMaterials(state, restarting);
  } else {
    alert('Your browser does not support this game');
  }
}

/** No documentation available */
function loadMaterials(state:GameState, restarting:boolean):void {
  let materials = localStorage.getItem('materials');
  if (materials !== null && !restarting) {
    materials = JSON.parse(materials);
    state.materialContainer = new MaterialContainer(materials);
  } else {
    state.materialContainer = new MaterialContainer();
  }
}

/** Takes the map from localStorage and inserts it into the empty board */
function loadMap(board:Board):void {
  const map = localStorage.getItem('map');
  if (map !== null) {
    const tmp:Array<Array<object>> = JSON.parse(map);
    board.fromJSON(tmp);
  }
}

/** No documentation available */
export function saveGame(state:GameState):void {
  localStorage.setItem('materials', JSON.stringify(state.materialContainer.materials.toJSON()));
  localStorage.setItem('map', JSON.stringify(state.board));
  localStorage.setItem('constructions', getConstructionJSON());
  localStorage.setItem('technologies', getResearchJSON());
  localStorage.setItem('genes', getGeneJSON());
  localStorage.setItem('era', state.era.toString());
  localStorage.setItem('evolutionPoints', state.evolutionPoints.toString());
}

/** No documentation available */
function getConstructionJSON():string {
  const constructionData:Array<[CONSTRUCTIONS, number]> = [];
  for (let construction:CONSTRUCTIONS = 0; construction < CONSTRUCTIONS.Length; construction++) {
    constructionData.push([construction, CONSTRUCTIONCLASSES[construction].amount]);
  }
  return JSON.stringify(constructionData);
}

/** No documentation available */
function getResearchJSON():string {
  const technologyData:string[] = [];
  for (const technology of TechList) {
    if(technology.researched){
      technologyData.push(technology.name);
    }
  }
  return JSON.stringify(technologyData);
}

function getGeneJSON():string {
  const geneData:[string, number][] = [];
  for (const gene of geneList) {
    geneData.push([gene.name, gene.level]);
  }
  return JSON.stringify(geneData);
}

/** No documentation available */
export function prepareRebirth(state:GameState):void {
  localStorage.setItem('restarting', 'true');
  localStorage.setItem('newEra', state.era.toString());
  localStorage.setItem('newEvolutionPoints', state.evolutionPoints.toString());
}

/** No documentation available */
function loadRebirth(state:GameState):void {
  state.era = parseInt(localStorage.getItem('newEra'));
  state.evolutionPoints = parseInt(localStorage.getItem('newEvolutionPoints'));
  localStorage.removeItem('restarting');
  localStorage.removeItem('newEra');
  localStorage.removeItem('newEvolutionPoints');
  for (const technology of TechList) {
    technology.researched = false;
  }
  for (const era of EraList) {
    era.researched = false;
  }
  for (const construction of CONSTRUCTIONCLASSES) {
    construction.enabled = false;
    construction.amount = 0;
  }
  CONSTRUCTIONCLASSES[CONSTRUCTIONS.Library].enabled = true;
  for (const building of BUILDINGCLASSES) {
    building.enabled = false;
    building.amount = 0;
  }
}

/** No documentation available */
function loadConstructions(state:GameState):void {
  const constructionsData = localStorage.getItem('constructions');
  if (constructionsData !== null) {
    const constructions:Array<[CONSTRUCTIONS, number]> = JSON.parse(constructionsData);
    for (const construction of constructions) {
      CONSTRUCTIONCLASSES[construction[0]].amount = construction[1];
    }
  }
}

/** No documentation available */
function loadTechnologies(state:GameState):void {
  const technologyData = localStorage.getItem('technologies');
  if (technologyData !== null) {
    const technologies:string[] = JSON.parse(technologyData);
    for (const technology of TechList) {
      if(technologies.indexOf(technology.name) !== -1){
        technology.researched = true;
        technology.research(state);
      }
    }
  }
}

function loadGenes(state:GameState):void {
  const technologyData = localStorage.getItem('genes');
  if (technologyData !== null) {
    const technologies:[string, number][] = JSON.parse(technologyData);
    for (const technology of geneList) {
      for(const [name, level] of technologies){
        if(technology.name ===  name){
          technology.level = level;
        }
      }
    }
  }
}

/** No documentation available */
export function resetSave():void {
  localStorage.removeItem('materials');
  localStorage.removeItem('map');
  localStorage.removeItem('constructions');
  localStorage.removeItem('technologies');
  localStorage.removeItem('genes');
  localStorage.removeItem('era');
  localStorage.removeItem('evolutionPoints');
}
