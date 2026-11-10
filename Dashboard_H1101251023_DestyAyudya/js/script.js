document.addEventListener("DOMContentLoaded", () => {
  const userTableBody = document.querySelector("#userTable tbody");
  const userSearch = document.getElementById("userSearch");
  const resultCount = document.getElementById("resultCount");

  const detailModal = new bootstrap.Modal(
    document.getElementById("detailModal")
  );

  const addUserModalElement = document.getElementById("addUserModal");
  const addUserModal = bootstrap.Modal.getOrCreateInstance(addUserModalElement);
  const addUserForm = document.getElementById("addUserForm");
  const sidebar = document.getElementById("sidebar");

  // Highlight menu yang dipilih
  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".menu-link").forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      if (window.innerWidth <= 768) {
        sidebar.classList.remove("show");
      }
    });
  });

  // Toggle sidebar di layar kecil
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  // Pencarian pengguna
  userSearch.addEventListener("input", () => {
    const query = userSearch.value.trim().toLowerCase();
    const rows = [...userTableBody.querySelectorAll("tr")];
    let visible = 0;

    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(query);

      row.hidden = !matches;

      if (matches) {
        visible++;
      }
    });

    resultCount.textContent = `${visible} pengguna`;
  });

  // Modal detail pengguna
  document.getElementById("userTable").addEventListener("click", (event) => {
    const button = event.target.closest(".btn-detail");

    if (!button) return;

    const name = button.dataset.user;
    const email = button.dataset.email;
    const role = button.dataset.role;
    const status = button.dataset.status;

    document.getElementById("detailName").textContent = name;
    document.getElementById("detailEmail").textContent = email;
    document.getElementById("detailRole").textContent = role;
    document.getElementById("detailStatus").textContent = status;
    document.getElementById("detailAvatar").textContent = initials(name);

    detailModal.show();
  });

  // Tambah pengguna ke tabel
  addUserForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const role = document.getElementById("newRole").value;

    if (!name || !email) return;

    const nextNumber = userTableBody.querySelectorAll("tr").length + 1;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${nextNumber}</td>
      <td>
        <div class="user-name">
          <span class="table-avatar">${initials(name)}</span>
          ${escapeHTML(name)}
        </div>
      </td>
      <td>${escapeHTML(email)}</td>
      <td>${escapeHTML(role)}</td>
      <td><span class="status active-status">Aktif</span></td>
      <td>
        <button
          class="btn btn-sm btn-detail"
          data-user="${escapeHTML(name)}"
          data-email="${escapeHTML(email)}"
          data-role="${escapeHTML(role)}"
          data-status="Aktif">
          <i class="bi bi-eye"></i> Detail
        </button>
      </td>
    `;

    userTableBody.appendChild(row);

    addUserForm.reset();
    addUserModal.hide();

    userSearch.dispatchEvent(new Event("input"));
  });

  // Unduh data tabel sebagai CSV
  document.getElementById("downloadReport").addEventListener("click", () => {
    const rows = [...document.querySelectorAll("#userTable tr")];

    const csv = rows.map((row) => {
      return [...row.querySelectorAll("th, td")]
        .map((cell) => {
          return `"${cell.innerText.trim().replaceAll('"', '""')}"`;
        })
        .join(",");
    }).join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "laporan-pengguna.csv";
    link.click();

    URL.revokeObjectURL(url);
  });

  // Mengambil inisial nama
  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  // Mengamankan teks yang dimasukkan ke HTML
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  // Jumlah awal pengguna
  resultCount.textContent =
    `${userTableBody.querySelectorAll("tr").length} pengguna`;
});