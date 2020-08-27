$(document).ready(() => {
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    // pagi

    // var lastPage = $('#lastPage')
    // var valueLastPage = parseInt(lastPage.val())
    // var activeBtn = $('.page-number.active')
    // var valueActive = parseInt(activeBtn.text())
    // var prevPage = $('.page-number.active').next()
    // var valuePrevPage = parseInt(prevPage.text())
    // var doublePrevPage = $('.page-number.active').next().next()
    // var valueDoublePrevPage = parseInt(doublePrevPage.text())

    // if (valueDoublePrevPage.text() == valueLastPage - 2) {
    //     var valueActive = parseInt(activeBtn.text())

    //     $('.page-number').hide()
    //     activeBtn.show()
    //     prevPage.show()
    //     doublePrevPage.show()
    // } else {
    //     $('.page-number').hide()

    //     if (valueActive)
    //         activeBtn.show()

    //     activeBtn.nextUntil('#' + (valueActive + 3)).show()
    // }

    // see password
    var inputPassword = document.getElementById('passwordField')
    $('#seePassword').on('click', () => {
        if (inputPassword.type === 'password') {
            $('#seePassword i').attr('class', 'fas fa-eye')
            inputPassword.type = 'text'
        } else if (inputPassword.type === 'text') {
            $('#seePassword i').attr('class', 'fas fa-eye-slash')
            inputPassword.type = 'password'
        }

    })

    // data table
    $('table').DataTable({

    })
})