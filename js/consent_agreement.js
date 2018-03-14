/* 
When a checkbox is ticked off, hide the consent form and 
display a new div under the consent form
*/

var progressbar_wrapper = "progressbar-wrapper";

var consent_span = "consent-span";
var consent_checkbox = "consent-checkbox";
var consent_detail_wrapper = "consent-detail-wrapper";

var consent_question_class = "svg-inline--fa fa-question-circle fa-w-16 progress-icon fa-2x";
var consent_question_id = "consent-question-icon";
var consent_question_color = "#ff6961";

var thumbs_up_class = "svg-inline--fa fa-thumbs-up fa-w-16 progress-icon fa-2x";
var thumbs_up_id = "thumbs-up-icon";
var thumbs_up_color = "#218321";
var placefinder_wrapper = "placefinder-wrapper";

//When the checkbox is clicked
$("#" + consent_checkbox).on("click", function(){
    //Was the box checked?
    var check = $("#" + consent_checkbox).prop('checked');
    
    //If Checkbox is checked
    if (check == true){ 
        $("#" + consent_detail_wrapper).hide("fast"); //Hide the consent detail
        $("#" + progressbar_wrapper).show("fast") //Show progress bar
        $("#" + placefinder_wrapper).show("fast") //Show Google Maps
        
        //Change the question icon to thumbs up
        $("#" + consent_question_id).
        attr("class", thumbs_up_class).
        attr("id", thumbs_up_id).
        css("color", thumbs_up_color); 

    }
});

//When the thumbs-up icon is clicked
$('body').on("click", "." + consent_span, function(){
    $("#" + placefinder_wrapper).hide("fast"); //Hide Google Maps
    $("#" + progressbar_wrapper).hide("fast") //Show progress bar
    $("#" + consent_checkbox).prop('checked', false);
    $("#" + consent_detail_wrapper).show("fast"); //Show the consent detail     

    //Change the question icon to the initial question mark
    $("#" + thumbs_up_id).
    attr("class", consent_question_class).
    attr("id", consent_question_id).
    css("color", consent_question_color); 
});


