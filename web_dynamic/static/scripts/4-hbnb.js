$(document).ready(function() {
    const selectedAmenities = {};

    // Existing code for amenity checkboxes and API status check
    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        // Update the h4 with the selected amenities
        const amenityNames = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenityNames);
    });

    // Fetch Places
    function fetchPlaces(amenities = {}) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(amenities) }),
            success: function(data) {
                $('section.places').empty(); // Clear previous results
                data.forEach(place => {
                    const article = `<article>
                                        <div class="title">
                                            <h2>${place.name}</h2>
                                            <div class="price_by_night">
                                                $${place.price_by_night}
                                            </div>
                                        </div>
                                        <div class="information">
                                            <div class="max_guest">${place.max_guest} Guests</div>
                                            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                        </div>
                                        <div class="description">
                                            ${place.description}
                                        </div>
                                    </article>`;
                    $('section.places').append(article);
                });
            }
        });
    }

    // Initial load without any filters
    fetchPlaces();

    // Button click event for filtering places by amenities
    $('button').click(function() {
        fetchPlaces(selectedAmenities);
    });
});
