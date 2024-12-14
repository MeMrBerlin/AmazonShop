import { formatCurrency } from "../js/utils/money.js";
describe("test suite: formatCurrency", () => {
  it("Convert cents to rupees", () => {
    expect(formatCurrency(2000)).toEqual("1680.00");
  });

  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("Rounds up nearest cents", () => {
    expect(formatCurrency(2000.5)).toEqual("1680.84");
  });
});
