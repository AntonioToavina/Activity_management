import {Typeelement} from "./Typeelement";
import {Typemateriel} from "./Typemateriel";

export class ElementBase{
    id:any
    typeelements:Typeelement=new Typeelement()
    typemateriels:Typemateriel=new Typemateriel()
    tarif:any

}