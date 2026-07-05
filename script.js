// Sélection des éléments
const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");
const deleteBtns = document.querySelectorAll(".delete");
const heartBtns = document.querySelectorAll(".like");

function parsePrice(text) {
  return parseFloat(text.replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;
}

function formatPrice(amount) {
  return `${amount.toFixed(2)} DT`;
}

function updateTotal() {
  let total = 0;

  const cards = document.querySelectorAll(".card-body");

  cards.forEach((card) => {
    const price = parsePrice(card.querySelector(".unit-price").textContent);
    const quantity = parseInt(card.querySelector(".quantity").textContent, 10);

    total += price * quantity;
  });

  const subtotalEl = document.querySelector(".subtotal");
  const totalEl = document.querySelector(".total");

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(total);
  }

  if (totalEl) {
    totalEl.textContent = formatPrice(total);
  }
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
    const currentValue = parseInt(quantity.textContent, 10);

    if (currentValue > 0) {
      quantity.textContent = currentValue - 1;
      updateTotal();
    }
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
