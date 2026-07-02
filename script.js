// Sélection des éléments
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
const deleteBtns = document.querySelectorAll(".delete");
const heartBtns = document.querySelectorAll(".like");

// Fonction qui calcule le prix total
function updateTotal() {
  let total = 0;

  const cards = document.querySelectorAll(".card-body");

  cards.forEach((card) => {
    const price = parseFloat(
      card.querySelector(".unit-price").textContent.replace("DT", "").trim(),
    );

    const quantity = parseInt(card.querySelector(".quantity").textContent, 10);

    total += price * quantity;
  });

  document.querySelector(".total").textContent = total ;
}

// -------------------
// Boutons +
// -------------------
plusBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const quantity = this.previousElementSibling;

    quantity.textContent = parseInt(quantity.textContent, 10) + 1;

    updateTotal();
  });
});

// -------------------
// Boutons -
// -------------------
minusBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const quantity = this.nextElementSibling;

    if (parseInt(quantity.textContent, 10) > 0) {
      quantity.textContent = parseInt(quantity.textContent, 10) - 1;
    }

    updateTotal();
  });
});

// -------------------
// Supprimer un article
// -------------------
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.closest(".card-body").remove();

    updateTotal();
  });
});

// -------------------
// Like (coeur)
// -------------------
heartBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// Calcul initial
updateTotal();
