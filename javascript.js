// function getRating(ratingValue) {
//   console.log(ratingValue);
//   if (i <= ratingValue) {
//     return `<img src="./images/Star1.svg" alt="Star" />`;
//   } else {
//     return `<img src="./images/Star5.svg" alt="Star" />`;
//   }
// }

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

const container = document.querySelector(".gallery-grid");

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let products = data;
    products.map((product) => {
      const { title, price, image, rating } = product;

      const ratingValue = Math.round(rating.rate);
      console.log(ratingValue);
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
