let cart = [];
    $('#btnKeToko').click(function() {
        $('#profilePage').fadeOut(300, function() {
            $('#storePage')
                .fadeIn(400);
        });
        window.scrollTo(0, 0);
    });

    $('#btnKembaliProfil').click(function() {
        $('#storePage').fadeOut(300, function() {
            $('#profilePage')
                .fadeIn(400);
        });
        window.scrollTo(0, 0);
    });

    $('#btnUbahProfil').click(function() {
        $('#profileName')
            .text('Seanna')
            .css('color', '#FDFEAF');

        $('#profileJob')
            .text('Web Developer & jQuery Enthusiast');

    });

    $('#btnTambahSkill').click(function() {
        let skill =
            $('#skillInput')
            .val()
            .trim();

        if (skill != '') {
            $('#skillList').append(
                '<span class="skill">' +
                skill +
                '</span>'
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

    // Validasi form kontak dengan jQuery Validation Plugin
    $('#contactForm').validate({
        rules: {
            nama: { required: true, minlength: 3 },
            email: { required: true, email: true },
            hp: { required: true, digits: true, minlength: 10, maxlength: 13 },
            subjek: { required: true },
            pesan: { required: true, minlength: 10 }
        },
        messages: {
            nama: {
                required: 'Nama wajib diisi.',
                minlength: 'Nama minimal 3 karakter.'
            },
            email: {
                required: 'Email wajib diisi.',
                email: 'Masukkan alamat email yang valid.'
            },
            hp: {
                required: 'Nomor HP wajib diisi.',
                digits: 'Nomor HP hanya boleh berisi angka.',
                minlength: 'Nomor HP minimal 10 digit.',
                maxlength: 'Nomor HP maksimal 13 digit.'
            },
            subjek: { required: 'Silakan pilih subjek pesan.' },
            pesan: {
                required: 'Pesan wajib diisi.',
                minlength: 'Pesan minimal 10 karakter.'
            }
        },
        errorElement: 'div',
        errorClass: 'pesan-error',
        submitHandler: function(form) {
            $('#successMessage').stop(true, true).fadeIn(300).delay(2500).fadeOut(400);
            form.reset();
            $(form).validate().resetForm();
        }
    });

    $('#btnResetForm').click(function() {
        $('#contactForm').validate().resetForm();
        $('#contactForm input, #contactForm textarea, #contactForm select')
            .removeClass('is-error is-valid');
        $('#successMessage').hide();
    });

    $('.btnTambahProduk').click(function() {

        let id =
            $(this).data('id');

        let nama =
            $(this).data('nama');

        let harga =
            Number(
                $(this).data('harga')
            );

        let produk =
            cart.find(
                item => item.id == id
            );

        if (produk) {
            produk.qty++;

        } else {
            cart.push({
                id: id,
                nama: nama,
                harga: harga,
                qty: 1

            });
        }
        updateCart();
    });

    function rupiah(angka) {
        return 'Rp ' +
            angka.toLocaleString('id-ID');
    }

    function updateCart() {
        $('#cartItems').empty();

        let jumlahBarang =
            cart.reduce(
                (total, item) =>
                    total + item.qty,
                0
            );

        $('#cartCount')
            .text(jumlahBarang);

        if (cart.length === 0) {
            $('#cartItems').html(`
                <div class="cart-empty">
                    <div class="cart-icon">
                        🛒
                    </div>
                    <h3>
                        Keranjang mu masih kosong nih!
                    </h3>
                    <p>
                        Yuk pilih kebutuhanmu!
                    </p>
                </div>

            `);
            $('#cartTotal')
                .text('Rp 0');
            return;
        }

        cart.forEach(function(item) {
            let subtotal =
                item.harga * item.qty;

            $('#cartItems').append(`
                <div class="cart-item">
                    <div class="cart-item-info">
                        <strong>
                            ${item.nama}
                        </strong>
                        <br>
                        ${rupiah(item.harga)}
                    </div>

                    <div class="qty">
                        <button
                            onclick="kurang(${item.id})">
                            −
                        </button>

                        <span>
                            ${item.qty}
                        </span>

                        <button
                            onclick="tambah(${item.id})">
                            +
                        </button>

                        <strong>
                            ${rupiah(subtotal)}
                        </strong>
                    </div>
                </div>
            `);
        });

        let total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    (item.harga * item.qty),
                0
            );
        $('#cartTotal')
            .text(rupiah(total));
    }

    function tambah(id) {
        let produk =
            cart.find(
                item => item.id == id
            );

        if (produk) {
            produk.qty++;
        }
        updateCart();
    }

    function kurang(id) {
        let produk =
            cart.find(
                item => item.id == id
            );
        if (produk) {
            produk.qty--;
            if (produk.qty <= 0) {
                cart =
                    cart.filter(
                        item => item.id != id
                    );
            }
        }

        updateCart();
    }

    $('#btnCheckout').click(function() {
        if (cart.length === 0) {
            alert(
                'Keranjang masih kosong!'
            );
            return;
        }

        let total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    (item.harga * item.qty),
                0
            );
        alert(
            'Checkout berhasil!\n\n' +
            'Total belanja: ' +
            rupiah(total) +
            '\n\nTerima kasih sudah berbelanja!'
        );

        cart = [];
        updateCart();
    });

    $(document).ready(function() {
        updateCart();
    });
