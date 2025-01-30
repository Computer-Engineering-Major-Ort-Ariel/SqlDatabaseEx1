import { send } from "../utilities";
import { createProductComponent } from "./funcs";
import { Product } from "./types";

let query = new URLSearchParams(location.search);

let userId = localStorage.getItem("userId");

let catagoryTitleH2 = document.querySelector(
  "#catagoryTitleH2",
) as HTMLHeadingElement;
let productsUl = document.querySelector("#productsUl") as HTMLUListElement;

let catagoryId = parseInt(query.get("catagoryId")!);

let catagoryTitle = await send("getCatagoryTitle", catagoryId) as string;

catagoryTitleH2.innerText = catagoryTitle;

let products = await send("getProducts", catagoryId) as Product[];

for (let i = 0; i < products.length; i++) {
  let li = await createProductComponent(userId, products[i]);
  productsUl.appendChild(li);
}
