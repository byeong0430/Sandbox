/* 
When a checkbox is ticked off, display a new div under the consent form
*/

var checkbox = "consent-checkbox";
var placefinder_wrapper = "placefinder-wrapper";

$("#" + checkbox).on("change", function(){
    var check = $("#" + checkbox).prop('checked');

    if (check == true){
        $("#" + placefinder_wrapper).show();
    }else{
        $("#" + placefinder_wrapper).hide();
    }
})
