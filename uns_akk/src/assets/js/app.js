// Sticky Navbar

function windowScroll() {
  const navbar = document.getElementById("nav-sticky");
  if (navbar) {
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});

// back-to-top

var mybutton = document.getElementById("back-to-top");

if (mybutton) {
  window.onscroll = function () {
    scrollFunction();
  };
}

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    console.log(document.body.scrollTop);
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Contact form

function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var comments = document.forms["myForm"]["comments"].value;
  var errorMsg = document.getElementById("error-msg");
  if (errorMsg) {
    errorMsg.style.opacity = 0;
    errorMsg.innerHTML = "";
  }
  if (name == "" || name == null) {
    if (errorMsg) {
      errorMsg.innerHTML =
        "<div class='alert alert-danger error_message text-center'>Please enter a Name</div>";
      fadeIn(errorMsg);
    }
    return false;
  }
  if (email == "" || email == null) {
    if (errorMsg) {
      errorMsg.innerHTML =
        "<div class='alert alert-danger error_message text-center'>Please enter an Email</div>";
      fadeIn(errorMsg);
    }
    return false;
  }

  if (comments == "" || comments == null) {
    if (errorMsg) {
      errorMsg.innerHTML =
        "<div class='alert alert-danger error_message text-center'>Please enter Comments</div>";
      fadeIn(errorMsg);
    }
    return false;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var simpleMsg = document.getElementById("simple-msg");
      if (simpleMsg) {
        simpleMsg.innerHTML = this.responseText;
      }
      document.forms["myForm"]["name"].value = "";
      document.forms["myForm"]["email"].value = "";
      document.forms["myForm"]["subject"].value = "";
      document.forms["myForm"]["comments"].value = "";
    }
  };
  xhttp.open("POST", "php/contact.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name=" + name + "&email=" + email + "&comments=" + comments);
  return false;
}

function fadeIn(element) {
  var opacity = 0;
  var intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity = opacity + 0.5;
      element.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 200);
}
