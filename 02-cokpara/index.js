let node = document.querySelector("#container");
let cash= Number.MAX_SAFE_INTEGER;
localStorage.setItem("cash", cash);
const productList = [
  {
    id: 1,
    name: "Kola",
    price: 4,
    img: "https://i.sozcu.com.tr/wp-content/uploads/2016/01/19/diyet-kola.jpg",
  },
  {
    id: 2,
    name: "Iskender",
    price: 30,
    img: "https://i.lezzet.com.tr/images-xxlarge-recipe/ev-yapimi-iskender-33bd7089-fa36-4398-95f8-02c6463ea27c.jpg",
  },
  {
    id: 3,
    name: "Yat",
    price: 450000,
    img: "https://i.ytimg.com/vi/9BCZpcgsAb8/maxresdefault.jpg",
  },
  {
    id: 4,
    name: "BahceliEv",
    price: 9500000,
    img: "https://www.neredekal.com/res/blog/1582812421_7.jpg",
  },
  {
    id: 5,
    name: "ArabaFabrikası",
    price: 120000000,
    img: "https://i.ytimg.com/vi/rfMkp55oTv0/maxresdefault.jpg",
  },
  // ... Kendi örneklerinizi eklemeye çekinmeyin.
];

function createDiv(id, src, lbl, btnId) {
  let i = `<div  id="${btnId}" style="border: 5px solid #555; margin:40px;padding:30px; text-align:center;" >
              <div style="padding-bottom:10px;">
                  <label style="padding-top:20px;text-size:20px;font-size:30px;">${btnId}</label>
              </div>
              <img style="padding:50 px; height:100px; weight:100px;border: 2px solid "black"; " src="${src}">
              <div style="padding-bottom:10px; padding-top:10px;">
                  <label>Birim Fiyat:${lbl}</label>                  
              </div>
              <div id="${btnId}">
                  <button id="${btnId}" name="${lbl}">Ekle</button>
                  <label id= "counter"> 0 </label>
                  <label id ="remain"> </label>
              </div>   
          </div> `;
  return i;
}



productList.forEach((item, index, object) => {
  node.innerHTML += createDiv(
    productList[index].id,
    productList[index].img,
    productList[index].price,
    productList[index].name
  );
});

let buttons = document.querySelectorAll("button");
function currentCash(buttons, remain){
  buttons.forEach(function (item){
    let remainLabel= document.querySelector(`#${item.id}>#remain`);
    remainLabel.innerText= `Kalan Paranız:${remain}`;
  });
}
buttons.forEach(function (item) {
  item.addEventListener("mouseover", (e) => {
    if (localStorage.getItem("cash") > item.name) {
      let divide = Math.floor(
        parseInt(localStorage.getItem("cash")) / parseInt(item.name)
      );
      item.innerText = `${divide} kadar alabilirsiniz.`;
      console.log(item);
    }
  });
  item.addEventListener("mouseleave", (e) => {
    item.innerText = "Ekle";
  });

  item.addEventListener("click", (e) => {
    let counter = document.querySelector(`#${item.id}>#counter`);
    counter.innerText = parseInt(counter.innerText) + 1;
    let remain = parseInt(localStorage.getItem("cash")) - parseInt(item.name);
    localStorage.setItem("cash", remain);
    currentCash(buttons, remain);
  });

  
});