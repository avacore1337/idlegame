import { TechNode } from './TechNode';
import { Square } from './Square';
import { Mine, Quary } from './buildings/AllBuildings';
// import { Quary } from './Quary';
import { ToolWorkshop, Kiln, Steelworks } from './constructions/AllConstructions';

export let TechList:TechNode[] = [];

function enableQuary(){
  Quary.enabled = true;
}
const quaring = new TechNode('Quaring', 'Discover how to build a quary.', [], 15, enableQuary);
TechList.push(quaring);

function enableMine(){
  Mine.enabled = true;
}
const mining = new TechNode('Mining', 'Discover how to extract minerals from mountains.', [quaring], 50, enableMine);
TechList.push(mining);

function enableToolWorkshop(){
  ToolWorkshop.enabled = true;
}
const tooling = new TechNode('Tooling', 'Discover how to build a workshop for improving your tools.', [quaring], 50, enableToolWorkshop);
TechList.push(tooling);

function enableKiln(){
  Kiln.enabled = true;
}
const burning = new TechNode('Burning', 'Discover how to use fire.', [quaring], 50, enableKiln);
TechList.push(burning);

function enableSteelworks(){
  Steelworks.enabled = true;
}
const steelmaking = new TechNode('Steelmaking', 'Discover the physics behind steelmaking.', [mining, burning], 100, enableSteelworks);
TechList.push(steelmaking);

function enableTorch(){
  Square.buildDistance++;
}
const torch = new TechNode('Torch', 'Torches allow you to see further.', [burning, tooling], 100, enableTorch);
TechList.push(torch);

function enableRoads(){
  Square.buildDistance += 2;
}
const roads = new TechNode('Roads', 'Roads will allow for easier traveling.', [mining], 100, enableRoads);
TechList.push(roads);
