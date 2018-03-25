/* Log in */
var topnav_signup_btn = "topnav-signup-btn";
var topnav_login_btn = "topnav-login-btn";
var topnav_logout_btn = "topnav-logout-btn";
var login_submit_btn = "login-submit-btn";
var login_wrapper = "login-wrapper";
var signup_wrapper = "signup-wrapper";
var consent_wrapper = "consent-detail-wrapper";


//Event when the login button on the top nav is clicked on
$("#" + topnav_login_btn).on("click", function(event){
    event.preventDefault(); //Button click refreshes the whole website by default. Disable that

    var login_wrapper_visible = $("#" + login_wrapper + ":visible").length;

    //If the log-in div doesn't exist
    if (login_wrapper_visible == 0){
        $("#" + login_wrapper).show("fast"); //Show login div
        $("#" + signup_wrapper).hide("fast"); //Hide login div
    }else{
        $("#" + login_wrapper).hide("fast"); //Hide login div
    }
})

//Action when login was successful
function login_success(response){
    var delim = ";";
    var span_id = "userid";

    match = response.split(delim)[0]; //1 for matching credentials, 0 for NOT matching credentials
    id = response.split(delim)[1]; //User id

    var id_container = '<input id="' + span_id + '" value="' + id + '" hidden></input>';

    if ($("#" + span_id).length == 0){
        $("body").append(id_container);
        //$("#" + span_id).hide();
    }else{
        $("#" + span_id).remove();
    }
    
    if (match == 1){ //True: email and password match what's stored
        $("#" + login_wrapper).hide("fast");
        $("#" + consent_wrapper).show("fast");
        $("#" + topnav_signup_btn).hide("fast");
        $("#" + topnav_login_btn).hide("fast");
        $("#" + topnav_logout_btn).show("fast");
    }
}


//Validate the login form and submit it
function validLogin_submit(form, login_result){
    form.classList.add('was-validated');
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }else{
        //do your own request an handle the results
        $.ajax({
            url: "py/login.py",
            type: 'post',
            dataType: 'text',
            data: login_result,
            success: function(response) {
                login_success(response);
            },
            error: function(request, status, error){
                console.log(error);
            }
        });
        
        //prevent Default functionality
        event.preventDefault();
        event.stopPropagation();
    }
}


//Event when the login button in the form is selected
$("#" + login_submit_btn).on("click", function(event){
    var resultJSON = {};
    var login_form = "login-form";
    var forms = document.getElementsByClassName('needs-validation');

    var login_result = $("#" + login_form).serializeArray();
    $.each(login_result, function(){
        resultJSON[this.name] = this.value;
    })

    var validation = Array.prototype.filter.call(forms, function(form) {
        validLogin_submit(form, login_result);
    }, false);
});