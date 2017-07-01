import { TechNode } from './TechNode';
import { Square } from './board/Square';
import { MainGame } from './MainGame';
import { Mine, Quary, Lumbermill, Claypit, Farm, HuntingCamp } from './buildings/AllBuildings';
import { prepareRebirth } from './SaveHandler';
import { Library, ToolWorkshop, Kiln, Steelworks } from './constructions/AllConstructions';

/** No documentation available */
export const TechList:Array<TechNode> = [];
export const EraList:Array<TechNode> = [];

// Stone age
function startStoneAge(game:MainGame):void {
  Lumbermill.enabled = true;
  Claypit.enabled = true;
  Farm.enabled = true;
  HuntingCamp.enabled = true;
  Library.enabled = true;
}

const stoneAgeEra = new TechNode('', '', [], 0, startStoneAge);
EraList.push(stoneAgeEra);

function enableQuary(game:MainGame):void {
  Quary.enabled = true;
}
const quaring = new TechNode('Quaring', 'Discover how to build a quary.', [stoneAgeEra], 15, enableQuary);
TechList.push(quaring);

function enableMine(game:MainGame):void {
  Mine.enabled = true;
}
const mining = new TechNode('Mining', 'Discover how to extract minerals from mountains.', [stoneAgeEra, quaring], 50, enableMine);
TechList.push(mining);

function enableToolWorkshop(game:MainGame):void {
  ToolWorkshop.enabled = true;
}
const tooling = new TechNode('Tooling', 'Discover how to build a workshop for improving your tools.', [stoneAgeEra, quaring], 50, enableToolWorkshop);
TechList.push(tooling);

function enableKiln(game:MainGame):void {
  Kiln.enabled = true;
}
const burning = new TechNode('Burning', 'Discover how to use fire.', [stoneAgeEra, quaring], 50, enableKiln);
TechList.push(burning);

function enableSteelworks(game:MainGame):void {
  Steelworks.enabled = true;
}
const steelmaking = new TechNode('Steelmaking', 'Discover the physics behind steelmaking.', [stoneAgeEra, mining, burning], 100, enableSteelworks);
TechList.push(steelmaking);

function enableTorch(game:MainGame):void {
  Square.buildDistance++;
}
const torch = new TechNode('Torch', 'Torches allow you to see further.', [stoneAgeEra, burning, tooling], 100, enableTorch);
TechList.push(torch);

function enableRoads(game:MainGame):void {
  Square.buildDistance += 2;
}
const roads = new TechNode('Roads', 'Roads will allow for easier traveling.', [stoneAgeEra, mining], 100, enableRoads);
TechList.push(roads);

// Iron age
function ascendToIronAge(game:MainGame):void {
  game.era = 1;
  prepareRebirth(game);
  game.game.state.start('mainGame', true, false);
}
const ironAge = new TechNode('Iron age', 'Arise to the era of the iron.', [stoneAgeEra, quaring, mining, tooling, burning, steelmaking, torch, roads], 300, ascendToIronAge);
TechList.push(ironAge);

function startIronAge(game:MainGame):void {
  Quary.enabled = true;
  Mine.enabled = true;
  Library.enabled = true;
}
const ironAgeEra = new TechNode('', '', [], 0, startIronAge);
EraList.push(ironAgeEra);


function enableEdges(game:MainGame):void {
  console.log('not implemented');
}
const sharpEdges = new TechNode('Sharp edges', 'Sharpening the edges of tools make them more efficient.', [ironAgeEra], 350, enableEdges);
TechList.push(sharpEdges);
