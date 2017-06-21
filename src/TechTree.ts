import { TechNode } from "./TechNode";
import { Square } from "./Square";
import { Mine, Quary } from "./buildings/AllBuildings";
// import { Quary } from "./Quary";
import { ToolWorkshop, Kiln, Steelworks } from "./constructions/AllConstructions";

export let TechList = [];

function enableQuary(){
  Quary.enabled = true;
}
let quaring = new TechNode("Quaring", [], 15, enableQuary);
TechList.push(quaring);

function enableMine(){
  Mine.enabled = true;
}
let mining = new TechNode("Mining", [quaring], 50, enableMine);
TechList.push(mining);

function enableToolWorkshop(){
  ToolWorkshop.enabled = true;
}
let tooling = new TechNode("Tooling", [quaring], 50, enableToolWorkshop);
TechList.push(tooling);

function enableKiln(){
  Kiln.enabled = true;
}
let burning = new TechNode("Burning", [quaring], 50, enableKiln);
TechList.push(burning);

function enableSteelworks(){
  Steelworks.enabled = true;
}
let steelmaking = new TechNode("Steelmaking", [mining, burning], 100, enableSteelworks);
TechList.push(steelmaking);

function enableTorch(){
  Square.buildDistance++;
}
let torch = new TechNode("Torch", [burning, tooling], 100, enableTorch);
TechList.push(torch);
