/* Log in */
var login_btn = "topnav-login-btn";
var login_wrapper = "login-wrapper";
var signup_wrapper = "signup-wrapper";

$("#" + login_btn).on("click", function(event){
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


function login_submit(){
    $("#login-form").submit(function(e){
        //prevent Default functionality
        e.preventDefault();

        //get the action-url of the form
        var actionurl = e.currentTarget.action;
        console.log($("#login-form").serialize());
        //do your own request an handle the results
        $.ajax({
            url: actionurl,
            type: 'post',
            dataType: 'application/json',
            data: $("#login-form").serialize(),
            success: function(data) {
                console.log(data);
            }
        });
    });
}