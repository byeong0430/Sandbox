## Google IP Finder
There are mainly 3 processes involved in the Google IP Finder tab.
1. Signup
    
    As you click on "Google ID Finder" on the top nav, a login window will be displayed by default. You can show the signup window by clicking on the "Signup" button on the top nav bar. The js code below displays only one of the login OR signup windows:
    ```
    //Show signup page
    $("#" + signup_btn).on("click", function(event){
        event.preventDefault(); //preventDefault() stops clicked anchors from taking the browser to a new URL

        //Check if the signup window is visible
        var signup_wrapper_visible = $("#" + signup_wrapper + ":visible").length;
        if (signup_wrapper_visible == 0){
            $("#" + signup_wrapper).show("fast"); //Show signup div
            $("#" + login_wrapper).hide("fast"); //Hide login div
        }else{
            $("#" + signup_wrapper).hide("fast"); //Hide signup div
        }
    })
    ```
    
    There are 4 mandatory input fields in the signup form in order to complete the signup process:
    1. Email
    2. Password
    3. Self-employment Questionaire (radio button)
        - If "Yes" is selected, 'Sole Proprietorship' will be added to **`businessName`** input field as its value. 
        - If "No" is selected, empty **`businessName`** input field will be displayed. You must specify your own business name.
        ```
        //Radio button for self-employment question
        $("." + signup_radio).on("click", function(){
            var radio1_business = "Sole Proprietorship"; //Business name if "Yes" is selected

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
        ```
    4. Agree to terms and conditions
    
    Once you click on the submit button, the following js code will be executed ([Original code from Bootstrap](https://getbootstrap.com/docs/4.0/components/forms/#custom-styles))
    ```
    //Validate the signup form and submit it
    function validSignup_submit(form){
        var resultJSON = {};
        var signup_form = "signup-form";
        var url = 'py/signup.py';

        //Save the form results as json object
        var form_result = $("#" + signup_form).serializeArray();
        $.each(form_result, function(){
            resultJSON[this.name] = this.value;
        })

        //This will display error messages if there are any
        form.classList.add('was-validated');
        
        //form.checkValidity() is true only when all REQUIRED form fields were filled out.
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'text', //type of data to be returned
                data: resultJSON,
                success: function(response){
                    if(response == 1){
                        after_signup();
                    }
                },
                error: function(request, status, error){
                    console.log(error);
                }
            });
            event.preventDefault();
            event.stopPropagation();
        }
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
                    validSignup_submit(form);
                }, false);
            });
        }, false);
    })();
    ```

    ###### Note
    1. In order enable the Bootstrap form validation, you must set form class as "needs-validation" and include **`novalidation`** tag (example below):
    ```
    <form class="needs-validation" id="signup-form" novalidate>
    ```
    2. All required input fields must contain **`required`** tag
    ```
    <input type="email" name="input_email" class="form-control" id="validationCustomUsername" placeholder="Email" aria-describedby="inputGroupPrepend" required>
    ```
    
    
    