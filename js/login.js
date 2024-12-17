let generatedCode;

//! Function to generate a 4-digit random number
function generateCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

//! Function to display the QR code
function generateQRCode(code) {
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";
  const qrData = `Scan this QR code. Code: ${code}`;
  QRCode.toCanvas(qrData, { width: 200 }, function (err, canvas) {
    if (err) console.error(err);
    qrContainer.appendChild(canvas);
  });
}

//! Function to check login status
export function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    document.getElementById("alreadyLoggedIn").style.display = "block";
    document.getElementById("qrLogin").style.display = "none";

    document.getElementById("backToShopping").addEventListener("click", () => {
      window.location.href = "amazon.html";
    });
  } else {
    startQRLogin();
  }
}

//! Function to start QR login process
function startQRLogin() {
  generatedCode = generateCode();
  console.log("Generated Code:", generatedCode);

  generateQRCode(generatedCode);
  setTimeout(() => {
    document.getElementById("numberInput").style.display = "block";
  }, 3000);

  document.getElementById("submitCode").addEventListener("click", () => {
    const userCode = document.getElementById("codeInput").value;
    if (userCode === generatedCode.toString()) {
      alert("Login Successful!");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "amazon.html";
    } else {
      alert("Invalid Code. Please try again.");
    }
  });
}
document.addEventListener("DOMContentLoaded", checkLoginStatus);

//! Function to handle login
function handleLogin(event) {
  event.preventDefault();
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "index.html";
}
document.querySelector(".login-form").addEventListener("submit", handleLogin);
