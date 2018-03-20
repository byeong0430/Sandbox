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
                var radio_val = $("." + signup_radio + ":checked").val();
                var consent_check = $("#" + "invalidCheck" + ":checked");

                //Save the form results as json object
                var form_result = $('#signup-form').serializeArray();
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
                            console.log(response);
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





