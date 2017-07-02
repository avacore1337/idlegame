import { MATERIALS } from '../Constants';
import { Counter } from '../Counter';

/** No documentation available */
export class Construction {
  title:string;
  constructor(){
    this.title = 'name';
  }

  /** No documentation available */
  getRequiredMaterials():Counter<MATERIALS> {
    return new Counter<MATERIALS>();
  }
}
