const toggleBtn = document.querySelector(".navBar__toggleBtn");
const menu = document.querySelector(".navBar__menus");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".projects");
  const lists = container.querySelector(".item__list");
  lists.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
    <li>
      <a href="https://github.com/sts827">
          <div class="project__image screen">
              <div class="top">${item.type} </div>
              <div class="bottom">${item.usage}</div>
              <img src="${item.img}" alt="">
          </div>
      </a>
    </li>
  `;
}
function setEventListener(items) {
  const category = document.querySelector(".project__names");
  category.addEventListener("click", (event) => onButtonClick(event, items));
}
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
}
loadItems().then((items) => {
  // console.log(items)
  displayItems(items);
  setEventListener(items);
});
