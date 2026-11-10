
$(document).ready(function () {

    // DATA PRODUK
    const produkData = [
        {
            id: 1,
            nama: "Arabika Gayo",
            harga: 45000,
            kategori: "biji",
            icon: "☕",
            deskripsi: "Kopi Arabika Gayo dengan aroma harum dan rasa seimbang."
        },
        {
            id: 2,
            nama: "Robusta Lampung",
            harga: 35000,
            kategori: "biji",
            icon: "🫘",
            deskripsi: "Kopi Robusta dengan karakter kuat dan pekat."
        },
        {
            id: 3,
            nama: "Liberika Riau",
            harga: 50000,
            kategori: "biji",
            icon: "☕",
            deskripsi: "Kopi Liberika dengan aroma khas dan cita rasa unik."
        },
        {
            id: 4,
            nama: "Kopi Bubuk Toraja",
            harga: 40000,
            kategori: "bubuk",
            icon: "🫘",
            deskripsi: "Kopi bubuk pilihan dari dataran tinggi Toraja."
        },
        {
            id: 5,
            nama: "Kopi Susu Nusantara",
            harga: 15000,
            kategori: "minuman",
            icon: "🥛",
            deskripsi: "Perpaduan espresso, susu, dan rasa manis yang pas."
        },
        {
            id: 6,
            nama: "Es Kopi Gula Aren",
            harga: 18000,
            kategori: "minuman",
            icon: "🧋",
            deskripsi: "Es kopi segar dengan manis alami gula aren."
        }
    ];

    // FORMAT HARGA RUPIAH
    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    }

    // FILTER AKTIF DAN KATA KUNCI
    let kategoriAktif = "semua";
    let kataKunci = "";

    // LATIHAN 3 DAN 4: RENDER, FILTER, PENCARIAN
    function renderProduk() {
        const hasil = produkData.filter(function (produk) {
            const cocokKategori =
                kategoriAktif === "semua" ||
                produk.kategori === kategoriAktif;

            const cocokCari =
                produk.nama.toLowerCase().includes(kataKunci) ||
                produk.kategori.toLowerCase().includes(kataKunci) ||
                produk.deskripsi.toLowerCase().includes(kataKunci);

            return cocokKategori && cocokCari;
        });

        $("#produkGrid").empty();

        if (hasil.length === 0) {
            $("#produkGrid").html(
                '<p class="empty-state">Produk tidak ditemukan. Coba kata kunci lain.</p>'
            );
            return;
        }

        hasil.forEach(function (produk) {
            const card = `
                <article class="product-card">
                    <div class="product-image">${produk.icon}</div>
                    <div class="product-info">
                        <span class="product-category">${produk.kategori}</span>
                        <h3>${produk.nama}</h3>
                        <p class="product-description">${produk.deskripsi}</p>
                        <p class="product-price">${formatRupiah(produk.harga)}</p>
                        <button class="btn-add-cart" data-id="${produk.id}">
                            + Tambah ke Keranjang
                        </button>
                    </div>
                </article>
            `;

            $("#produkGrid").append(card);
        });
    }

    $(".filter-btn").on("click", function () {
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        kategoriAktif = $(this).data("kategori");
        renderProduk();
    });

    $("#inputCari").on("input", function () {
        kataKunci = $(this).val().trim().toLowerCase();
        renderProduk();
    });

    // DATA KERANJANG
    let cart = [];

    function tampilkanToast(pesan) {
        $("#toast").text(pesan).addClass("show");

        setTimeout(function () {
            $("#toast").removeClass("show");
        }, 2500);
    }

    // LATIHAN 5: UPDATE KERANJANG
    function updateCartUI() {
        $("#cartItems").empty();

        let total = 0;
        let jumlahItem = 0;

        if (cart.length === 0) {
            $("#cartItems").html(
                '<p class="empty-cart">Keranjang masih kosong.</p>'
            );
        }

        cart.forEach(function (item) {
            const subtotal = item.harga * item.qty;
            total += subtotal;
            jumlahItem += item.qty;

            const cartItem = `
                <div class="cart-item">
                    <h4>${item.nama}</h4>
                    <p class="cart-item-price">${formatRupiah(subtotal)}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" data-id="${item.id}" data-action="minus">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" data-id="${item.id}" data-action="plus">+</button>
                        <button class="cart-item-remove" data-id="${item.id}">Hapus</button>
                    </div>
                </div>
            `;

            $("#cartItems").append(cartItem);
        });

        $("#cartCount").text(jumlahItem);
        $("#cartTotal").text(formatRupiah(total));
        $("#checkoutBtn").prop("disabled", cart.length === 0);
    }

    // TAMBAH PRODUK KE KERANJANG
    $("#produkGrid").on("click", ".btn-add-cart", function () {
        const id = Number($(this).data("id"));
        const produk = produkData.find(function (item) {
            return item.id === id;
        });

        if (!produk) return;

        const itemCart = cart.find(function (item) {
            return item.id === id;
        });

        if (itemCart) {
            itemCart.qty++;
        } else {
            cart.push({
                ...produk,
                qty: 1
            });
        }

        updateCartUI();
        tampilkanToast(produk.nama + " ditambahkan ke keranjang.");
    });

    // TAMBAH / KURANG JUMLAH PRODUK
    $("#cartItems").on("click", ".qty-btn", function () {
        const id = Number($(this).data("id"));
        const aksi = $(this).data("action");
        const item = cart.find(function (produk) {
            return produk.id === id;
        });

        if (!item) return;

        if (aksi === "plus") {
            item.qty++;
        } else if (aksi === "minus") {
            item.qty--;

            if (item.qty <= 0) {
                cart = cart.filter(function (produk) {
                    return produk.id !== id;
                });
            }
        }

        updateCartUI();
    });

    // HAPUS PRODUK
    $("#cartItems").on("click", ".cart-item-remove", function () {
        const id = Number($(this).data("id"));

        cart = cart.filter(function (item) {
            return item.id !== id;
        });

        updateCartUI();
        tampilkanToast("Produk dihapus dari keranjang.");
    });

    // BUKA DAN TUTUP SIDEBAR
    function bukaCart() {
        $("#cartSidebar").addClass("open");
        $("#cartOverlay").fadeIn(200);
    }

    function tutupCart() {
        $("#cartSidebar").removeClass("open");
        $("#cartOverlay").fadeOut(200);
    }

    $("#cartBtn").on("click", bukaCart);
    $("#closeCart, #cartOverlay").on("click", tutupCart);

    // LATIHAN 6: MODAL CHECKOUT
    $("#checkoutBtn").on("click", function () {
        if (cart.length === 0) {
            tampilkanToast("Keranjang masih kosong.");
            return;
        }

        tutupCart();
        $("#checkoutModal").addClass("show");
    });

    $("#closeCheckout").on("click", function () {
        $("#checkoutModal").removeClass("show");
    });

    // VALIDASI REAL-TIME
    function validasiNama() {
        const valid = $("#inputNama").val().trim().length >= 3;

        $("#namaError").text(
            valid ? "" : "Nama minimal 3 karakter."
        );

        return valid;
    }

    function validasiWhatsapp() {
        const nomor = $("#inputWhatsapp").val().trim();
        const valid = /^\d{10,14}$/.test(nomor);

        $("#whatsappError").text(
            valid ? "" : "Nomor WhatsApp harus 10–14 digit angka."
        );

        return valid;
    }

    function validasiAlamat() {
        const valid = $("#inputAlamat").val().trim().length >= 10;

        $("#alamatError").text(
            valid ? "" : "Alamat minimal 10 karakter."
        );

        return valid;
    }

    $("#inputNama").on("input", validasiNama);
    $("#inputWhatsapp").on("input", validasiWhatsapp);
    $("#inputAlamat").on("input", validasiAlamat);

    // PROSES CHECKOUT
    $("#checkoutForm").on("submit", function (e) {
        e.preventDefault();

        const namaValid = validasiNama();
        const whatsappValid = validasiWhatsapp();
        const alamatValid = validasiAlamat();
        const metode = $('input[name="metode"]:checked').val();

        if (!namaValid || !whatsappValid || !alamatValid || !metode) {
            tampilkanToast("Periksa kembali data pemesanan.");
            return;
        }

        const nama = $("#inputNama").val().trim();

        $("#checkoutModal").removeClass("show");
        $("#checkoutForm")[0].reset();

        $("#namaError, #whatsappError, #alamatError").text("");

        cart = [];
        updateCartUI();

        tampilkanToast("Terima kasih, " + nama + "! Pesanan berhasil dikonfirmasi.");
    });

    // TAMPILKAN PRODUK SAAT HALAMAN DIBUKA
    renderProduk();
    updateCartUI();

});
