$(".btn-correct-answer").click((e) => {
    $(".btn-correct-answer, .btn-incorrect-answer").prop('disabled', 'true');
    $(".btn-correct-answer").removeClass("btn-outline-secondary");
    $(".btn-correct-answer").addClass("btn-warning");

    setTimeout(function() {
        $(".btn-correct-answer").removeClass("btn-warning").addClass("btn-success");

        $(".btn-correct-answer").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 2000);
})

$(".btn-incorrect-answer").click(function() {
    $(".btn-correct-answer, .btn-incorrect-answer").prop('disabled', 'true');
    $(this).removeClass("btn-outline-secondary");
    $(this).addClass("btn-warning");

    setTimeout(() => {
        $(this).removeClass("btn-warning").addClass("btn-danger");
        $(".btn-correct-answer").removeClass("btn-outline-secondary").addClass("btn-success");

        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 2000);
})