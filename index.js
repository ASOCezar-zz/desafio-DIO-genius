let order = [];
let clickedOrder = [];
let player = "";
let level = 1;

const gameStart = () => {
  order = [];
  clickedOrder = [];
  let level = 1;
  window.localStorage.setItem("genius-level", level);
  window.localStorage.setItem("genius-level", level);
  document.querySelector(".highscore").innerText = `Highscore: ${window.localStorage.getItem("genius-highscore")}`;
  document.querySelector(".level").innerText = `Level: ${window.localStorage.getItem("genius-level")}`;
  randomizeOrder();
}


const randomizeOrder = () => {
  const color = Math.floor(Math.random() * 4);
  order.push(color);
  light(order);
}

function lightsUp (value, index) {
  setTimeout(() => {
    switch(value) {
      case 0:
        redBtn.classList.add("light");
        console.log(value);
        break;
      case 1:
        blueBtn.classList.add("light");
        console.log(value);
        break;
      case 2:
        yellowBtn.classList.add("light");
        console.log(value);
        break;
      case 3:
        greenBtn.classList.add("light");
        console.log(value);
        break;
    }    
  }, 1000 * (index + 1));
}

function lightsDown (value, index) {
  setTimeout(() => {
    switch(value) {
      case 0:
        redBtn.classList.remove("light");
        break;
      case 1:
        blueBtn.classList.remove("light");
        break;
      case 2:
        yellowBtn.classList.remove("light");
        break;
      case 3:
        greenBtn.classList.remove("light");
        break;
    }    
  }, 1000 * (index + 1) + 500);
}

const light = (order) => {
  order.map(async (value, index) => {
    lightsUp(value, index)
    lightsDown (value, index);
  })
}

const redBtn = document.querySelector(".red");
const blueBtn = document.querySelector(".blue");
const yellowBtn = document.querySelector(".yellow");
const greenBtn = document.querySelector(".green");

const setClickedOrder = (value, order, clickedOrder) => {
  clickedOrder.push(value);

  if(clickedOrder.length === order.length) {
    compareOrders(clickedOrder, order);
  }
}

redBtn.addEventListener("click", () => setClickedOrder(0, order, clickedOrder));
blueBtn.addEventListener("click", () => setClickedOrder(1, order, clickedOrder));
yellowBtn.addEventListener("click", () => setClickedOrder(2, order, clickedOrder));
greenBtn.addEventListener("click", () => setClickedOrder(3, order, clickedOrder));

const compareOrders = (clickedOrder, order) => {
  const orderComparisons = clickedOrder.map((value, index) => value == order[index]);

  if (orderComparisons.every((value) => value === true)) {
    level = order.length + 1;
    nextLevel(level);
    window.localStorage.setItem("genius-level", level);
    if (Number(window.localStorage.getItem("genius-highscore")) < level || Number(window.localStorage.getItem("genius-highscore")) === undefined) {
      window.localStorage.setItem("genius-highscore", level);
      document.querySelector(".highscore").innerText = `Highscore: ${window.localStorage.getItem("genius-highscore")}`;
    }
    document.querySelector(".level").innerText = `Level: ${window.localStorage.getItem("genius-level")}`;
  } else {
    alert("Você perdeu!! Clique em OK para tentar de novo");
    gameStart();
  }
};

const nextLevel = (level) => {
  clickedOrder = [];
  randomizeOrder();
};

gameStart();
