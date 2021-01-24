const signup = document.querySelector(".login");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const name = document.querySelector(".admin_name");
const loginError = document.querySelector(".login-error");
$(document).on('click', '#signup', function() {
	$(this).hide();
	$('#loading_filter').show();
    });

signup.addEventListener("submit", event => {
    fetch(
    "https://ems-employee-management-system.herokuapp.com/api/v1/admin/signup", {
        method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
        body: JSON.stringify({ name: name.value, email:email.value,
          password: password.value})
	})
		.then(res => res.json())
		.then(data => {
            console.log(data);
      if (data.status !== 201) {
		$('#loading_filter').hide();
		$('#signup').show();
        loginError.innerHTML = data.error;
			loginError.style.display = "block";
				setTimeout(() => {
					loginError.style.display = "none";
				}, 3000);
			} else {
				console.log(data);
				
				window.location = "../html/sign-in.html";
			}
			})
		.catch(error => console.log(error.message));
	event.preventDefault();
});
