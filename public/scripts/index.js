// redirect if logged in
if(CUSTOMER.sessionToken) {
  window.location.replace("/web/app");
}

$("form").submit(function(e){
  e.preventDefault();
  var route = $(".signup").html() == "" ? "/api/login" : "/api/signup";
  $.post(URL+route, $(this).serialize(), function(data) {
      console.log(data);
      if(data.error) {
        alert(data.message);
        return;
      }
      localStorage.setItem("sessionToken", data.sessionToken);
      window.location.replace("/web/app");
  });
});

$("#send-otp").click(function(){
  var mobileInput = $("input[name=mobileNumber]");
  var mobileNumber = mobileInput.val();
  var reg = new RegExp("^[1-9][0-9]{9}$");

  if(!reg.test(mobileNumber)) {
    alert("Invalid Mobile Number!");
    return;
  }

  $.post(URL+"/api/sendOtp", {mobileNumber: mobileNumber}, function(data) {
    mobileInput.attr("readonly","");
    $("#send-otp").removeClass("btn-primary").addClass("btn-secondary").text("Re-SEND OTP");
    $(".submit, .otp, .message").show();
    if(data.isPresent) {
      $(".signup").html(""); // remove signup inputs
      $(".message").text("Welcome back, Enter OTP to login!");
    } else {
      $(".signup").show();
      $(".message").text("Hello, Create an account!");
    }
  });
});
