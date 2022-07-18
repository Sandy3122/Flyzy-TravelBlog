function RegisterationData() {
  var name = document.getElementById("username").value;
  var number = document.getElementById("userphone").value;
  var email = document.getElementById("useremail").value;
  var password = document.getElementById("password").value;
  var phno = length == 10;
  if (name == "" || number == "" || email == "") {
    swal({
      title: "Fields Empty!",
      text: "Please Check The Missing Fields!",
      icon: "warning",
      button: "OKAY",
    });
    return false;
  } else if (number.match(phno)) {
    alert("Mobile Number Should Contain 10 Digits");
    return false;
  }

  var data = {
    Name: document.getElementById("username").value,
    MobileNumber: document.getElementById("userphone").value,
    Email: document.getElementById("useremail").value,
    Password: document.getElementById("password").value,
  };

  fetch("/sendData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      swal({
        title: "Successfully Submited",
        text: "Click OK To SignIn",
        icon: "success",
        button: "OK",
      });
      window.location.href = "/login#signIn";
    })
    .catch((error) => {
      alert("Mail ID Already Exits");
    });
}
