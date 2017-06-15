import { TechNode } from "./TechNode";
import { Mine } from "./Mine";
import { Quary } from "./Quary";
import { ToolWorkshop } from "./ToolWorkshop";
import { Kiln } from "./Kiln";
import { Steelworks } from "./Steelworks";

function enableQuary(){
  Quary.enabled = true;
}
function enableMine(){
  Mine.enabled = true;
}
function enableToolWorkshop(){
  ToolWorkshop.enabled = true;
}
function enableKiln(){
  Kiln.enabled = true;
}
function enableSteelworks(){
  Steelworks.enabled = true;
}
let quaring = new TechNode("Quaring", [], 15, enableQuary)
let mining = new TechNode("Mining", [quaring], 50, enableMine)
let tooling = new TechNode("Tooling", [quaring], 50, enableToolWorkshop)
let burning = new TechNode("Burning", [quaring], 50, enableKiln)
let steelmaking = new TechNode("Steelmaking", [mining, burning], 100, enableSteelworks)
export let TechList = [quaring, mining, tooling, burning, steelmaking];
