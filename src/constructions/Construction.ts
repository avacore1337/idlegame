import { MATERIALS } from '../Constants';
import { Counter } from '../Counter';

export class Construction {
  title:string;
  constructor(){
    this.title = 'name';
  }

  getRequiredMaterials():Counter<MATERIALS>{
    return new Counter<MATERIALS>();
  }
}
