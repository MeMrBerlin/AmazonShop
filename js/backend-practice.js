const xhl = new XMLHttpRequest();
// !Types of requests:
// GET
// POST
// PUT
// DELETE

xhl.addEventListener("load", () => {
  console.log(xhl.response);
});

// !URL = Uniform Resource Locator
// - Like an address, but for the Internet.
// - Helps us locate another computer on the Internet.
xhl.open("GET", "https://supersimplebackend.dev/products");
xhl.send();
