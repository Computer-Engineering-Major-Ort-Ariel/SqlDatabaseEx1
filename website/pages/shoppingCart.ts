import { send } from "../utilities";

type Product = {
  Id: number,
  Title: string,
};

let cartUl = document.querySelector("#cartUl") as HTMLUListElement;

let userId = localStorage.getItem("userId");

let products = await send("getProductsInCart", userId) as Product[];

for (let i = 0; i < products.length; i++) {
  let li = document.createElement("li");
  cartUl.appendChild(li);

  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.onclick = function() {
    send("removePurchase", [userId, products[i].Id]);
    li.remove();
  };
  li.appendChild(removeButton);

  let titleSpan = document.createElement("span");
  titleSpan.innerText = products[i].Title;
  li.appendChild(titleSpan);
}