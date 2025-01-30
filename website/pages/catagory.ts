import { send } from "../utilities";

type Product = {
  Id: number;
  Title: string;
};

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
  let li = document.createElement("li");
  productsUl.appendChild(li);

  if (userId != null) {
    let minusButton = document.createElement("button");
    minusButton.innerText = "-";
    minusButton.onclick = async function () {
      await send("removeProduct", [userId, products[i].Id]);
      amountSpan.innerText = await send("getAmount", [userId, products[i].Id]);
    };
    li.appendChild(minusButton);

    let amountSpan = document.createElement("span");
    amountSpan.innerText = await send("getAmount", [userId, products[i].Id]);
    li.appendChild(amountSpan);

    let plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.onclick = async function () {
      send("addProduct", [userId, products[i].Id]);
      amountSpan.innerText = await send("getAmount", [userId, products[i].Id]);
    };
    li.appendChild(plusButton);
  }

  let titleDiv = document.createElement("span");
  titleDiv.innerText = products[i].Title;
  li.appendChild(titleDiv);
}
