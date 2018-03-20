/* Sign up */
var login_wrapper = "login-wrapper";
var signup_btn = "topnav-signup-btn";
var signup_wrapper = "signup-wrapper";
var signup_radio = "signup-radio";
var businessName_holder = "businessName-holder";
var businessName_inputID = "businessName";
var signup_submit_btn = "signup-submit-btn";


//Radio button for self-employment question
$("." + signup_radio).on("click", function(){
    var radio_val = $("." + signup_radio + ":checked").val(); //1: yes 2: no
    radio_val == 2 ? 
    $("#" + businessName_holder).show("fast") : 
    $("#" + businessName_holder).hide("fast");
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            var submit_btn = document.getElementById(signup_submit_btn);

            //Create an event when you click on the submit button
            submit_btn.addEventListener('click', function(event) {
                var id = $("#" + "validationCustomUsername").val();
                var password = $("#" + "password").val();
                var radio_val = $("." + signup_radio + ":checked").val();
                var business = $("#" + businessName_inputID + ":visible").val();
                var consent_check = $("#" + "invalidCheck" + ":checked");
                
                //If the form is incomplete, stop the button's default action
                if (id.length * password.length  == 0 || (radio_val == 2 && business.length == 0) || consent_check.length == 0){
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }else{
                    var business = radio_val == 1 ? "Sole proprietorship" : $("#" + "businessName").val();
                    
                    $.ajax({
                        url: 'py/signup.py',
                        type: 'post',
                        dataType: 'text', //type of data to be returned
                        data: $("#" + "needs-validation").serialize(),
                        success: function(response){
                            console.log(response);
                        },
                        error: function(request, status, error){
                            console.log(error);
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
                    
                }

                form.classList.add('was-validated'); //Add 'was-validated' in the form's classname
            }, false);
        });
    }, false);
})();


//Show signup page
$("#" + signup_btn).on("click", function(event){
    event.preventDefault(); //Button click refreshes the whole website by default. Disable that

    var signup_wrapper_visible = $("#" + signup_wrapper + ":visible").length;
    
    //If the sign-in div doesn't exist
    if (signup_wrapper_visible == 0){
        $("#" + signup_wrapper).show("fast"); //Show signup div
        $("#" + login_wrapper).hide("fast"); //Hide login div
    }
})


