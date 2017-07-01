import { TechNode } from './TechNode';
import { Square } from './board/Square';
import { MainGame } from './MainGame';
import { Mine, Quary } from './buildings/AllBuildings';
import { prepareRebirth } from './SaveHandler';
import { ToolWorkshop, Kiln, Steelworks } from './constructions/AllConstructions';

/** No documentation available */
export const TechList:Array<TechNode> = [];

// Stone age
const stoneAge = new TechNode(undefined, undefined, undefined, undefined, undefined, undefined);
stoneAge.researched = true;

function enableQuary(game:MainGame):void {
  Quary.enabled = true;
}
const quaring = new TechNode('Quaring', 'Discover how to build a quary.', stoneAge, [], 15, enableQuary);
TechList.push(quaring);

function enableMine(game:MainGame):void {
  Mine.enabled = true;
}
const mining = new TechNode('Mining', 'Discover how to extract minerals from mountains.', stoneAge, [quaring], 50, enableMine);
TechList.push(mining);

function enableToolWorkshop(game:MainGame):void {
  ToolWorkshop.enabled = true;
}
const tooling = new TechNode('Tooling', 'Discover how to build a workshop for improving your tools.', stoneAge, [quaring], 50, enableToolWorkshop);
TechList.push(tooling);

function enableKiln(game:MainGame):void {
  Kiln.enabled = true;
}
const burning = new TechNode('Burning', 'Discover how to use fire.', stoneAge, [quaring], 50, enableKiln);
TechList.push(burning);

function enableSteelworks(game:MainGame):void {
  Steelworks.enabled = true;
}
const steelmaking = new TechNode('Steelmaking', 'Discover the physics behind steelmaking.', stoneAge, [mining, burning], 100, enableSteelworks);
TechList.push(steelmaking);

function enableTorch(game:MainGame):void {
  Square.buildDistance++;
}
const torch = new TechNode('Torch', 'Torches allow you to see further.', stoneAge, [burning, tooling], 100, enableTorch);
TechList.push(torch);

function enableRoads(game:MainGame):void {
  Square.buildDistance += 2;
}
const roads = new TechNode('Roads', 'Roads will allow for easier traveling.', stoneAge, [mining], 100, enableRoads);
TechList.push(roads);

// Iron age
function ascendToIronAge(game:MainGame):void {
  game.era = 1;
  prepareRebirth(game);
  game.game.state.start('mainGame', true, false);
}
const ironAge = new TechNode('Iron age', 'Arise to the era of the iron.', stoneAge, [quaring, mining, tooling, burning, steelmaking, torch, roads], 300, ascendToIronAge);
TechList.push(ironAge);

function enableEdges(game:MainGame):void {
  // TODO :
}
const sharpEdges = new TechNode('Sharp edges', 'Sharpening the edges of tools make them more efficient.', ironAge, [ironAge], 350, enableEdges);
TechList.push(sharpEdges);
