const loader = document.querySelector(".loading");
const mainDiv = document.querySelector(".main .row");
const cntSpan = document.querySelector(".cart-icon .count");
const searchIcon = document.querySelector(".header .search-bar");
const searchForm = document.querySelector(".header .search-form");
const cartIcon = document.querySelector(".header .shopping-cart");
const cartDropdown = document.querySelector(".header .cart-dropdown");
const cartDropdownBody = document.querySelector(
  ".header .cart-dropdown .items"
);
const cartDropdownTotal = document.querySelector(
  ".header .cart-dropdown .total-amount"
);
const totalSpan = document.querySelector(".cart-holder .total");
const menuIcon = document.querySelector(".header .menu-icon");
const menuXIcon = document.querySelector(".side-menu .x-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const searchInput = searchForm.querySelector("input[type='search']");
const searchSubmit = searchForm.querySelector("input[type='submit']");

let books = [];
let shoppingBg = getShoppingData();
let cnt = getCartCount();
let total = countTotal();

cntSpan.innerHTML = cnt;

showLoader();
getData("software development");

searchIcon.addEventListener("click", toggleSearchForm);
cartIcon.addEventListener("mouseover", showCartDropdown);
cartIcon.addEventListener("mouseout", hideCartDropdown);
menuIcon.addEventListener("click", openSideMenu);
menuXIcon.addEventListener("click", closeSideMenu);
searchSubmit.addEventListener("click", searchBook);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBook();
  }
});

function toggleSearchForm() {
  searchForm.classList.toggle("active");
}

function showCartDropdown() {
  cartDropdown.classList.add("active");
}

function hideCartDropdown() {
  cartDropdown.classList.remove("active");
}

function openSideMenu() {
  sideMenu.classList.add("active");
  overlay.classList.add("active");
}

function closeSideMenu() {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
}

function getCartCount() {
  const storedItems = JSON.parse(localStorage.getItem("bag")) || [];
  return storedItems.length;
}

function getShoppingData() {
  const shoppingItems = JSON.parse(localStorage.getItem("bag")) || [];
  return shoppingItems;
}

function showLoader() {
  loader.classList.add("active");
}

function removeLoader() {
  loader.classList.remove("active");
}

function getData(query) {
  const word = encodeURIComponent(query);
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${word}`;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", processResponse);
  xhr.open("GET", URL);
  xhr.send();
}

function processResponse() {
  removeLoader();
  const data = JSON.parse(this.responseText);
  const { items } = data;
  books = items.map(extractBookData);
  addDataToBody(books);
  // console.log(books);
}

function extractBookData(el) {
  const price =
    el.saleInfo.saleability === "FOR_SALE"
      ? el.saleInfo.listPrice.amount
      : 150 * Math.ceil(Math.random());
  const currency =
    el.saleInfo.saleability === "FOR_SALE"
      ? el.saleInfo.listPrice.currencyCode
      : "EGP";
  return {
    id: el.id,
    title: el.volumeInfo.title,
    authors: el.volumeInfo.authors.join(","),
    publishedDate: el.volumeInfo.publishedDate,
    description: el.volumeInfo.description,
    industryIdentifiers: el.volumeInfo.industryIdentifiers,
    readingModes: el.volumeInfo.readingModes,
    pageCount: el.volumeInfo.pageCount,
    printType: el.volumeInfo.printType,
    averageRating: el.volumeInfo.averageRating,
    categories: el.volumeInfo.categories,
    contentVersion: el.volumeInfo.contentVersion,
    imageLink: el.volumeInfo.imageLinks.thumbnail,
    infoLink: el.volumeInfo.infoLink,
    language: el.volumeInfo.language,
    maturityRating: el.volumeInfo.maturityRating,
    previewLink: el.volumeInfo.previewLink,
    ratingsCount: el.volumeInfo.ratingsCount,
    price: price,
    currency: currency,
    cnt: 1,
  };
}

function addDataToBody(books) {
  mainDiv.innerHTML = "";
  books.forEach((el, idx) => {
    const card = createCardElement(el, idx);
    mainDiv.appendChild(card);
  });
}

function createCardElement(book, idx) {
  const card = document.createElement("div");
  card.classList.add("col-12", "col-6", "col-md-4", "col-lg-3");
  card.innerHTML = `
    <div class="card mb-4">
      <div class="card-img">
          <div class="card-overlay">
            <button class="view-details">
              view details
            </button>
          </div>
          <img src="${book.imageLink}" alt="" />
      </div>
      <div class="card-body">
          <span class="author">${book.authors}</span>
          <h5 class="card-title">${book.title}</h5>
          <span class="price">£${book.price}</span>
      </div>
      <div class="add-icon" onclick="addToBag(${idx})">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  `;
  card.querySelector(".view-details").addEventListener("click", () => {
    viewDetails(book);
  });
  return card;
}

function viewDetails(book) {
  localStorage.setItem("book", JSON.stringify(book));
  window.location.href = "details.html";
  // console.log(book);
}

function addToBag(idx) {
  const item = books[idx];
  const exist = shoppingBg.find((el) => el.id === item.id);
  if (exist) {
    shoppingBg.forEach((bagItem) => {
      if (bagItem.id === item.id) {
        bagItem.cnt++;
      }
    });
  } else {
    shoppingBg.push(item);
    updateCartCount();
  }
  addToLocalStorage(shoppingBg);
  addToDropdown(shoppingBg);
}

function addToLocalStorage(shoppingBg) {
  localStorage.setItem("bag", JSON.stringify(shoppingBg));
}

function updateCartCount() {
  // cnt++;
  cntSpan.innerHTML = shoppingBg.length;
}

// searchInput.addEventListener("input", () => {
//   if (searchInput.value.trim() != "") {
//     getData(searchInput.value);
//   } else {
//     console.error("Enter Valid Data to Search for ...");
//   }
// });

function searchBook() {
  if (searchInput.value.trim() != "") {
    getData(searchInput.value);
  } else {
    console.error("Enter Valid Data to Search for ...");
  }
  searchInput.value = "";
}

function addToDropdown(shoppingBg) {
  cartDropdownBody.innerHTML = "";
  shoppingBg.forEach((item, idx) => {
    cartDropdownBody.innerHTML += `
       <div class="item d-flex">
          <div class="item-img">
            <img src="${item.imageLink}" alt="" />
          </div>
          <div class="item-info flex-column">
            <h5 class="item-title">${item.title}</h5>
            <span class="price">£${item.price}</span>
            <div class="x-icon" onclick="removeFromBg(${idx});countTotal()">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
    `;
    countTotal();
  });
}

function removeFromBg(idx) {
  shoppingBg = shoppingBg.filter((el) => el.id !== shoppingBg[idx].id);
  addToLocalStorage(shoppingBg);
  addToDropdown(shoppingBg);
  updateCartCount(shoppingBg);
}

addToDropdown(shoppingBg);

function countTotal() {
  let total = 0;
  if (shoppingBg.length > 0) {
    shoppingBg.forEach((el) => {
      total += parseFloat(el.price) * el.cnt;
    });
  } else {
    total = `0`;
  }
  totalSpan.innerHTML = `£${total}`;
  cartDropdownTotal.innerHTML = `£${total}`;
  return parseFloat(total).toFixed(2);
}
