function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13
        });

        var source_input = document.getElementById('source-input');
        var dest_input = document.getElementById('dest-input');

        var sourcecomplete = new google.maps.places.Autocomplete(source_input);
        var destinationComplete = new google.maps.places.Autocomplete(dest_input);
        sourcecomplete.bindTo('bounds', map);
        destinationComplete.bindTo('bounds', map);

        var source_marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        var dest_marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        setMarker(sourcecomplete, source_marker, map);
        setMarker(destinationComplete, dest_marker, map);

}


function setMarker(addressType, marker, map) {
    addressType.addListener('place_changed', function() {
        //infowindow.close();
        marker.setVisible(false);
        var place = addressType.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          console.log(place.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }

        marker.setIcon({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        });
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

    });
}
initMap();

