import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage } from "./utils.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document
  .querySelector("#checkoutSubmit")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
      try {
        await order.checkout();
        localStorage.removeItem("so-cart");
        localStorage.removeItem("quantity");
        window.location.href = "/checkout/success.html";
      } catch (error) {
        alertMessage(error.message);
      }
    }
  });
