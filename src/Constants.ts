import { Lumbermill, Claypit, Quary, Mine, Farm, HuntingCamp, Base } from './buildings/AllBuildings';
import { ToolWorkshop, Kiln, Steelworks, Library } from './constructions/AllConstructions';

// export class Constants {
//   static GAMESIZE: number = 15;
//   constructor(){
//
//   }
// }

/** No documentation available */
export const FACTORAMOUNT = 10;

/** No documentation available */
export const enum DIRECTIONS {
  NW,
  NE,
  E,
  SE,
  SW,
  W
}

/** No documentation available */
export const enum MATERIALS {
  Wood,
  Clay,
  Stone,
  Iron,
  Brick,
  Coal,
  Copper,
  Research,
  Food,
  Length
}
/** No documentation available */
export const MATERIALSTRINGLIST = ['Wood', 'Clay', 'Stone', 'Iron', 'Brick', 'Coal', 'Copper', 'Research', 'Food'];

/** No documentation available */
export const enum LAND {
  Plains,
  Desert,
  Forest,
  River,
  Water,
  Field,
  Mountain,
  Base,
  Length
}

/** No documentation available */
export const enum EXPONENTS {
  Slow = 1.20,
  Medium = 1.35,
  Fast = 1.50,
  VeryFast = 1.7
}

/** No documentation available */
export const LANDSTRINGLIST = ['plains', 'desert', 'forest', 'river', 'water', 'field', 'mountain', 'base'];

/** No documentation available */
export const enum BUILDINGS {
  Lumbermill,
  Claypit,
  Quary,
  Mine,
  Farm,
  HuntingCamp,
  Base,
  Length
}
/** No documentation available */
export const BUILDINGCLASSES = [Lumbermill, Claypit, Quary, Mine, Farm, HuntingCamp, Base];

/** No documentation available */
export const enum CONSTRUCTIONS {
  Library,
  ToolWorkshop,
  Kiln,
  Steelworks,
  Length
}
/** No documentation available */
export const CONSTRUCTIONCLASSES = [Library, ToolWorkshop, Kiln, Steelworks];

/** No documentation available */
export const enum RESOURCES {
  Stone,
  Horse,
  Copper,
  Iron,
  Coal,
  Length
}
/** No documentation available */
export const RESOURCESTRINGLIST = ['stone', 'horse', 'copper', 'iron', 'coal'];

/** No documentation available */
export const enum MATERIALMULITIPLIERINDEXES {
  ToolWorkshop,
  BiggerBrain
}
