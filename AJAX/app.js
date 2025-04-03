let max = 1000000;

function isprime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function greneratePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(max);
    if (isprime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const output = document.querySelector("div#output");
const button = document.querySelector("#generate");
button.addEventListener("click", (e) => {
  const quota = document.querySelector("#number");
  console.log(quota.value);
  const primes = greneratePrimes(quota.value);
  output.innerHTML = primes;
});
