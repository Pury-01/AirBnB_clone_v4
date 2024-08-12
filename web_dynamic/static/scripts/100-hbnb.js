$(document).ready(function() {
    const selectedAmenities = {};
    const selectedStates = {};
    const selectedCities = {};

    // Handle Amenity Selection
    $('input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const type = $(this).closest('li').parent().hasClass('states') ? 'state' : $(this).closest('li').parent().hasClass('cities') ? 'city' : 'amenity';

        if (this.checked) {
            if (type === 'state') {
                selectedStates[id] = name;
            } else if (type === 'city') {
                selectedCities[id] = name;
            } else {
                selectedAmenities[id] = name;
            }
        } else {
            if (type === 'state') {
                delete selectedStates[id];
            } else if (type === 'city') {
                delete selectedCities[id];
            } else {
                delete selectedAmenities[id];
            }
        }

        updateLocationsDisplay();
    });

    function updateLocationsDisplay() {
        const locations = [...Object.values(selectedStates), ...Object.values(selectedCities)].join(', ');
        $('.locations h4').text(locations);
    }

    // Fetch Places with Filters
    function fetchPlaces(filters = {}) {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(filters),
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

    // Button click event for filtering places by amenities, states, and cities
    $('button').click(function() {
        const filters = {
            amenities: Object.keys(selectedAmenities),
            states: Object.keys(selectedStates),
            cities: Object.keys(selectedCities)
        };
        fetchPlaces(filters);
    });
});
