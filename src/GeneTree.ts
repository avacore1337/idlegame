import { GeneNode } from './GeneNode';
import { GameState } from './GameState';
// import { flatten } from './util';
// import { TILE } from './TILE';
// import { Mine, Quary } from './buildings/AllBuildings';
// import { MaterialContainer } from './MaterialContainer';
// import { ToolWorkshop, Kiln, Steelworks } from './constructions/AllConstructions';

/** No documentation available */
export let geneList:GeneNode[] = [];
/** No documentation available */
export const geneTree:GeneNode[][][] = generategeneTree();
console.log(geneList);

/** No documentation available */
function getGene(name:string):GeneNode {
  for(const gene of geneList){
    if(gene.name === name){
      return gene;
    }
  }
  return null;
}

/** No documentation available */
function generategeneTree():GeneNode[][][] {
  const theTechList:GeneNode[][][] = [];
  theTechList.push(generateMindTree());
  theTechList.push(generateBodyTree());
  return theTechList;
}

/** No documentation available */
function generateMindTree():GeneNode[][] {
  const mindTree:GeneNode[][] = [];

  const tier1 = generateMindTier1();
  mindTree.push(tier1);
  geneList = geneList.concat(tier1);
  const tier2 = generateMindTier2();
  mindTree.push(tier2);
  geneList = geneList.concat(tier2);

  return mindTree;
}

/** No documentation available */
function generateMindTier1():GeneNode[] {
  const tier1:GeneNode[] = [];

  function enableBiggerBrain(state:GameState):void {
    console.log('bigger brain');
  }
  const biggerBrain = new GeneNode('Bigger brain', '+20% research from buildings per level.', [], 15, enableBiggerBrain);
  tier1.push(biggerBrain);
  return tier1;
}

/** No documentation available */
function generateMindTier2():GeneNode[] {
  const tier1:GeneNode[] = [];

  function enableDedicatedThinker(state:GameState):void {
    console.log('dedicated');
  }
  const dedicatedThinker = new GeneNode('Dedicated thinker', '+20% research when clicking per level.', [[getGene('Bigger brain'), 10]], 15, enableDedicatedThinker);
  tier1.push(dedicatedThinker);

  function enableDaydreaming(state:GameState):void {
    console.log('works daydreaming');
  }
  const daydreaming = new GeneNode('Daydreaming', '1 research/s.', [[getGene('Bigger brain'), 10]], 15, enableDaydreaming);
  tier1.push(daydreaming);
  return tier1;
}

/** No documentation available */
function generateBodyTree():GeneNode[][] {
  const bodyTree:GeneNode[][] = [];

  const tier1 = generateBodyTier1();
  bodyTree.push(tier1);
  geneList = geneList.concat(tier1);
  const tier2 = generateBodyTier2();
  bodyTree.push(tier2);
  geneList = geneList.concat(tier2);
  return bodyTree;
}

/** No documentation available */
function generateBodyTier1():GeneNode[] {
  const tier1:GeneNode[] = [];

  function enableBiggerBrain(state:GameState):void {
    console.log('brawn');
  }
  const biggerBrain = new GeneNode('Brawn', '+20% research from buildings per level.', [], 15, enableBiggerBrain);
  tier1.push(biggerBrain);
  return tier1;
}

/** No documentation available */
function generateBodyTier2():GeneNode[] {
  const tier1:GeneNode[] = [];

  function enableDedicatedThinker(state:GameState):void {
    console.log('strength');
  }
  const dedicatedThinker = new GeneNode('Strength', '+20% research when clicking per level.', [[getGene('Brawn'), 10]], 15, enableDedicatedThinker);
  tier1.push(dedicatedThinker);

  function enableDaydreaming(state:GameState):void {
    console.log('muscles');
  }
  const daydreaming = new GeneNode('Muscles', '1 research/s.', [[getGene('Brawn'), 10]], 15, enableDaydreaming);
  tier1.push(daydreaming);
  return tier1;
}
