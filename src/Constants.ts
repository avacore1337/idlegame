import { Lumbermill, Claypit, Quary, Mine, Farm, HuntingCamp } from "./buildings/AllBuildings";
import { ToolWorkshop, Kiln, Steelworks, Library } from "./constructions/AllConstructions";

// export class Constants {
//   static GAMESIZE: number = 15;
//   constructor(){
//
//   }
// }

export const FACTORAMOUNT = 10;

export const enum DIRECTIONS {
  NW,
  NE,
  E,
  SE,
  SW,
  W
}

export const enum MATERIALS {
  Wood,
  Clay,
  Stone,
  Iron,
  Brick,
  Coal,
  Copper,
  Research,
  Food
}
export const MATERIALSTRINGLIST = ["Wood", "Clay", "Stone", "Iron", "Brick", "Coal", "Copper", "Research", "Food"]

export const enum SQUARETYPES {
  Plains,
  Desert,
  Forest,
  River,
  Water,
  Field,
  Mountain,
  Base
}

export const enum EXPONENTS {
  Slow = 1.20,
  Medium = 1.35,
  Fast = 1.50,
  VeryFast = 1.7
}

export const SQUARETYPELIST = [SQUARETYPES.Plains, SQUARETYPES.Desert, SQUARETYPES.Forest, SQUARETYPES.River, SQUARETYPES.Water, SQUARETYPES.Field, SQUARETYPES.Mountain, SQUARETYPES.Base]
export const SQUARESTRINGLIST = ["plains", "desert", "forest", "river", "water", "field", "mountain", "base"]

export const enum BUILDINGS {
  Lumbermill,
  Claypit,
  Quary,
  Mine,
  Farm,
  HuntingCamp
}
export const BUILDINGCLASSES = [Lumbermill, Claypit, Quary, Mine, Farm, HuntingCamp]

export const enum CONSTRUCTIONS {
  Library,
  ToolWorkshop,
  Kiln,
  Steelworks
}
export const CONSTRUCTIONCLASSES = [Library, ToolWorkshop, Kiln, Steelworks]

export const enum RESOURCES {
  Stone,
  Horse,
  Copper,
  Iron,
  Coal
}
export const RESOURCESTRINGLIST = ["stone", "horse", "copper", "iron", "coal"]

export const enum MATERIALMULITIPLIERINDEXES {
  ToolWorkshop
}
