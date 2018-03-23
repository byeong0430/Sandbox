// This sample uses the Place Autocomplete widget to allow the user to search
// for and select a place. The sample then displays an info window containing
// the place ID and other information about the place that the user has
// selected.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

//Check if any of given multiple values exist within an array
function containsAll(needles, haystack){ 
    for(var i = 0 , len = needles.length; i < len; i++){
       if($.inArray(needles[i], haystack) != -1) return true;
    }
    return false;
}


function create_btn(type, size, id, text){
    var btn = '<button type="button" class="btn ' + type + ' ' + size + '" id="' + id + '">' + text + '</button>';
    return btn;
}


function savebtn_click(button_id){
    //Function when the button is clicked
    $("body").on("click", "#" + button_id, function(){
        //get all tds' ids
        var allTD = $(".location-td:not(:empty)");
        var removeTD = "remove-td";
        var places = {}; //Empty object to create json
        var maptitleID = "map-title";
        var newTitle = "Registration Successful! Thank you!";

        for (var i = 0; i < allTD.length; i++){
            //Remove "tr-" from each tr id and push it to empty array placeID
            eachID = $(allTD[i]).attr("id").replace('td-', '');
            eachName = $(allTD[i]).attr("name");

            places["loc_" + i] = {"name":eachName, "placeid":eachID}; //Save the place names and ids in json form
        }
        
        //Update Google Maps with the locations
        updateMap(places);

        //Hide all remove icons and save button
        $("." + removeTD).hide();
        $("#" + button_id).hide();

        //Change the map title to "Registration Complete!"
        $("#" + maptitleID).text(newTitle);


        //Compile a full set of data to send to python via ajax
        var postData = {
            "accountID": 1,
            "places": places
        };

        //console.log(postData);

        $.ajax({
            url: 'py/insert_placeID.py',
            type: 'post',
            dataType: 'text', //type of data to be RETURNED
            data: postData,
            success: function(response) {
                console.log(response);
            },
            error: function (request, status, error) {
                console.log(error);
            }
        });
    });
}

savebtn_click("submit-btn");


function add_submitBttn(){
    //Get all non-empty tr elements
    var filledTR = document.querySelectorAll(".location-tr:not(:empty)");
    var host = "progressbar-wrapper";
    var savebtn_id = "submit-btn";

    //If there is at least 1 non-empty row and a button hasn't been created, add a save button
    if (filledTR.length > 0 && $("#" + savebtn_id).length == 0){
        //Create a button
        var btn = create_btn("btn-primary", "btn-md", savebtn_id, "Save");
        
        $("#" + host).append(btn);
    //If there is no filledup row and there is already a button, remove that button
    }else if (filledTR.length == 0 && $("#" + savebtn_id).length > 0){
        $("#" + savebtn_id).remove();
    }
}


function drag_drop(content, dragItem_id, dropTarget_id){
    var garbage_icon = '<i class="fas fa-trash-alt fa-2x"></i>';

    $("#" + dragItem_id).draggable({
        appendTo: 'body',
        helper: 'clone'
    });
    
    $("#td-" + dropTarget_id).droppable({
        activate: function(event, ui) {
            $(this).css({
                "box-shadow": "3px 3px 15px #666",
                "background-color": "#fff",
            });
        },
        deactivate: function(event, ui) {
            $(this).css({
                "box-shadow": "none",
                "background-color": "none",
            });

            /* 
            After a draggable is successfully dropped, disable the droppable option for the current droppable.
            Otherwise in subsequent incidents, all rows will be droppable. 
            */
            if ($(this).html().length > 0){
                $(this).droppable("option", "disabled", true);
            }
        },
        drop: function(event, ui) {
            $(this).html(content); //Append the address to the target td
            
            //Also if is only one td in tr, add a rubbish bin icon
            if ($("#tr-" + dropTarget_id).children("td").length == 1){
                var garbage_td = '<td class="remove-td" id="remove-' + dropTarget_id + '">' + garbage_icon + '</td>';
                
                $("#tr-" + dropTarget_id).
                find("td:last").
                after(garbage_td);
            }
            
            add_submitBttn();
        }
    });
}


//Create an initial map
function create_iniMap(){
    //Initial map center point
    var ini_center = {lat: 49.2827, lng: -123.1207};
    var ini_zoom = 13;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: ini_center,
        zoom: ini_zoom
    });

    return map;
}


function initMap() {    
    map = create_iniMap();

    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function() {
        //Every time a new location is searched, an empty row is created to host address info
        //If a new search is executed WITHOUT your previous address being saved in the progress bar table, remove that empty row.
        var droptbody_class = "drop-tbody";
        $("." + droptbody_class + " td:empty").remove();
        
        infowindow.close(); //Close the infowindow every time a new search is executed
        var place = autocomplete.getPlace();
        
        /*
        Ultimately we want to get a place ID uniquely associated with 
        a business establishment rather than geographic locations, so it is important to 
        disable street address searching!
        Check if place.types contains "street_address". If it does, checkProhibitType is >= 0
        */
        var prohibitType = ["street_address", "premise"];
        var checkProhibitType = containsAll(prohibitType, place.types);
        
        //If you type a non-existing address, stop the code
        if (!place.geometry) {
            return;
        }else if (checkProhibitType) { 
            //If place.types contains any item in prohibitType, create an alert message.
            alert("Please enter your business name, not address!");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        // Set the position of the marker using the place ID and location.
        marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location
        });
        marker.setVisible(true);
        
        infowindowContent.children['place-name'].textContent = place.name;
        //infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children['place-address'].textContent = place.formatted_address;
        infowindow.open(map, marker);
        

        //Create an id for an empty row for the searched address using the unique place id
        var content = place.formatted_address; //Address
        var dragItem_id = "drag-badge";
        var placeName = place.name;
        var dropTarget_id = place.place_id;

        var appendRow = '<tr class="location-tr" id="tr-' + dropTarget_id + '">'
            appendRow += '<td class="location-td" name="' + placeName + '" id="td-' + dropTarget_id + '"></td></tr>';

        $("." + droptbody_class).append(appendRow);

        //Execute drag and drop function
        drag_drop(content, dragItem_id, dropTarget_id);

        //If the bin icon is clicked, remove the whole tr which the icon belongs to
        $('body').on('click', ".remove-td", function(){
            //Selected row id
            var selected_rowID = $(this).closest("tr").attr("id");
            
            //Remove the selected row
            $("#" + selected_rowID).remove();
            
            add_submitBttn();

            //If the removed row's id was for saving the current location, re-create the row again            
            if (selected_rowID == "tr-" + dropTarget_id){
                $("." + droptbody_class).append(appendRow);

                drag_drop(content, dragItem_id, dropTarget_id);
            }
        });

    });
    
}


function updateMap(places) {
    //create empty LatLngBounds object
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();  
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    map = create_iniMap();

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    
    //Loop through each of the selected places and place it on the map
    $.each(places, function(i, el){
        service.getDetails({
            placeId: el.placeid
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location, //lat, lng
                    label: labels[labelIndex++ % labels.length]
                });

                //extend the bounds to include each marker's position
                bounds.extend(marker.position);

                var detail = 
                '<div><strong>' + place.name + '</strong><br>' +
                place.formatted_address + '</div>';

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(detail);
                    infowindow.open(map, this);
                });
                
                map.fitBounds(bounds);
                //If only one location is selected map.fitBounds(bounds) will zoom in to that location too much.
                //In this case, set the manual zoom to 12
                var placeLength = Object.keys(places).length;
                if (placeLength == 1) {map.setZoom(12)};
                map.panToBounds(bounds); //auto-center
            }
        });
    });
        
}
