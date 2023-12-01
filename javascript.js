const container = document.querySelector(".gallery-grid");
const input = document.getElementById("search-input");

const cart = document.querySelector(".cart-text");
const addToCartButton = document.querySelector(".add-to-cart");

function getCategory(val) {
  fetch("https://fakestoreapi.com/products/category/" + val)
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    });
}

function getRating(ratingValue) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingValue) {
      stars += `<img src="./images/Star1.svg" alt="Star" />`;
    } else {
      stars += `<img src="./images/Star5.svg" alt="Star" />`;
    }
  }
  return stars;
}
let count = 0;
function counter() {
  count++;
  cart.innerHTML = count;
}

const leaveMouse = (element) => {
  element.children[1].children[1].children[1].style.display = "none";
  element.children[0].classList.remove("overlay-effect");
};
const enterMouse = (element) => {
  element.children[1].children[1].children[1].style.display = "block";
  element.children[0].classList.add("overlay-effect");
};
function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    });
}

function displayProducts(products) {
  container.innerHTML = "";
  const val = input.value.toLowerCase();

  products
    .filter((product) => product.title.toLowerCase().includes(val))

    .forEach((product) => {
      const { id, title, price, image, rating } = product;
      const ratingValue = Math.round(rating.rate);
      const stars = getRating(ratingValue);

      if (!products.length) {
        container.innerHTML = "<p>No products found</p>";
        return;
      }

      container.innerHTML += `
    <div class="gallery-item" onmouseleave="leaveMouse(this)" onmouseenter="enterMouse(this)">
        <div class="gallery-image">

            <img src="${image}" alt="${title}" />
        </div>
        <div class="phone-info">
            <div class="phone-details">
                <div class="phone-title">${title}</div>
                <div class="phone-price">$${price}</div>
            </div>
            <div class="phone-actions">
                <div class="star-ratings">${stars}</div>
                <button class="add-to-cart" id=${id} onClick="counter()">Add to Cart</button>
            </div>
            <div class="off-percent">
                <div>56%</div>
                <div>OFF</div>
            </div>
        </div>
    </div>
  `;
    });
}

function search() {
  fetchProducts();
}

fetchProducts();
