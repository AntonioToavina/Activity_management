import { Profil } from "./Profil";

export class Utilisateur {
  id: any = "";
  nom: any = "";
  prenom: any = "";
  email: any = "";
  mdp: any = "";
  profil: Profil = new Profil();
}
