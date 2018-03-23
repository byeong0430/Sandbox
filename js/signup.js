/* Sign up */
var login_wrapper = "login-wrapper";
var signup_btn = "topnav-signup-btn";
var signup_wrapper = "signup-wrapper";
var signup_radio = "signup-radio";
var businessName_holder = "businessName-holder";
var businessName_inputID = "businessName";


//Show signup page
$("#" + signup_btn).on("click", function(event){
    event.preventDefault(); //Button click refreshes the whole website by default. Disable that

    var signup_wrapper_visible = $("#" + signup_wrapper + ":visible").length;
    
    //If the sign-in div doesn't exist
    if (signup_wrapper_visible == 0){
        $("#" + signup_wrapper).show("fast"); //Show signup div
        $("#" + login_wrapper).hide("fast"); //Hide login div
    }else{
        $("#" + signup_wrapper).hide("fast"); //Hide signup div
    }
})


//Radio button for self-employment question
$("." + signup_radio).on("click", function(){
    var radio1_business = "Sole Proprietorship";

    $("." + signup_radio).prop('checked', false); //Uncheck all radio buttons
    $(this).prop('checked', true); //Check the one you selected

    var radio_val = $(this).val(); //1: yes 2: no
    if (radio_val == 2){
        $("#" + businessName_inputID).val(""); 
        $("#" + businessName_holder).show("fast");
    }else{
        $("#" + businessName_inputID).val(radio1_business) //If "yes" radio button is selected, add "Sole Proprietorship" to business name input
        $("#" + businessName_holder).hide("fast");
    }
});


//Events after signup is successful
function after_signup(){
    var wait_t = 2000; //2 seconds
    var tab_row = "placefinder";
    var signup_wrapper = "signup-wrapper";
    var login_wrapper = "login-wrapper";
    var signup_success_p = "signup-success-p";
    var signup_success = 
    '<div class="row" id="' + signup_success_p + '" style="display: none;"><div class="col-12 inner-shell"><p><h3>Signup Successful!</h3></p></div></div>';

    $("#" + signup_wrapper).hide("fast"); //Hide the signup section
    $("#" + tab_row).append(signup_success); //Append the hidden signup success window
    $("#" + signup_success_p).show("fast"); //Show the signup success window in animation

    //2 Seconds later
    setTimeout(function(signup_wrapper){
        $("#" + signup_success_p).hide("fast"); //Hide the signup success window in animation
        $("#" + signup_success_p).remove(); //Remove the signup success window
        //location.reload();
        $("#" + login_wrapper).show("fast"); //Display the login section
    }, wait_t);
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                var resultJSON = {};
                var signup_form = "signup-form";
                var radio_val = $("." + signup_radio + ":checked").val();
                var consent_check = $("#" + "invalidCheck" + ":checked");

                //Save the form results as json object
                var form_result = $("#" + signup_form).serializeArray();
                $.each(form_result, function(){
                    resultJSON[this.name] = this.value;
                })
                
                //If the form is incomplete, stop the button's default action
                if (resultJSON.input_email.length * resultJSON.input_password.length  == 0 
                    || (radio_val == 2 && resultJSON.business_name.length == 0) || consent_check.length == 0){
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }else{
                    $.ajax({
                        url: 'py/signup.py',
                        type: 'post',
                        dataType: 'text', //type of data to be returned
                        data: resultJSON,
                        success: function(response){
                            after_signup();
                        },
                        error: function(request, status, error){
                            console.log(error);
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, false);
        });
    }, false);
})();





