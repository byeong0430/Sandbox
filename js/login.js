/* Log in */
var login_btn = "topnav-login-btn";
var login_wrapper = "login-wrapper";

$("#" + login_btn).on("click", function(){
    var wrapper_visible = $("#" + login_wrapper + ":visible").length;
    
    if (wrapper_visible == 0){
        $("#" + login_wrapper).show("fast");
    }else{
        $("#" + login_wrapper).hide("fast");
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