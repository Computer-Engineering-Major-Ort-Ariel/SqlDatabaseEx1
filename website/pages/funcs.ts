import { send } from "../utilities";
import { Product } from "./types";

export async function createProductComponent(userId: string | null, product: Product) {
  let li = document.createElement("li");
  
    if (userId != null) {
      let minusButton = document.createElement("button");
      minusButton.innerText = "-";
      minusButton.onclick = async function () {
        await send("removeProduct", [userId, product.Id]);
        amountSpan.innerText = await send("getAmount", [userId, product.Id]);
      };
      li.appendChild(minusButton);
  
      let amountSpan = document.createElement("span");
      amountSpan.innerText = await send("getAmount", [userId, product.Id]);
      li.appendChild(amountSpan);
  
      let plusButton = document.createElement("button");
      plusButton.innerText = "+";
      plusButton.onclick = async function () {
        send("addProduct", [userId, product.Id]);
        amountSpan.innerText = await send("getAmount", [userId, product.Id]);
      };
      li.appendChild(plusButton);
    }
  
    let titleDiv = document.createElement("span");
    titleDiv.innerText = product.Title;
    li.appendChild(titleDiv);

    return li;
}