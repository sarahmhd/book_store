const body = document.querySelector(".main .row");
const bookData = JSON.parse(localStorage.getItem("book")) || {};

const {
  imageLink,
  authors,
  title,
  price,
  description,
  publishedDate,
  pageCount,
  categories,
} = bookData;

body.innerHTML = `
  <div class="col-lg-4">
    <div class="book-img">
      <img src="${imageLink}" alt="" />
    </div>
  </div>
  <div class="col-lg-8">
    <div class="info">
      <div class="author">${authors}</div>
      <h1 class="title">${title}</h1>
      <span class="price"> £${price} </span>
      <p class="desc">${description}</p>
      <p class="publish-date">
        publishedDate: <span class="pbDate">${publishedDate}</span>
      </p>
      <p class="page-cnt">
        pageCount: <span class="pg-cnt">${pageCount}</span>
      </p>
      <p class="category">
        categories: <span class="ctg">${categories.join(",")}</span>
      </p>
    </div>
  </div>
`;
