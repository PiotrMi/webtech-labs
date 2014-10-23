
var cinema = [
    [10,20],
    [11,21],
    [14,24],
    [17,25],
    [12,25]
];

function crateMarket(map, pos) {
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
            'marker-color': '#E44532',
            'marker-symbol': 'cinema'
        }
    }).addTo(map);

}


$(function() {
    var $map = $('.map');
    var $body = $('body');
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2Fib3YiLCJhIjoiN2ZfYTFNZyJ9.NMb6Hc8OwHRiHDPMjbzZGg';

    var map = L.mapbox.map($map.get(0), 'sabov.k1c8mj31');
    map.setZoom(14);

    showPosition = function(position) {
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
        cinema.forEach(function() {
            newPos = [pos[1] + _.random(-10,10)/1000, pos[0] + _.random(-10,10)/1000];
            crateMarket(map, newPos);
        });
        $('.loading').animate({opacity: 0}, 1000);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $body.html("Geolocation is not supported by this browser.");
    }

});
