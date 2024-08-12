$(document).ready(function() {
    // Existing Amenity checkbox code from 1-hbnb.js remains here

    // API Status Check
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
