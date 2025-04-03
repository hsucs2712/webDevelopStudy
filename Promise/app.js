// let fetchPromise = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
// );
// let fetchPromise2 = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
// );
// let fetchPromise3 = fetch(
//   "https://mdn.github.io/learning-area/javascript/oojs/json/superhiroes.json"
// );
// // console.log(fetchPromise);

// // fetchPromise.then((response) => {
// //   console.log(fetchPromise);
// //   console.log(response);
// // });

// // fetchPromise
// //   .then((response) => response.json())
// //   //  .json() method is also async
// //   // let jsonPromise = response.json(); //  response => JSON
// //   // console.log(jsonPromise);

// //   .then((data) => {
// //     console.log(data);
// //   }).catch(e=>{
// //     console.log(e)
// //   })
// Promise.all([fetchPromise, fetchPromise2, fetchPromise3]).then((response) => {
//   console.log(response.url, response.status);
// });

async function fetchProduct() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    console.log(response);

    let data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
fetchProduct();
