var URL = window.location.origin;
URL = URL.replace("3001", "3000");

var CUSTOMER = {
  sessionToken: localStorage.getItem("sessionToken")
}

function signout() {
  localStorage.removeItem("sessionToken");
  window.location.replace("/web");
}

$("#signout").click(function() {
  signout();
});

$('.collapse').collapse();
