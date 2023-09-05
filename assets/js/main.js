const loader = document.querySelector(".loading");
const mainDiv = document.querySelector(".main .row");
const cntSpan = document.querySelector(".cart-icon .count");
const searchIcon = document.querySelector(".header .search-bar");
const searchForm = document.querySelector(".header .search-form");
const cartIcon = document.querySelector(".header .shopping-cart");
const cartDropdown = document.querySelector(".header .cart-dropdown");
const menuIcon = document.querySelector(".header .menu-icon");
const menuXIcon = document.querySelector(".side-menu .x-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const searchInput = searchForm.querySelector("input[type='search']");

let books = [];
let shoppingBg = [];
let cnt = getCartCount();

cntSpan.innerHTML = cnt;

showLoader();
getData("software development");

searchIcon.addEventListener("click", toggleSearchForm);
cartIcon.addEventListener("mouseover", showCartDropdown);
cartIcon.addEventListener("mouseout", hideCartDropdown);
menuIcon.addEventListener("click", openSideMenu);
menuXIcon.addEventListener("click", closeSideMenu);

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
  console.log(books);
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
}

function addToLocalStorage(shoppingBg) {
  localStorage.setItem("bag", JSON.stringify(shoppingBg));
}

function updateCartCount() {
  cnt++;
  cntSpan.innerHTML = cnt;
}

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() != "") {
    getData(searchInput.value);
  } else {
    console.error("Enter Valid Data to Search for ...");
  }
});
