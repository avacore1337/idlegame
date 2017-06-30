import { GeneNode } from './GeneNode';
// import { flatten } from './util';
// import { Square } from './Square';
// import { Mine, Quary } from './buildings/AllBuildings';
import { MaterialContainer } from './MaterialContainer';
// import { ToolWorkshop, Kiln, Steelworks } from './constructions/AllConstructions';

export let geneList:GeneNode[] = [];
export const geneTree:GeneNode[][][] = generategeneTree();
console.log(geneList);

function getGene(name:string):GeneNode{
  for(const gene of geneList){
    if(gene.name === name){
      return gene;
    }
  }
  return null;
}

function generategeneTree():GeneNode[][][] {
  const theTechList:GeneNode[][][] = [];
  theTechList.push(generateMindTree());
  theTechList.push(generateBodyTree());
  return theTechList;
}

function generateMindTree():GeneNode[][]{
  const mindTree:GeneNode[][] = [];

  const tier1 = generateMindTier1();
  mindTree.push(tier1);
  geneList = geneList.concat(tier1);
  const tier2 = generateMindTier2();
  mindTree.push(tier2);
  geneList = geneList.concat(tier2);

  return mindTree;
}

function generateMindTier1():GeneNode[]{
  const tier1:GeneNode[] = [];

  function enableBiggerBrain(){
    console.log('bigger brain');
  }
  const biggerBrain = new GeneNode('Bigger brain', '+20% research from buildings per level', [], 15, enableBiggerBrain);
  tier1.push(biggerBrain);
  return tier1;
}

function generateMindTier2():GeneNode[]{
  const tier1:GeneNode[] = [];

  function enableDedicatedThinker(){
    console.log('dedicated');
  }
  const dedicatedThinker = new GeneNode('Dedicated thinker', '+20% research when clicking per level', [[getGene('Bigger brain'), 10]], 15, enableDedicatedThinker);
  tier1.push(dedicatedThinker);

  function enableDaydreaming(){
    console.log('works daydreaming');
  }
  const daydreaming = new GeneNode('Daydreaming', '1 research/s', [[getGene('Bigger brain'), 10]], 15, enableDaydreaming);
  tier1.push(daydreaming);
  return tier1;
}

function generateBodyTree():GeneNode[][]{
  const bodyTree:GeneNode[][] = [];

  const tier1 = generateBodyTier1();
  bodyTree.push(tier1);
  geneList = geneList.concat(tier1);
  const tier2 = generateBodyTier2();
  bodyTree.push(tier2);
  geneList = geneList.concat(tier2);
  return bodyTree;
}

function generateBodyTier1():GeneNode[]{
  const tier1:GeneNode[] = [];

  function enableBiggerBrain(){
    console.log('brawn');
  }
  const biggerBrain = new GeneNode('Brawn', '+20% research from buildings per level', [], 15, enableBiggerBrain);
  tier1.push(biggerBrain);
  return tier1;
}

function generateBodyTier2():GeneNode[]{
  const tier1:GeneNode[] = [];

  function enableDedicatedThinker(){
    console.log('strength');
  }
  const dedicatedThinker = new GeneNode('Strength', '+20% research when clicking per level', [[getGene('Brawn'), 10]], 15, enableDedicatedThinker);
  tier1.push(dedicatedThinker);

  function enableDaydreaming(){
    console.log('muscles');
  }
  const daydreaming = new GeneNode('Muscles', '1 research/s', [[getGene('Brawn'), 10]], 15, enableDaydreaming);
  tier1.push(daydreaming);
  return tier1;
}
