import { getSearch, postEmail } from "../helpers.js";
import api from "../../config/api.js";

const categories = await api.get("/products/categories");

// insert template for navbar
export function navbar() {
  const nav = document.createElement("nav");
  nav.classList.add("activeTabCart");

  nav.innerHTML = ``;
  return nav;
}

export function initNav() {}
