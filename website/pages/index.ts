import { send } from "../utilities";

type Catagory = {
  Id: number,
  Title: string,
};

let logOutButton = document.querySelector("#logOutButton") as HTMLButtonElement;

logOutButton.onclick = function() {
  localStorage.removeItem("userId");
  location.reload();
};

let catagories = await send("getCatagories", []) as Catagory[]; 

for (let i = 0; i < catagories.length; i++) {
  let a = document.createElement("a");
  a.innerText = catagories[i].Title;
  a.href = "catagory.html?catagoryId=" + catagories[i].Id;

  document.body.appendChild(a);
}