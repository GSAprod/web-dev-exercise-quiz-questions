let buttons_active = true

$(".btn-correct-answer").click(function() {
    if (buttons_active === false) return;
    buttons_active = false;
    $(".btn-incorrect-answer").prop('disabled', 'true');
    $(".btn-correct-answer").removeClass("btn-outline-secondary");
    $(".btn-correct-answer").addClass("btn-warning");

    setTimeout(function() {
        $(".btn-correct-answer").removeClass("btn-warning").addClass("btn-success");

        $(".btn-correct-answer").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 1500);
})

$(".btn-incorrect-answer").click(function() {
    if (buttons_active === false) return;
    buttons_active = false
    $(".btn-correct-answer, .btn-incorrect-answer").not(this).prop('disabled', 'true');
    $(this).removeClass("btn-outline-secondary");
    $(this).addClass("btn-warning");

    setTimeout(() => {
        $(this).removeClass("btn-warning").addClass("btn-danger");
        $(".btn-correct-answer").prop("disabled", false).removeClass("btn-outline-secondary").addClass("btn-success");

        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 1500);
})