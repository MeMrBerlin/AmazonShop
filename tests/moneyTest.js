import { formatCurrency } from "../js/utils/money.js";

console.log("Convert cents to rupees");
if (formatCurrency(2050) === "1722") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("Works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("Rounds up nearest cents");
if (formatCurrency(2000.5) === "1680.84") {
  console.log("passed");
} else {
  console.log("failed");
}
