$(function() {
    $map = $('.map');
    console.log(L);
    L.mapbox.accessToken = 'pk.eyJ1Ijoic2Fib3YiLCJhIjoiN2ZfYTFNZyJ9.NMb6Hc8OwHRiHDPMjbzZGg';
    var layer = L.mapbox.map($map.get(0), 'examples.map-zr0njcqy');
});
