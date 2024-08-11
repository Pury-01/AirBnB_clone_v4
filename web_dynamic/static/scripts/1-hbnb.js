$(document).ready(function() {
        const selectedAmenities = {};

        $('input[type="checkbox"]').change(function() {
                const amenityId = $(this).data('id');
                const amenityName = $(this).data('name');

                if ($(this).is(':checked')) {
                        selectedAmenities[amenityId] = amenityName;
                } else {
                        delete selectedAmentites[amenityId];
                }

                const amenitiesList = object.values(selectedAmenities).join(', ');
                $('.filters h4').text(amenitiesList);
        });
});
