$(document).ready(function() {

    $('#btnUbahProfil').click(function() {

        $('#profileName')
            .text('Desta Megantara')
            .css('color', '#FDFEAF');

        $('#profileJob')
            .text('Web Developer & jQuery Enthusiast');

    });

    $('#btnTambahSkill').click(function() {

        let skill = $('#skillInput').val().trim();

        if (skill != '') {

            $('#skillList').append(
                '<span class="skill">' + skill + '</span>'
            );

            $('#skillInput').val('');

        }

    });

    $('#skillInput').keypress(function(e) {

        if (e.which == 13) {

            $('#btnTambahSkill').click();

        }

    });

    $('#btnAnimasi').click(function() {

        $('#profileCard')
            .fadeOut(300)
            .fadeIn(600)
            .slideUp(200)
            .slideDown(300);

    });

    $('#profileCard').hover(

        function() {

            $(this).css(
                'transform',
                'rotate(-1deg) scale(1.02)'
            );

        },

        function() {

            $(this).css(
                'transform',
                'rotate(0deg) scale(1)'
            );

        }

    );

    $('#btnReset').click(function() {

        $('#profileName')
            .text('Desty Ayudya')
            .css('color', '#FDFEAF');

        $('#profileJob')
            .text('Front-End Developer');

        $('#skillList').html(
            '<span class="skill">HTML</span>' +
            '<span class="skill">CSS</span>' +
            '<span class="skill">JavaScript</span>'
        );

        $('#skillInput').val('');

    });

    $('#contactForm').submit(function(e) {
        e.preventDefault();

        let valid = true;

        let nama = $('#nama').val().trim();
        let email = $('#email').val().trim();
        let pesan = $('#pesan').val().trim();

        if (nama.length < 3) {
            $('#errNama').show();
            valid = false;
        } else {
            $('#errNama').hide();
        }

        if (
            email.length < 5 ||
            !email.includes('@')
        ) {
            $('#errEmail').show();
            valid = false;
        } else {
            $('#errEmail').hide();
        }

        if (pesan.length < 10) {
            $('#errPesan').show();
            valid = false;
        } else {
            $('#errPesan').hide();
        }

        if (valid) {
            $('#successMessage')
                .fadeIn()
                .delay(2000)
                .fadeOut();
            $('#contactForm')[0].reset();
        }
    });

    $('#btnResetForm').click(function() {

        $('.error').hide();

        $('#successMessage').hide();

    });

});