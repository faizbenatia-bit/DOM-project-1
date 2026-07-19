const cartItems = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalEl = document.querySelector(".total");
const shippingEl = document.querySelector(".shipping");
const savingsEl = document.querySelector(".savings");
const itemCountEl = document.querySelector(".item-count");
const emptyState = document.querySelector(".empty-state");
const checkoutBtn = document.querySelector(".checkout");
const clearCartBtn = document.querySelector(".clear-cart");
const restoreBtn = document.querySelector(".restore");

function parsePrice(text) {
  return parseFloat(text.replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;
}

function formatPrice(amount) {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} DT`;
}

function getCards() {
  return Array.from(document.querySelectorAll(".card-body"));
}

function updateSummary() {
  const cards = getCards();
  const subtotal = cards.reduce((sum, card) => {
    const price = parsePrice(card.querySelector(".unit-price").textContent);
    const quantity = parseInt(card.querySelector(".quantity").textContent, 10);
    return sum + price * quantity;
  }, 0);

  const shipping = subtotal >= 200 ? 0 : 20;
  const savings = subtotal >= 200 ? 15 : 0;
  const total = subtotal + shipping - savings;

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(subtotal);
  }

  if (totalEl) {
    totalEl.textContent = formatPrice(total);
  }

  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? "Gratuite" : formatPrice(shipping);
  }

  if (savingsEl) {
    savingsEl.textContent = savings > 0 ? `-${formatPrice(savings)}` : formatPrice(0);
  }

  if (itemCountEl) {
    const articleCount = cards.reduce((sum, card) => {
      return sum + parseInt(card.querySelector(".quantity").textContent, 10);
    }, 0);
    itemCountEl.textContent = `${articleCount} article${articleCount > 1 ? "s" : ""}`;
  }

  if (emptyState) {
    emptyState.hidden = cards.length > 0;
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = cards.length === 0;
    checkoutBtn.textContent = cards.length === 0 ? "Panier vide" : "Valider la commande";
  }

  if (clearCartBtn) {
    clearCartBtn.disabled = cards.length === 0;
  }
}

function animateCard(card, className) {
  if (!card) return;
  card.classList.remove(className);
  void card.offsetWidth;
  card.classList.add(className);
}

function removeCard(card) {
  if (!card) return;
  card.classList.add("is-removing");
  card.addEventListener(
    "animationend",
    () => {
      card.remove();
      updateSummary();
    },
    { once: true }
  );
}

if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const card = button.closest(".card-body");
    if (!card) return;

    if (button.classList.contains("plus")) {
      const quantityEl = card.querySelector(".quantity");
      quantityEl.textContent = parseInt(quantityEl.textContent, 10) + 1;
      animateCard(card, "quantity-updated");
      updateSummary();
    }

    if (button.classList.contains("minus")) {
      const quantityEl = card.querySelector(".quantity");
      const currentValue = parseInt(quantityEl.textContent, 10);

      if (currentValue <= 1) {
        removeCard(card);
      } else {
        quantityEl.textContent = currentValue - 1;
        animateCard(card, "quantity-updated");
        updateSummary();
      }
    }

    if (button.classList.contains("delete")) {
      removeCard(card);
    }

    if (button.classList.contains("like")) {
      button.classList.toggle("active");
    }
  });
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    const cards = getCards();
    cards.forEach((card) => card.classList.add("is-removing"));

    window.setTimeout(() => {
      cards.forEach((card) => card.remove());
      updateSummary();
    }, 220);
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (checkoutBtn.disabled) return;

    checkoutBtn.classList.add("is-success");
    checkoutBtn.textContent = "Commande confirmée";

    window.setTimeout(() => {
      checkoutBtn.classList.remove("is-success");
      checkoutBtn.textContent = "Valider la commande";
    }, 1400);
  });
}

if (restoreBtn) {
  restoreBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

updateSummary();
