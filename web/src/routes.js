import SignUp from "./Pages/Authentification/SignUp";
import Document from "./components/examples/Icons/Document";
import Home_artistes from "./Pages/Artistes/Home_artistes";
import HomeElementBase from "./Pages/ElementBase/HomeElementBase";
import HomePlace from "./Pages/Place/HomePlace";
import HomeDepenses from "./Pages/AutresDepenses/HomeDepenses";
import NewDevis from "./Pages/DevisSpectacle/Create/NewDevis";
import HomeDevis from "./Pages/DevisSpectacle/Listes/HomeDevis";
import ModifcationDevis from "./Pages/DevisSpectacle/Modification/ModifcationDevis";
import Hometaxe from "./Pages/Taxe/Hometaxe";
import Statistiques from "./Pages/Statistique/Statistiques";


let userRoutes = [
    {
      type: "collapse",
      name: "Devis",
      key: "devis",
      code: "devis",
      navbar: true,
      route: "/devis/create",
      icon: <Document size="12px" />,
      component: <NewDevis />,
      noCollapse: true,
      child: [
        {
          type: "collapse",
          name: "Creation",
          key: "creation",
          code: "devis",
          navbar: false,
          route: "/devis/create",
          icon: <Document size="12px" />,
          component: <NewDevis />,
          noCollapse: true,
        },
        {
          type: "collapse",
          name: "Listes",
          key: "listes",
          code: "devis",
          navbar: false,
          route: "/devis/listes",
          icon: <Document size="12px" />,
          component: <HomeDevis />,
          noCollapse: true,
        },
        {
          type: "collapse",
          name: "Statistiques",
          key: "statistiques",
          code: "devis",
          navbar: false,
          route: "/devis/statistiques",
          icon: <Document size="12px" />,
          component: <Statistiques />,
          noCollapse: true,
        }
      ]
    },
  {
    type: "collapse",
    name: "Devis",
    key: "devis",
    code: "modif",
    navbar: false,
    route: "/devis/modif/:id",
    icon: <Document size="12px" />,
    component: <ModifcationDevis />,
    noCollapse: true,
    child:[]
  }
];

let routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    code: "elements",
    navbar: true,
    route: "/elements/artistes",
    icon: <Document size="12px" />,
    component: <SignUp />,
    noCollapse: true,
    child: [{
      type: "collapse",
      name: "Artistes",
      key: "artiste",
      code: "elements",
      navbar: false,
      route: "/elements/artistes",
      icon: <Document size="12px" />,
      component: <Home_artistes />,
      noCollapse: true,
    },
      {
        type: "collapse",
        name: "ElementBase",
        key: "elementbase",
        code: "elements",
        navbar: false,
        route: "/elements/elementsbase",
        icon: <Document size="12px" />,
        component: <HomeElementBase />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Place",
        key: "place",
        code: "elements",
        navbar: false,
        route: "/elements/place",
        icon: <Document size="12px" />,
        component: <HomePlace />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Autres depenses",
        key: "depenses",
        code: "elements",
        navbar: false,
        route: "/elements/depenses",
        icon: <Document size="12px" />,
        component: <HomeDepenses />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Taxes",
        key: "taxes",
        code: "elements",
        navbar: false,
        route: "/elements/taxes",
        icon: <Document size="12px" />,
        component: <Hometaxe />,
        noCollapse: true,
      }
    ],
  },
  {
    type: "collapse",
    name: "Sign-Up",
    key: "signup",
    code: "auth",
    navbar: false,
    route: "/auth/signup",
    icon: <Document size="12px" />,
    component: <SignUp />,
    noCollapse: true,
    child: [],
  },
];

export function manageRoutes() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  let route = routes;
  if (user.profil.nom_profil === "admin") route = routes;
  else route = userRoutes;

  return route.filter((rout) => rout.navbar === true);
}

export function redirectRouter() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user.profil.nom_profil === "admin") return "/elements/artistes";
  return "/devis/create";
}

export function getAllRoutes() {
  return userRoutes.concat(routes);
}

export function getChildren(code) {
  const list = manageRoutes().filter((route) => route.code === code)[0];

  return list;
}

export function getIndice_Route(code) {
  const id = manageRoutes().findIndex((route) => route.code === code);

  return id;
}

export function checkUser() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user.profil.nom_profil === "admin") return true;
  return false;
}

export default routes;
