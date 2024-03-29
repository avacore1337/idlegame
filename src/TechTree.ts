import { TechNode } from './TechNode';
import { Tile } from './board/Tile';
import { GameState } from './GameState';
import { Mine, Quary, Lumbermill, Claypit, Farm, HuntingCamp } from './buildings/AllBuildings';
import { prepareRebirth } from './SaveHandler';
import { Library, ToolWorkshop, Kiln, Steelworks, Portal } from './constructions/AllConstructions';

/** No documentation available */
export const TechList:Array<TechNode> = [];
export const EraList:Array<TechNode> = [];

// Stone age
function startStoneAge(state:GameState):void {
  Lumbermill.enabled = true;
  Claypit.enabled = true;
  Farm.enabled = true;
  HuntingCamp.enabled = true;
  Library.enabled = true;
}

const stoneAgeEra = new TechNode('', '', [], 0, startStoneAge);
EraList.push(stoneAgeEra);

function enableQuary(state:GameState):void {
  Quary.enabled = true;
}
const quaring = new TechNode('Quaring', 'Discover how to build a quary.', [stoneAgeEra], 15, enableQuary);
TechList.push(quaring);

function enableMine(state:GameState):void {
  Mine.enabled = true;
}
const mining = new TechNode('Mining', 'Discover how to extract minerals from mountains.', [stoneAgeEra, quaring], 50, enableMine);
TechList.push(mining);

function enableToolWorkshop(state:GameState):void {
  ToolWorkshop.enabled = true;
}
const tooling = new TechNode('Tooling', 'Discover how to build a workshop for improving your tools.', [stoneAgeEra, quaring], 50, enableToolWorkshop);
TechList.push(tooling);

function enableKiln(state:GameState):void {
  Kiln.enabled = true;
}
const burning = new TechNode('Burning', 'Discover how to use fire.', [stoneAgeEra, quaring], 50, enableKiln);
TechList.push(burning);

function enableSteelworks(state:GameState):void {
  Steelworks.enabled = true;
}
const steelmaking = new TechNode('Steelmaking', 'Discover the physics behind steelmaking.', [stoneAgeEra, mining, burning], 100, enableSteelworks);
TechList.push(steelmaking);

function enableTorch(state:GameState):void {
  Tile.buildDistance += 1;
}
const torch = new TechNode('Torch', 'Torches allow you to see further.', [stoneAgeEra, burning, tooling], 100, enableTorch);
TechList.push(torch);

function enableRoads(state:GameState):void {
  Tile.buildDistance += 2;
}
const roads = new TechNode('Roads', 'Roads will allow for easier traveling.', [stoneAgeEra, mining], 100, enableRoads);
TechList.push(roads);

// Iron age
function ascendToIronAge(state:GameState):void {
  state.era = 1;
  prepareRebirth(state);
  state.game.state.start('mainGame', true, false);
}
const ironAge = new TechNode('Iron age', 'Arise to the era of the iron.', [stoneAgeEra, quaring, mining, tooling, burning, steelmaking, torch, roads], 300, ascendToIronAge);
TechList.push(ironAge);

// Iron age
function enabelPortal(state:GameState):void {
  Portal.enabled = true;
}
const portal = new TechNode('Portal', 'You will finally understand what this mysterios object is.', [stoneAgeEra, quaring, mining, tooling, burning, steelmaking, torch, roads], 300, enabelPortal);
TechList.push(portal);

function startIronAge(state:GameState):void {
  Quary.enabled = true;
  Mine.enabled = true;
  Library.enabled = true;
}
const ironAgeEra = new TechNode('', '', [], 0, startIronAge);
EraList.push(ironAgeEra);

function enableEdges(state:GameState):void {
  console.log('not implemented');
}
const sharpEdges = new TechNode('Sharp edges', 'Sharpening the edges of tools make them more efficient.', [ironAgeEra], 350, enableEdges);
TechList.push(sharpEdges);
