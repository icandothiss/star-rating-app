const productInput = document.getElementById("product-select");
const btnSave = document.getElementById("btn-save");
const inputRating = document.getElementById("rating-control");
const stars = document.querySelectorAll(".stars-inner");
const numRating = document.querySelectorAll(".number-rating");
const tr = document.querySelectorAll("tr");
let products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : getOptions();
console.log(products);

productInput.addEventListener("change", () => {
  inputRating.disabled = false;
});
btnSave.addEventListener("click", addRating);

function getOptions() {
  let _products = [];
  const options = document.getElementsByTagName("option");
  for (let index = 1; index < options.length; index++) {
    const element = options[index];
    _products.push({ name: element.value, rating: randomizeRating() });
  }
  return _products;
}

function randomizeRating() {
  return Number((Math.random() * 5).toFixed(1));
}
function createStars() {
  let _output = "";
  for (let i = 0; i < products.length; i++) {
    const rate = products[i].rating;
    numRating[i].innerText = rate;
    stars[i].innerHTML = "";
    let [initRate, decimalRate] = rate.toString().split(".");
    decimalRate = parseInt(decimalRate) || 0;

    for (let j = 0; j < 5; j++) {
      if (j < initRate) {
        _output += `<i class="fa-solid fa-star"></i>`;
      } else {
        if (decimalRate < 3) {
          _output += `<i class="fa-regular fa-star"></i>`;
        } else if (decimalRate >= 8) {
          _output += `<i class="fa-solid fa-star"></i>`;
        } else {
          _output += `<i class="fa-solid fa-star-half-stroke"></i>`;
        }
        decimalRate = 0;
      }
    }
    stars[i].innerHTML = _output;

    _output = "";
  }
}
function saveRates(product, index) {
  products[index] = product;
  localStorage.setItem("products", JSON.stringify(products));
  createStars();
}

function addRating() {
  const name = productInput.value;
  const rating = inputRating.value;
  const productIndex = products.map((p) => p.name).indexOf(name);
  saveRates({ name: name, rating: Number(rating) }, productIndex);

  console.log(productIndex);
}
createStars();
// if (
//   localStorage.getItem("products") !== null &&
//   localStorage.getItem("indexes") !== null
// ) {
//   let indexReverse = JSON.parse(localStorage.getItem("indexes"));
//   console.log(indexReverse.reverse());
//   console.log(rateReverse.reverse());
//   let indexStorage = JSON.parse(localStorage.getItem("indexes"));
//   console.log(indexStorage);
//   console.log(localStorage.getItem("rates"));
//   let indexresult = [];
//   let rateresult = [];
//   for (let i = 1; i < 6; i++) {
//     if (indexReverse.includes(i)) {
//       let indexes = indexReverse.indexOf(i);
//       indexresult.push(indexReverse[indexes]);
//       rateresult.push(rateReverse[indexes]);
//       console.log(rateresult);
//     }
//   }
//   for (let rate in products) {
//     let storageIndex = 0;
//     for (let index in indexStorage) {
//       products[indexStorage[index] - 1] = rateresult[storageIndex];
//       storageIndex++;
//       console.log(rateresult);
//     }
//     break;
//   }
//   localStorage.setItem("indexes", JSON.stringify(indexresult));
//   localStorage.setItem("rates", JSON.stringify(rateresult));
// }

//   stars[i].innerHTML += output;
//   if (decRate === "0.0") {
//     for (let j = 0; j < empty; j++) {
//       stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
//     }
//   } else {
//     if (decRate >= 0.8) {
//       stars[i].innerHTML += `<i class="fa-solid fa-star"></i>`;
//       for (let q = 0; q < empty - 1; q++) {
//         stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
//       }
//     } else if (decRate < 0.8 && decRate >= 0.3) {
//       stars[i].innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
//       for (let q = 0; q < empty - 1; q++) {
//         stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
//       }
//     } else if (decRate < 0.3) {
//       stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
//       for (let q = 0; q < empty - 1; q++) {
//         stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
//       }
//     }
//   }

// function productFunc() {
//   inputRating.disabled = false;
// }

// function ratingFunc() {
//   const rate = inputRating.value;
//   let intRate = Math.floor(rate);
//   let decRate = (rate - intRate).toFixed(1);
//   let empty = 5 - intRate;
//   const productName = productInput.value;
//   let output = [];

//   for (let i = 1; i < tr.length; i++) {
//     if (productName === tr[i].childNodes[1].innerText) {
//       saveRates({ name: productName, rate: rate }, i);
//       numRating[i - 1].innerText = rate;
//       console.log(stars[i - 1]);
//       deleteChildren(stars[i - 1]);
//       for (let i = 0; i < intRate; i++) {
//         output += `<i class="fa-solid fa-star"></i>`;
//       }
//       stars[i - 1].innerHTML += output;
//       if (decRate === "0.0") {
//         for (let j = 0; j < empty; j++) {
//           stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
//         }
//       } else {
//         if (decRate >= 0.8) {
//           stars[i - 1].innerHTML += `<i class="fa-solid fa-star"></i>`;
//           for (let q = 0; q < empty - 1; q++) {
//             stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
//           }
//         } else if (decRate < 0.8 && decRate >= 0.3) {
//           stars[
//             i - 1
//           ].innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
//           for (let q = 0; q < empty - 1; q++) {
//             stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
//           }
//         } else if (decRate < 0.3) {
//           stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
//           for (let q = 0; q < empty - 1; q++) {
//             stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
//           }
//         }
//       }
//     }
//   }
// }
