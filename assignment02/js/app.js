$(function() {
    var $map = $('.map');
    var $body = $('body');
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2Fib3YiLCJhIjoiN2ZfYTFNZyJ9.NMb6Hc8OwHRiHDPMjbzZGg';

    var map = L.mapbox.map($map.get(0), 'examples.map-zr0njcqy');
    map.setView([38.91338, -77.03236], 16);

    showPosition = function(position) {
        console.log(position);
        pos = [position.coords.latitude, position.coords.longitude];
        map.panTo(pos);
        //L.marker(pos).addTo(map);
        L.mapbox.featureLayer({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: pos.reverse()
            },
            properties: {
                title: 'Peregrine Espresso',
                description: '1718 14th St NW, Washington, DC',
                'marker-size': 'large',
                'marker-color': '#3445E2',
                'marker-symbol': 'star'
            }
        }).addTo(map);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $body.html("Geolocation is not supported by this browser.");
    }

});
