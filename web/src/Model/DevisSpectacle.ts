import {DepenseArtistes, Depensedivers, DepenseElements, DepenseLieu, Devis} from "./Devis";

export class DevisSpectacle{
    devis:Devis=new Devis()
    depenseLieus:DepenseLieu=new DepenseLieu()
    artistes:DepenseArtistes=new DepenseArtistes()
    depenseElements:DepenseElements=new DepenseElements()
    depensedivers:Depensedivers=new Depensedivers()
}