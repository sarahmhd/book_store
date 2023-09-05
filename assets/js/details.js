let body = document.querySelector(".main .row");
let bookData = localStorage.getItem("book")
  ? JSON.parse(localStorage.getItem("book"))
  : {};

body.innerHTML = `
        <div class="col-lg-4">
                <div class="book-img">
                  <img src="${bookData.imageLink}" alt="" />
                </div>
              </div>
              <div class="col-lg-8">
                <div class="info">
                  <div class="author">${bookData.authors}</div>
                  <h1 class="title">${bookData.title}</h1>
                  <span class="price"> £${bookData.price} </span>
                  <p class="desc">
                   ${bookData.description}
                  </p>
                  <p class="publish-date">
                    publishedDate: <span class="pbDate">${
                      bookData.publishedDate
                    }</span>
                  </p>
                  <p class="page-cnt">
                    pageCount: <span class="pg-cnt">${bookData.pageCount}</span>
                  </p>
                  <p class="category">
                    categories: <span class="ctg">${bookData.categories.join(
                      ","
                    )}</span>
                  </p>
                </div>
              </div>
`;
