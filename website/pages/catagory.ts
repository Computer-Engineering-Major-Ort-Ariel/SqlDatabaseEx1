import { send } from "../utilities";

let query = new URLSearchParams(location.search);
let catagoryTitleH2 = document.querySelector("#catagoryTitleH2") as HTMLHeadingElement;

let catagoryId = parseInt(query.get("catagoryId")!);

let catagoryTitle = await send("getCatagoryTitle", catagoryId) as string;

console.log(catagoryTitle);

catagoryTitleH2.innerText = catagoryTitle;