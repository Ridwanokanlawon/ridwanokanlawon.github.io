const signin = document.querySelector(".signin");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const loginError = document.querySelector(".login-error");

$(document).on('click', '#sign_in', function() {
	$(this).hide();
	$('#loading_filter').show();
    });

signin.addEventListener("submit", event => {
    fetch(
    "https://ems-employee-management-system.herokuapp.com/api/v1/user/signin", {
        method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
        body: JSON.stringify({ email:email.value,
          password: password.value})
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data.status == 200) {
			
     
		  console.log(data);
		  console.log(data.clock_in_time)
		  console.log(data.user)

		  
				localStorage.setItem("authToken", JSON.stringify(data.token));
				localStorage.setItem('is_loggedin', true);
				localStorage.setItem("name", data.user.name);
                localStorage.setItem("email", data.user.email);
				localStorage.setItem("avatar", data.user.avatar);
				localStorage.setItem("mac_address", data.user.mac_address);
				localStorage.setItem("department", data.user.department);
                localStorage.setItem("clock_in_time", data.clock_in_time);
				
				window.location = "../html/dashboard-3.html";
       
			
		 } else {
			$('#loading_filter').hide();
			$('#sign_in').show();
			loginError.innerHTML = data.error;
			loginError.style.display = "block";

				setTimeout(() => {
					loginError.style.display = "none";
				}, 3000);
                // console.log(data);
				// localStorage.setItem("authToken", JSON.stringify(data.token));
                // // localStorage.setItem("admin", data.admin);
				// window.location = "../dashboard-1.html";
			}
			})
		.catch(error => console.log(error.message));
	event.preventDefault();
});
