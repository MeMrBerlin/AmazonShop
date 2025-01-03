export function checkLogin(event, targetUrl) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    // If logged in, allow navigation
    window.location.href = targetUrl;
  } else {
    // If not logged in, prevent navigation and show alert
    event.preventDefault();
    alert("You must log in to access this page.");
  }
}
