let tbody = document.querySelector(".shopping-main tbody");
let finalTotal = document.querySelector(".total-price");
let checkoutBtn = document.querySelector(".checkout");

shoppingBg = getShoppingData();
finalTotal.innerHTML = `£${total}`;

function getShoppingData() {
  const shoppingItems = JSON.parse(localStorage.getItem("bag")) || [];
  return shoppingItems;
}

function renderShoppingList() {
  tbody.innerHTML = "";
  shoppingBg.forEach((item, idx) => {
    tbody.innerHTML += `
      <tr id="${item.id}">
          <td>
              <div class="icon-x" onclick="removeFromBg(${idx});countTotal();renderShoppingList()">
                  <i class="fa-solid fa-x"></i>
              </div>
          </td>
          <td>
              <div class="img">
                  <img src="${item.imageLink}" alt="">
              </div>
          </td>
          <td>
              <h5>${item.categories.join(",")}</h5>
          </td>
          <td>
              <div class="counter d-flex">
                  <button class="btn plus" onclick="plusFunc(${idx})">+</button>
                  <input type="number" value="${
                    item.cnt
                  }" min="1" max="100" data-idx="${item.id}">
                  <button class="btn min" onclick="minFunc(${idx})">-</button>
              </div>
          </td>
          <td>
              <p class="price text-black-50">£${
                parseFloat(item.price) * parseFloat(item.cnt)
              }</p>
          </td>
      </tr>
    `;
  });
}

function plusFunc(idx) {
  if (shoppingBg[idx].cnt >= 100) return;
  shoppingBg[idx].cnt++;
  renderShoppingList();
  addToLocalStorage(shoppingBg);
  countTotal();
}

function minFunc(idx) {
  if (shoppingBg[idx].cnt <= 1) return;
  shoppingBg[idx].cnt--;
  renderShoppingList();
  addToLocalStorage(shoppingBg);
  countTotal();
}

renderShoppingList();

checkoutBtn.addEventListener("click", () => {
  localStorage.removeItem("bag");
  shoppingBg = [];
  tbody.innerHTML = "";
  finalTotal.innerHTML = `£0`;
  countTotal();
});
