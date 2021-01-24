$(document).ready(function() {
    // $("#loading").show();
    var avatar = localStorage.getItem('avatar');
    var name = localStorage.getItem('name');
    var departmen= localStorage.getItem('department');
    var marital_staus = localStorage.getItem('marital_status');
    var address = localStorage.getItem('address');
    var gender = localStorage.getItem('gender');
    
    document.querySelector('.prof-pic').setAttribute('src', `${avatar}`);
    document.querySelector('#fname').value = name;
    document.querySelector("#gender").value = gender;
    document.querySelector("#exampleFormControlSelect1").value = marital_staus;
    document.querySelector("#add").value = address;
    document.querySelector("#dname").value = departmen;
    
    // $("#loading").hide();
    })
    
    
    
    
    
    const edit_profile = () => {
    event.preventDefault();
        const token = JSON.parse(localStorage.getItem('adminToken'));
        const fname = document.querySelector("#fname").value;
        const gender = document.querySelector("#gender").value;
        const marital_staus = document.querySelector("#exampleFormControlSelect1").value;
        const address = document.querySelector("#add").value;
        const dment = document.querySelector("#dname").value
    
        $("#loading_edit1").show();
    
        
        fetch(
         `https://ems-employee-management-system.herokuapp.com/api/v1/admin/edit-profile`, {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json', 
              "Authorization": token
            },
            body: JSON.stringify({ name: fname, department: dment, gender: gender, marital_staus: marital_staus, address: address })
            
        })
            .then(res => res.json())
            .then(response => {
              console.log(response)
            //   if (response.status === 200) {
                const profile = response;
                const {
                  name,department,gender,marital_staus,address
                } = profile;
                    localStorage.setItem("name", name);
                    localStorage.setItem("department", department);     
                    localStorage.setItem("gender", gender);     
                    localStorage.setItem("marital_status", marital_staus); 
                    localStorage.setItem("address", address);     
    
                        // }
        $("#loading_edit1").hide();
        $("#loading_success").show();
        setTimeout(() => {
            $("#loading_success").hide();
        }, 3000);
    
    
                      })
                      
            .catch(error => console.log(error.message));
    
        };
    
        const change_password = () => {
            event.preventDefault();
                const token = JSON.parse(localStorage.getItem('adminToken'));
                const pass = document.querySelector("#cpass").value;
                const newpass = document.querySelector("#npass").value;
                const vpass = document.querySelector("#vpass").value;
                const loginError = document.querySelector(".login-error");
    
                $("#loading_edit").show();
    
    
                if(newpass !== vpass){
                    alert('Mismatched password');
                    return
                }
    
                
                fetch(
                 `https://ems-employee-management-system.herokuapp.com/api/v1/admin/change-password`, {
                  method: 'PATCH',
                  headers: {
                    "Content-Type": 'application/json', 
                      "Authorization": token
                    },
                    body: JSON.stringify({ password: pass, new_password: newpass})
                    
                })
                    .then(res => res.json())
                    .then(response => {
                      console.log(response)
                      if (response.status === 200) {
                         $("#loading_edit").hide();
                          document.querySelector('.pc').style.display = 'block';
                          setTimeout(() => {
                            document.querySelector('.pc').style.display = 'none';
                        }, 3000);
                        } else {
                           $("#loading_edit").hide();
                            loginError.innerHTML = response.error;
                            loginError.style.display = "block";
                    setTimeout(() => {
                        loginError.style.display = "none";
                    }, 3000);
                            
                        }
                    })
                    .catch(error => console.log(error.message));
            
                };
    
