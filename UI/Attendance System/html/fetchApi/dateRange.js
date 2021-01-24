$(function() {

    $( ".tog" ).hide();
    $(document).on('click', '#sign_out', function() {
        localStorage.clear()
    });

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('YYYY-MM-D') + ' - ' + end.format('YYYY-MM-D'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});


$(document).on('click', '#clock_in', function() {
    event.preventDefault();
    $( "#loading_filter" ).show();
    const token = JSON.parse(localStorage.getItem('authToken'));
            fetch(
             `https://ems-employee-management-system.herokuapp.com/api/v1/clock-in`, {
              method: 'PATCH',
              headers: {
                "Content-Type": 'application/json', 
                  "Authorization": token
                },
            })
                .then(res => res.json())
                .then(response => {
                  console.log(response)
                  if (response.status === 200) {
                      $('.tm').html(`Your clock in time for today is `);
                      $('.tm').css('color', 'green');
                      $( "#loading_filter" ).hide();
                      $('.tm').show();
                    setTimeout(() => {
                        $('.tm').hide();
                }, 4000);
				window.location = "../html/dashboard-3.html";
                
                    } else {
                        $('.tm').html(`${response.error}`);
                        $('.tm').css('color', 'red');
                        $( "#loading_filter" ).hide();
                        $('.tm').show();
                      setTimeout(() => {
                          $('.tm').hide();
                  }, 4000);
				// window.location = "../html/dashboard-3.html";
                    }
                })
                .catch(error => console.log(error.message));
        
  
});
$(document).on('click', '#clock_out', function() {
    event.preventDefault();
    $( "#loading_filter" ).show();
    const token = JSON.parse(localStorage.getItem('authToken'));
            fetch(
             `https://ems-employee-management-system.herokuapp.com/api/v1/update`, {
              method: 'PATCH',
              headers: {
                "Content-Type": 'application/json', 
                  "Authorization": token
                },
            })
                .then(res => res.json())
                .then(response => {
                  console.log(response)
                  if (response.status === 200) {
                      $('.tm').html(`Your have clocked out for the day`);
                      $('.tm').css('color', 'green');
                      $( "#loading_filter" ).hide();
                      $('.tm').show();
                    setTimeout(() => {
                        $('.tm').hide();
                }, 4000);
				window.location = "../html/dashboard-3.html";
                
                    } else {
                        $('.tm').html(`${response.error}`);
                        $('.tm').css('color', 'red');
                        $( "#loading_filter" ).hide();
                        $('.tm').show();
                      setTimeout(() => {
                          $('.tm').hide();
                  }, 4000);
				// window.location = "../html/dashboard-3.html";
                    }
                })
                .catch(error => console.log(error.message));
        
  
    
});



