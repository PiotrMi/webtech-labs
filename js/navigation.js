$(function() {
    $(".list__link").on('click', function(e) {
        var target = this.href.split('#')[1];
        $('.list__item').removeClass('active');
        $(this).closest('.list__item').addClass('active');
        $('section').animate({opacity: 0}).hide();
        $('#'+target).show().animate({opacity: 1});
        return false;
    });
    $('.list__item.active a').click();

    $(':submit').on("click", function(e) {
        $.post("/tickets/index.php?action=create", {
            movie: "Ninja",
            session: 1,
            row: 13,
            seat: 4
        });
        return false;
    });

    $.get("/tickets", {}, function(data) {
        console.log(data);
    }, "json");
});
