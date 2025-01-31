import { send } from "../utilities";
import { createProductComponent } from "./funcs";
import { Catagory, Product } from "./types";

let outDiv = document.querySelector("#outDiv") as HTMLDivElement;
let inDiv = document.querySelector("#inDiv") as HTMLDivElement;
let nameDiv = document.querySelector("#nameDiv") as HTMLDivElement;
let logOutButton = document.querySelector("#logOutButton") as HTMLButtonElement;
let catagoriesDiv = document.querySelector("#catagoriesDiv") as HTMLDivElement;
let searchInput = document.querySelector("#searchInput") as HTMLInputElement;
let searchButton = document.querySelector("#searchButton") as HTMLButtonElement;
let searchUl = document.querySelector("#searchUl") as HTMLDivElement;


let userId = localStorage.getItem("userId");
let username = await send("getUsername", userId);

if (username != null) {
  nameDiv.innerText = `Welcome, ${username}!`;
  inDiv.style.display = "block";
}
else {
  localStorage.removeItem("userId");
  outDiv.style.display = "block";
}

logOutButton.onclick = function() {
  localStorage.removeItem("userId");
  location.reload();
};

let catagories = await send("getCatagories", []) as Catagory[]; 

for (let i = 0; i < catagories.length; i++) {
  let a = document.createElement("a");
  a.innerText = catagories[i].Title;
  a.href = "catagory.html?catagoryId=" + catagories[i].Id;

  catagoriesDiv.appendChild(a);
}


searchButton.onclick = async function() {
  searchUl.innerHTML = "";
  let products = await send("getRelevantProducts", searchInput.value) as Product[];

  for (let i = 0; i < products.length; i++) {
    let li = await createProductComponent(userId, products[i]);
    searchUl.appendChild(li);
  }
};