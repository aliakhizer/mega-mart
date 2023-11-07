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

let result;

function search() {
  const input = document.getElementById("search-input").value.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(input)
  );

  const container = document.querySelector(".gallery-grid");
  container.innerHTML = "";

  filteredProducts.forEach((product) => {
    const { title, price, image, rating } = product;
    const ratingValue = Math.round(rating.rate);
    const stars = getRating(ratingValue);

    container.innerHTML += `
                <div class="gallery-item">
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
                            <button class="add-to-cart">Add to Cart</button>
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

let count = 0;
const counter = function () {
  count++;
  console.log(count);
};

let products;

const button = document.querySelector(".add-to-cart");
button.addEventListener("click", counter);

const container = document.querySelector(".gallery-grid");

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    products = data;

    products.map((product) => {


     

      const { title, price, image, rating } = product;

      const ratingValue = Math.round(rating.rate);
      const stars = getRating(ratingValue);

      return (container.innerHTML += `
                    <div class="gallery-item">
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
                                <button class="add-to-cart">Add to Cart</button>
                            </div>
                            <div class="off-percent">
                                <div>56%</div>
                                <div>OFF</div>
                            </div>
                        </div>
                    `);
    });
  });
