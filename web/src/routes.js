import SignUp from "./Pages/Authentification/SignUp";
import Document from "./components/examples/Icons/Document";


let userRoutes = [];

let routes = [
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
  if (user.profil.nom_profil === "admin") return "/laptops/home";
  return "/laptops/home";
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
