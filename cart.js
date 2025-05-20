// Shopping cart items
const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    // FIXED: Changed from i <= cartItems.length to i < cartItems.length
    total += cartItems[i].price;
  }
  return total;
}

function applyDiscount(total, discountRate) {
  // FIXED: Validate that discountRate is between 0 and 1
  if (discountRate < 0 || discountRate > 1) {
    console.warn("Invalid discount rate. It must be between 0 and 1.");
    return total;
  }
  return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
    receipt += `${item.name}: $${item.price}\n`;
  });

  // FIXED: Validate that total is a number before formatting
  if (isNaN(total)) {
    console.error("Total is not a valid number.");
    receipt += `\n[Error: Total calculation failed]`;
  } else {
    receipt += `Total: $${total.toFixed(2)}`;
  }

  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
console.log("Initial total:", total);

const discountedTotal = applyDiscount(total, 0.2); // 20% discount
console.log("Discounted total:", discountedTotal);

const receipt = generateReceipt(cart, discountedTotal);
console.log("Receipt generated:\n" + receipt);

// Display results on page
document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
document.getElementById("receipt").textContent = receipt;

/*
======================
  Debugging Summary:
======================

1. Fixed an off-by-one error in the for-loop inside `calculateTotal`.
   - Original code used `i <= cartItems.length`, which caused an "undefined" error on the last loop.
   - Changed to `i < cartItems.length`.

2. Added input validation for `discountRate` inside `applyDiscount`.
   - Prevents values < 0 or > 1 from producing incorrect totals.

3. Added an `isNaN` check in `generateReceipt` to ensure `total` is valid.
   - Helps prevent crashing or incorrect receipt generation.

4. Used Console and Browser DevTools (F12) for:
   - Catching runtime errors
   - Watching variables in loops
   - Checking call stack

5. Edge Cases Tested:
   - Empty cart (`[]`)
   - Cart with one item
   - `discountRate = 0`, `1`, and invalid values like `-1`, `2`
*/
