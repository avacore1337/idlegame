import { TechNode } from './TechNode';
import { Square } from './Square';
import { MainGame } from './MainGame';
import { Mine, Quary } from './buildings/AllBuildings';
import { ToolWorkshop, Kiln, Steelworks } from './constructions/AllConstructions';

export const TechList:Array<TechNode> = [];

// Stone age
const stoneAge = new TechNode(undefined, undefined, undefined, undefined, undefined, undefined);
stoneAge.researched = true;

function enableQuary():void {
  Quary.enabled = true;
}
const quaring = new TechNode('Quaring', 'Discover how to build a quary.', stoneAge, [], 15, enableQuary);
TechList.push(quaring);

function enableMine():void {
  Mine.enabled = true;
}
const mining = new TechNode('Mining', 'Discover how to extract minerals from mountains.', stoneAge, [quaring], 50, enableMine);
TechList.push(mining);

function enableToolWorkshop():void {
  ToolWorkshop.enabled = true;
}
const tooling = new TechNode('Tooling', 'Discover how to build a workshop for improving your tools.', stoneAge, [quaring], 50, enableToolWorkshop);
TechList.push(tooling);

function enableKiln():void {
  Kiln.enabled = true;
}
const burning = new TechNode('Burning', 'Discover how to use fire.', stoneAge, [quaring], 50, enableKiln);
TechList.push(burning);

function enableSteelworks():void {
  Steelworks.enabled = true;
}
const steelmaking = new TechNode('Steelmaking', 'Discover the physics behind steelmaking.', stoneAge, [mining, burning], 100, enableSteelworks);
TechList.push(steelmaking);

function enableTorch():void {
  Square.buildDistance++;
}
const torch = new TechNode('Torch', 'Torches allow you to see further.', stoneAge, [burning, tooling], 100, enableTorch);
TechList.push(torch);

function enableRoads():void {
  Square.buildDistance += 2;
}
const roads = new TechNode('Roads', 'Roads will allow for easier traveling.', stoneAge, [mining], 100, enableRoads);
TechList.push(roads);

// Iron age
function ascendToIronAge():void {
  MainGame.era = 1;
}
const ironAge = new TechNode('Iron age', 'Arise to the era of the iron.', stoneAge, [quaring, mining, tooling, burning, steelmaking, torch, roads], 300, ascendToIronAge);
TechList.push(ironAge);

function enableEdges():void {
  // TODO :
}
const sharpEdges = new TechNode('Sharp edges', 'Sharpening the edges of tools make them more efficient.', ironAge, [ironAge], 350, enableEdges);
TechList.push(sharpEdges);
