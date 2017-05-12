function customerDetails(customer) {
  var card = $(".user-details");
  card.find(".name").html(customer.name);
  card.find(".mobileNumber").html(customer.mobile);
  card.find(".email").html(customer.email);
}

function fetchCustomer() {
  $.ajax({
      type: "GET",
      url: URL+'/api/user?platform=web&user='+CUSTOMER.sessionToken,
      success: function(data) {
          if(data.error) {
            signout();
          } else {
            customerDetails(data.user);
          }
      },
      error: function() {
        signout();
      }
  });
}

$("#deleteCustomer").click(function() {
  alert("this function is not working right now");
});

$("#updateCustomer").click(function() {
  alert("this function is not working right now");
});

$( document ).ready(function() {
  fetchCustomer();
});
