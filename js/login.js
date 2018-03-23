/* Log in */
var topnav_signup_btn = "topnav-signup-btn";
var topnav_login_btn = "topnav-login-btn";
var topnav_logout_btn = "topnav-logout-btn";

var login_submit_btn = "login-submit-btn";
var login_wrapper = "login-wrapper";
var signup_wrapper = "signup-wrapper";
var consent_wrapper = "consent-detail-wrapper";


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


$("#" + login_submit_btn).on("click", function(event){
    var resultJSON = {};
    var login_form = "login-form";

    var login_result = $("#" + login_form).serializeArray();
    $.each(login_result, function(){
        resultJSON[this.name] = this.value;
    })

    //do your own request an handle the results
    $.ajax({
        url: "py/login.py",
        type: 'post',
        dataType: 'text',
        data: login_result,
        success: function(response) {
            if (response == 1){ //True: email and password match what's stored
                $("#" + login_wrapper).hide("fast");
                $("#" + consent_wrapper).show("fast");
                $("#" + topnav_signup_btn).hide("fast");
                $("#" + topnav_login_btn).hide("fast");
                $("#" + topnav_logout_btn).show("fast");
            }
        },
        error: function(request, status, error){
            console.log(error);
        }
    });
    
    //prevent Default functionality
    event.preventDefault();
    event.stopPropagation();
});