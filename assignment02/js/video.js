/**
 * Created by Tanmaya Mahapatra on 26-10-2014.
 */

function playPause() {
    var player = document.getElementById('videoPlayer');
    if (player.paused)
        player.play();
    else
        player.pause();
}

function makeBig() {
    var player = document.getElementById('videoPlayer');
    player.width = 560;
}

function makeSmall() {
    var player = document.getElementById('videoPlayer');
    player.width = 320;
}

function makeNormal() {
    var player = document.getElementById('videoPlayer');
    player.width = 420;
}

function load_video(movienum) {
    var listofmp4movies = new Array("./video/python.mp4", "./video/java.mp4");
    var player = document.getElementById('videoPlayer');
    var mp4Vid = document.getElementById('mp4Source');
    player.pause();
    $(mp4Vid).attr('src', listofmp4movies[movienum]);
    player.load();
    player.play();
}
