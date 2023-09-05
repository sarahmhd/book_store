let URL = "https://www.googleapis.com/books/v1/volumes?q=software+development";
const xhr = new XMLHttpRequest();
let mainDiv = document.querySelector(".main .row");
let books = [];

let loader = document.querySelector(".loading");

// showLoader();

function getData() {
  setTimeout(removeLoader, 3000);

  let data = JSON.parse(this.responseText);
  console.log(data.totalItems);
  console.log(data);
  data.items.forEach((el) => {
    let price = 150 * Math.ceil(Math.random());
    let currency = "EGP";
    if (el.saleInfo.saleability == "FOR_SALE") {
      price = el.saleInfo.listPrice.amount;
      currency = el.saleInfo.listPrice.currencyCode;
    }
    let book = {
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
    };
    books.push(book);
    console.log(book.authors);
  });

  addDataToBody(books);
}

xhr.addEventListener("load", getData);
xhr.open("GET", URL);
xhr.send();

function addDataToBody(books) {
  mainDiv.innerHTML = "";
  books.forEach((el) => {
    mainDiv.innerHTML += `
        <div class="col col-md-4 col-lg-3">
            <div class="card mb-4">
              <div class="card-img">
                  <div class="card-overlay">
                    <a href="details.html">
                      view details
                    </a>
                  </div>
                  <img src="${el.imageLink}" alt="" />
              </div>
              <div class="card-body">
                  <span class="author">${el.authors}</span>
                  <h5 class="card-title">${el.title}</h5>
                  <span class="price">£${el.price}</span>
              </div>
          </div>
        </div>
        `;
  });
}
// window.onload = () => {
//   setTimeout(() => {
//     loader.classList.remove("active");
//   }, 3000);
// };

function showLoader() {
  loader.classList.add("active");
}

function removeLoader() {
  loader.classList.remove("active");
}

// ============= SHOW SEARCH FORM ============= //
let searchIcon = document.querySelector(".header .search-bar");
let searchForm = document.querySelector(".header .search-form");

searchIcon.addEventListener("click", () => {
  searchForm.classList.toggle("active");
});
// ============= SHOW AND HIDE DROPDOWN CART ============= //
let cartIcon = document.querySelector(".header .shopping-cart");
let cartDropdown = document.querySelector(".header .cart-dropdown");

cartIcon.addEventListener("mouseover", showDropdown);
cartIcon.addEventListener("mouseout", hideDropdown);

function showDropdown() {
  cartDropdown.classList.add("active");
}

function hideDropdown() {
  cartDropdown.classList.remove("active");
}
// ============= SHOW AND HIDE SIDE MENU ============= //
let menuIcon = document.querySelector(".header .menu-icon");
let menuXIcon = document.querySelector(".side-menu .x-icon");
let sideMenu = document.querySelector(".side-menu");
let overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.classList.add("active");
});

menuXIcon.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});
