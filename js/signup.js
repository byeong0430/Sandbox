// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

/* Sign up */
var signup_btn = "topnav-signup-btn";
var signup_wrapper = "signup-wrapper";
var signup_radio = "signup-radio";
var businessName_holder = "businessName-holder";


$("#" + signup_btn).on("click", function(){
    var wrapper_visible = $("#" + signup_wrapper + ":visible").length;
    
    if (wrapper_visible == 0){
        $("#" + signup_wrapper).show("fast");
    }else{
        $("#" + signup_wrapper).hide("fast");
    }
    
})

//Radio buttons
$("." + signup_radio).on("click", function(){
    var radio_check = $("#" + "radio-N").prop('checked');
    
    radio_check == true ? 
    $("#" + businessName_holder).show("fast") : 
    $("#" + businessName_holder).hide("fast");
})
