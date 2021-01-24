$(document).on('ready', function() {
    var admin = localStorage.getItem('admin')
    if (!is_loggedin || !admin) {
        // window.location.href = '../html/sign-in.html';
        alert('Access denied')
        }else{

                const token = JSON.parse(localStorage.getItem('adminToken'));
              fetch(
               "https://ems-employee-management-system.herokuapp.com/api/v1/admin/admins", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                  },
              })
              .then(response => response.json())
              .then(data => {
              console.log(data)
              localStorage.setItem('total_admins', `${data.length}`)
                  
                //   $('#adm').html(`${data.length}`)
                //   $('#pagination').twbsPagination('destroy');
                //   load("");
              })
              
              .catch(error => console.log(error.message));
              event.preventDefault();

              fetch(
                "https://ems-employee-management-system.herokuapp.com/api/v1/admin/users", {
                 method: 'GET',
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": token
                   },
               })
               .then(response => response.json())
               .then(data => {
               console.log(data)
                   
              localStorage.setItem('total_users', `${data.length}`)
                  
               })
               
               .catch(error => console.log(error.message));
               event.preventDefault();
          
        }
})
$(document).ready(function() {
    $('#pagination').twbsPagination('destroy');
    load("");
})

$(document).on('click', '#go', function() {
    $('#pagination').hide()
    $('#pagination_').twbsPagination('destroy');
    filter("");
    });
    $(document).on('click', '#fil', function() {
        // $(".no_rec_table").hide();
        // $(".filter_table").hide();
        $( ".tog" ).toggle();
    });

    function download(){
        // e.preventDefault();
        // $( "#loading_filter" ).show();
        const token = JSON.parse(localStorage.getItem('adminToken'));
                fetch(
                 `http://localhost:5000/api/v1/csv`, {
                  method: 'GET',
                  headers: {
                    "Content-Type": 'application/json', 
                      "Authorization": token
                    },
                })
                    .then(res => res.json())
                    .then(response => {
                      console.log(response)
                      if(response){
                          $('#csv').attr('href', response)
                      }
                      else{
                          alert('error')
                      }
                        
                    })
    
                    .catch(error => console.log(error.message));
        // e.preventDefault();
    }

const is_loggedin = localStorage.getItem('is_loggedin');
const profile_picture = document.querySelector('.user-profile');
const prof = document.querySelector('.user_name');
const department = document.querySelector('.department');
const clock_in_time = document.querySelector('.clock-in');
const top_nav = document.querySelector('.top_nav');
const top_im = document.querySelector('.top_im');
const top_nam = document.querySelector('.top_nam');
const go = document.querySelector('#go');


// const token = localStorage.getItem('authToken');


function filter(page){
    if (page == "") {
        var page = 1;
    }
    var limit = 7;
    const token = JSON.parse(localStorage.getItem('adminToken'));
    var start = $('#reportrange').data('daterangepicker').startDate._d;
    var end = $('#reportrange').data('daterangepicker').endDate._d;
    // const startDate = document.querySelector('#reportrange span');
    var startDat = moment(start).format('YYYY-MM-D');
    var endDat = moment(end).format('YYYY-MM-D');
    var email = document.querySelector('#mail').value;
    var depart = document.querySelector('#depart').value;

    var starting = document.querySelector('#starting');
    var ending = document.querySelector('#ending');

    // ending.setAttribute('value',`${endDat}`);
    // starting.setAttribute('value',`${startDat}`);
    // // console.log(starting);
    // console.log(ending.value);
    // console.log(starting.value);


    $("#loading_filter").show();
    
    
    fetch(
     "https://ems-employee-management-system.herokuapp.com/api/v1/admin/filter-date", {
      method: 'POST',
      headers: {
		  "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ startDate: startDat, endDate:endDat, email: email, department: depart, limit: limit, page: page
        })
    })

    .then(response => response.json())
    .then(data => {
        console.log(data);
        var add_tab = ""
        if (data.records.length > 0) {
            data.records.map((table) => {
            table.clock_out_time == undefined || 'undefined' ? "Not Available":clock_out_time;
            console.log(table.clock_out_time)

            const {
              name,email,mac_address,department,date,clock_in_time, clock_out_time
            } = table;
        document.querySelector(".history_tab").style.display = 'none';

        add_tab+=`<tr>
        <td>${email}</td>
        <td>${mac_address}</td>
        <td>${department}</td>
        <td>${clock_in_time}</td>
        <td>${clock_out_time == undefined ? 'Not Available': clock_out_time}</td>
        <td>${date}</td>`
        
        $('.filter').html(add_tab);
        $('#pagination_').twbsPagination({
            totalPages: data.totalPages,
            visiblePages: 10,
            initiateStartPageClick: false,
            onPageClick: function(event, page) {
            filter(page);
            return;
            }
        
        });
        $("#loading_filter").hide();
        $(".no_rec_table").hide();
        $(".filter_table").show();
    })
} else {
    $("#loading_filter").hide();
    $(".history_tab").hide();
    $(".filter_table").hide();
    $(".no_rec_table").show();
}
})
}


window.onload = () => {
    
    if (page == "") {
        var page = 1;
    }
    var limit = 7;
    
        const token = JSON.parse(localStorage.getItem('adminToken'));
        const total_admins = localStorage.getItem('total_admins');
        const total_users = localStorage.getItem('total_users');
        console.log(total_users)
        console.log(total_admins)


        $('#adm').html(total_admins);
        $('#emp').html(total_users);


    fetch(
     "https://ems-employee-management-system.herokuapp.com/api/v1/admin/history", {
      method: 'POST',
      headers: {
		  "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ page: page, limit: limit})
    })

    .then(response => response.json())
    .then(data => {
        var add_tab = ""


        console.log(data)
        const div = document.createElement('div');
        const profile = localStorage.getItem('avatar');
        const h3 = document.createElement('h3');
        const clock_in_h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const top_img = document.createElement('img');
        const profile_name = localStorage.getItem('name');
        const depart = localStorage.getItem('department');
        const clock_in = localStorage.getItem('clock_in_time');

        // top_img.innerHTML = `<img src="${profile}" class="img-fluid rounded mr-3" alt="user"
        // style="width:100%">`
        top_im.setAttribute('src', `${profile}`);
        top_nam.textContent = `${profile_name}` ;


        // profile_picture.appendChild('img');
        div.innerHTML =`<div class="mySlides2">
        <img src="${profile}" alt="Nature" class="responsive" style="display:flex; justify-content:'center';
        margin-left:'auto'; margin-right:'auto'; border-radius:100px;">
        </div>`
        h4.innerHTML = `<b>${profile_name}</b>`;
        // h3.innerHTML = `${depart}`;
        // clock_in_h3.innerHTML = `${clock_in}`;
        // console.log(`${clock_in}`.toLocaleDateString())

        prof.appendChild(h4);
        profile_picture.appendChild(div);
        department.appendChild(h3);
        clock_in_time.appendChild(clock_in_h3);
        console.log(data.adminrecords)


        if (data.adminrecords.length > 0) {
            data.adminrecords.map((table) => {
            // table.clock_out_time == undefined || 'undefined' ? "Not Available":clock_out_time;
            // console.log(table.clock_out_time)

            // const {
            //   name,email,mac_address,department,date,clock_in_time, clock_out_time,
            // } = table;
            // const tr = document.querySelector('#history');
            // const table_row = document.createElement('tr')
            // const user_name =document.createElement('td');
            // const user_email =document.createElement('td');
            // const user_mac =document.createElement('td');
            // const user_department =document.createElement('td');
            // const user_date=document.createElement('td');
            // const user_clock_in=document.createElement('td');
            // const user_clock_out=document.createElement('td');

            // console.log(name);
            // user_name.innerHTML= name;
            // user_email.innerHTML= email;
            // user_mac.innerHTML= mac_address;
            // user_department.innerHTML= department;
            // user_date.innerHTML= date;
            // user_clock_in.innerHTML= clock_in_time;
            // user_clock_out.innerHTML = clock_out_time == undefined || 'undefined' ? '------':clock_out_time;
            

            // table_row.append(user_email,user_mac, user_department, user_clock_in, user_clock_out, user_date);
            // tr.appendChild(table_row);
            // console.log(data.totalPages);

            table.clock_out_time == undefined || 'undefined' ? "Not Available":clock_out_time;
            console.log(table.clock_out_time)

            const {
              name,email,mac_address,department,date,clock_in_time, clock_out_time
            } = table;
        document.querySelector(".filter_table").style.display = 'none';

        add_tab+=`<tr>
                            <td>${email}</td>
                            <td>${mac_address}</td>
                            <td>${department}</td>
                            <td>${clock_in_time}</td>
                            <td>${clock_out_time == undefined ? 'Not Available': clock_out_time}</td>
                            <td>${date}</td>
                            `
        
        $('#history').html(add_tab);
        $("#loading_filter").hide();
        $("#history").show();
            

        })
   
    }
    
    
    $('#pagination').twbsPagination('destroy');
    load("");

            })
        .catch(error => console.log(error.message));
    // event.preventDefault();

    
 
}
function load(page){
    if (page == "") {
        var page = 1;
    }
    var limit = 7;

    $("#loading_filter").show();

    
        const token = JSON.parse(localStorage.getItem('adminToken'));
    fetch(
     "https://ems-employee-management-system.herokuapp.com/api/v1/admin/history", {
      method: 'POST',
      headers: {
		  "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ page: page, limit: limit
        })
    })

    .then(response => response.json())
    .then(data => {
        var add_tab = ""


        if (data.adminrecords.length > 0) {
            data.adminrecords.map((table) => {
            table.clock_out_time == undefined || 'undefined' ? "Not Available":clock_out_time;
            console.log(table.clock_out_time)

            const {
              name,email,mac_address,department,date,clock_in_time, clock_out_time
            } = table;
        document.querySelector(".filter_table").style.display = 'none';

        add_tab+=`<tr>
                            <td>${email}</td>
                            <td>${mac_address}</td>
                            <td>${department}</td>
                            <td>${clock_in_time}</td>
                            <td>${clock_out_time == undefined ? 'Not Available': clock_out_time}</td>
                            <td>${date}</td>
                            `
        
        $('#history').html(add_tab);
        $("#loading_filter").hide();
        $('#pagination').twbsPagination({
            totalPages: data.totalPages,
            visiblePages: 10,
            initiateStartPageClick: false,
            onPageClick: function(event, page) {
            load(page);
            return;
            }
        
        });
        $("#history").show();
            

        

    })
}

    })

        .catch(error => console.log(error.message));
    event.preventDefault();
}

