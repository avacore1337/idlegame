import { MainGame } from "./MainGame";
import { MaterialContainer } from "./MaterialContainer";

export function loadGame(game:MainGame):void{
  let pre = undefined;
  try{
    for(let c of document.cookie.split(';')) {
        if (c.indexOf("idlegame=") !== -1) {
            pre = JSON.parse(c.trim().substring("idlegame=".length));
            break;
        }
    }
  }
  catch(err){
    console.log("Cookie was broken, Baking new ones")
  }
  game.materialContainer = new MaterialContainer(pre);
}

export function saveGame(game:MainGame):void{
  // Update cookie
  let saveData = JSON.stringify(
    {"materials": game.materialContainer.materials.toJSON()}
  );
  document.cookie = "idlegame=" + saveData + "; expires=Fri, 31 Dec 9999 23:59:59 UTC; path=/;";
}

export function resetSave():void{
  document.cookie = "idlegame=; expires=Wed; 01 Jan 1970;";
}
