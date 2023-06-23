import {Lieu} from "./Lieu";
import {ElementBase} from "./ElementBase";
import {TypeDepense} from "./TypeDepense";
import {Artistes} from "./Artistes";

export class Devis{
    id: any
    libelle:any
    duree:any
    datedevis:any
    total:any
    heure:any
    recette:any;
    benefice:any;
    benefice_net:any
}

export class DepenseLieu{
    id:any
    devis:Devis=new Devis()
    lieu:Lieu=new Lieu()
    montant:any
    prix_vip:any
    prix_reserve:any
    prix_normal:any
}

export class DepenseElements{
    id:any
    devis:Devis=new Devis()
    elementbases:ElementBase=new ElementBase()
    duree:any
}

export class Depensedivers{
    id:any
    devis:Devis=new Devis()
    autredepenses:TypeDepense= new TypeDepense()
    montant:any
}

export class DepenseArtistes{
    id:any
    devis:Devis=new Devis()
    artistes:Artistes=new Artistes()
    duree:any
}

