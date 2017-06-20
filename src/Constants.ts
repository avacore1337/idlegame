import { Lumbermill, Claypit, Quary, Mine } from "./buildings/AllBuildings";
import { ToolWorkshop, Kiln, Steelworks, Library } from "./constructions/AllConstructions";

// export class Constants {
//   static GAMESIZE: number = 15;
//   constructor(){
//
//   }
// }

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
  Research
}

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
  Slow = 1.1,
  Medium = 1.2,
  Fast = 1.3,
  VeryFast = 1.4
}

export const SQUARETYPELIST = [SQUARETYPES.Plains, SQUARETYPES.Desert, SQUARETYPES.Forest, SQUARETYPES.River, SQUARETYPES.Water, SQUARETYPES.Field, SQUARETYPES.Mountain, SQUARETYPES.Base]
export const SQUARESTRINGLIST = ["plains", "desert", "forest", "river", "water", "field", "mountain", "base"]

export const enum BUILDINGS {
  Lumbermill,
  Claypit,
  Quary,
  Mine
}
export const BUILDINGCLASSES = [Lumbermill, Claypit, Quary, Mine]

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
export const RESOURCESTRINGLIST = ["stone", "horse", "copper", "iron", "coal" ]

// }

// GAMESIZE = 15
//
// SQUARETYPES = {"Plains": "P",
//                "Desert": "D",
//                "Hill": "H",
//                "Forest": "F",
//                "River": "R",
//                "Water": "W",
//                "Base": "B",
//                "Tundra": "T"}
//
// def notTypes(arg):
//     return listCut(SQUARETYPES, arg)
//
// def listCut(first, second):
//     return list(set(first.keys()) - set(second))
//
// MATERIALS = ["Wood",
//              "Clay",
//              "Stone",
//              "Iron",
//              "Brick",
//              "Coal",
//              "Steel",
//              "Concrete"]
//
// MATERIALINDEX = { MATERIALS[i]: i for i in range(len(MATERIALS))}
//
// RESOURCES = {"Stone": "S",
//              "Iron": "I",
//              "Coal": "C"}
//             #  "Coal": "C",
//             #  "Horse": "H",
//             #  "Wool": "W"}
//
// DIRECTIONS = {"NW": 0,
//               "NE": 1,
//               "E": 2,
//               "SE": 3,
//               "SW": 4,
//               "W": 5}
//
// import TechTree
//
// TECHTREE = TechTree.generateTechTree()
//
// import Lumbermill
// import Claypit
// import Quary
// import Mine
//
// BUILDINGS = {"lumbermill": Lumbermill.Lumbermill,
//              "claypit": Claypit.Claypit,
//              "quary": Quary.Quary,
//              "mine": Mine.Mine}
//
// import Library
// import ToolWorkshop
// import Kiln
// import Steelworks
//
// def getConstructions():
//     return {"library": Library.Library(),
//             "toolworkshop": ToolWorkshop.ToolWorkshop(),
//             "kiln": Kiln.Kiln(),
//             "steelworks": Steelworks.Steelworks()}
