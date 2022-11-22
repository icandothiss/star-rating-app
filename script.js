const productInput = document.getElementById("product-select");
const rating = document.getElementById("rating-control");
const stars = document.querySelectorAll(".stars-inner");
const numRating = document.querySelectorAll(".number-rating");
const tr = document.querySelectorAll("tr");
let initRating = [4.7, 3.4, 2.3, 3.6, 4.2];
let indexReverse = JSON.parse(localStorage.getItem("indexes"));
let rateReverse = JSON.parse(localStorage.getItem("rates"));
console.log(indexReverse.reverse());
console.log(rateReverse.reverse());
console.log(localStorage.getItem("indexes"));
console.log(localStorage.getItem("rates"));
let indexresult = [];
let rateresult = [];
for (let i = 1; i < 6; i++) {
  if (indexReverse.includes(i)) {
    let indexes = indexReverse.indexOf(i);
    indexresult.push(indexReverse[indexes]);
    rateresult.push(rateReverse[indexes]);
  }
}
localStorage.setItem("indexes", JSON.stringify(indexresult));
localStorage.setItem("rates", JSON.stringify(rateresult));

for (let i = 0; i < indexresult.length; i++) {
  initRating[i] = rateresult[i];
}

console.log(initRating);

productInput.addEventListener("change", productFunc);
rating.addEventListener("blur", ratingFunc);

let output = [];
for (let i = 0; i < initRating.length; i++) {
  const product = productInput.value;
  const rate = initRating[i];
  let intRate = Math.floor(rate);
  let decRate = (rate - intRate).toFixed(1);
  let empty = 5 - intRate;
  numRating[i].innerText = rate;
  deleteChildren(stars[i]);
  for (let i = 0; i < intRate; i++) {
    output += `<i class="fa-solid fa-star"></i>`;
  }
  stars[i].innerHTML += output;
  if (decRate === "0.0") {
    for (let j = 0; j < empty; j++) {
      stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
    }
  } else {
    if (decRate >= 0.8) {
      stars[i].innerHTML += `<i class="fa-solid fa-star"></i>`;
      for (let q = 0; q < empty - 1; q++) {
        stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
      }
    } else if (decRate < 0.8 && decRate >= 0.3) {
      stars[i].innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
      for (let q = 0; q < empty - 1; q++) {
        stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
      }
    } else if (decRate < 0.3) {
      stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
      for (let q = 0; q < empty - 1; q++) {
        stars[i].innerHTML += `<i class="fa-regular fa-star"></i>`;
      }
    }
  }
  output = [];
}

function productFunc() {
  rating.disabled = false;
}

function ratingFunc() {
  const rate = rating.value;
  let intRate = Math.floor(rate);
  let decRate = (rate - intRate).toFixed(1);
  let empty = 5 - intRate;
  const product = productInput.value;
  let output = [];

  for (let i = 1; i < tr.length; i++) {
    if (product === tr[i].childNodes[1].innerText) {
      saveRates(rate, i);
      numRating[i - 1].innerText = rate;
      console.log(stars[i - 1]);
      deleteChildren(stars[i - 1]);
      for (let i = 0; i < intRate; i++) {
        output += `<i class="fa-solid fa-star"></i>`;
      }
      stars[i - 1].innerHTML += output;
      if (decRate === "0.0") {
        for (let j = 0; j < empty; j++) {
          stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
        }
      } else {
        if (decRate >= 0.8) {
          stars[i - 1].innerHTML += `<i class="fa-solid fa-star"></i>`;
          for (let q = 0; q < empty - 1; q++) {
            stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
          }
        } else if (decRate < 0.8 && decRate >= 0.3) {
          stars[
            i - 1
          ].innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
          for (let q = 0; q < empty - 1; q++) {
            stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
          }
        } else if (decRate < 0.3) {
          stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
          for (let q = 0; q < empty - 1; q++) {
            stars[i - 1].innerHTML += `<i class="fa-regular fa-star"></i>`;
          }
        }
      }
    }
  }
}

function deleteChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

function saveRates(rate, index) {
  let rates;
  let indexes;
  if (
    localStorage.getItem("rates") === null &&
    localStorage.getItem("indexes") === null
  ) {
    rates = [];
    indexes = [];
  } else {
    rates = JSON.parse(localStorage.getItem("rates"));
    indexes = JSON.parse(localStorage.getItem("indexes"));
  }
  rates.push(rate);
  indexes.push(index);
  localStorage.setItem("rates", JSON.stringify(rates));
  localStorage.setItem("indexes", JSON.stringify(indexes));
}
