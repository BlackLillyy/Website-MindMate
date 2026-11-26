// Mengambil semua tombol mood
const moodButtons = document.querySelectorAll(".mood-options button");

// Mengambil mood yang tersimpan
const savedMood = localStorage.getItem("selectedMood");

// Menampilkan mood yang sebelumnya dipilih
if (savedMood) {
    moodButtons.forEach(button => {
        const moodName = button.querySelector("small").textContent;

        if (moodName === savedMood) {
            button.classList.add("selected");
        }
    });
}

// Memberikan fungsi pada setiap tombol mood
moodButtons.forEach(button => {
    button.addEventListener("click", function () {

        // Mengambil nama mood
        const moodName = this.querySelector("small").textContent;

        // Menghapus pilihan sebelumnya
        moodButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        // Memberikan tanda pada mood yang dipilih
        this.classList.add("selected");

        // Menyimpan mood ke localStorage
        localStorage.setItem("selectedMood", moodName);

        // Menampilkan notifikasi
        alert("Mood kamu hari ini: " + moodName);
    });
});

function getUserPreferences() {
    return JSON.parse(
        localStorage.getItem("userPreferences")
    ) || {};
}

function applyGlobalTheme() {
    const preferences = getUserPreferences();

    const isDarkMode =
        preferences.darkMode === true ||
        preferences.darkMode === "true";

    document.body.classList.toggle(
        "dark-mode",
        isDarkMode
    );

    console.log("Dark Mode:", isDarkMode);
}

applyGlobalTheme();

function updateDashboardDate() {
    const dateElement = document.getElementById("dashboardDate");

    if (!dateElement) return;

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).toUpperCase();
}

function updateWelcomeGreeting() {
    const greetingElement = document.getElementById("welcomeGreeting");

    if (!greetingElement) return;

    const hour = new Date().getHours();

    let greeting;

    if (hour >= 4 && hour < 11) {
        greeting = "Selamat pagi";
    } else if (hour >= 11 && hour < 15) {
        greeting = "Selamat siang";
    } else if (hour >= 15 && hour < 18) {
        greeting = "Selamat sore";
    } else {
        greeting = "Selamat malam";
    }

    greetingElement.textContent = `${greeting}, Alhayu!`;
}

updateDashboardDate();
updateWelcomeGreeting();

// ==============================
// USER NAME & WELCOME POPUP
// ==============================

function getUserProfile() {
    try {
        return JSON.parse(localStorage.getItem("userProfile")) || {};
    } catch (error) {
        console.error("Gagal membaca profil pengguna:", error);
        return {};
    }
}

function saveUserProfile(profile) {
    localStorage.setItem("userProfile", JSON.stringify(profile));
}

function initializeWelcomePopup() {
    const nameModal = document.getElementById("nameModal");
    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("userNameInput");
    const greeting = document.getElementById("welcomeGreeting");

    // Jika elemen tidak ada, berarti bukan halaman dashboard.
    if (!nameModal || !nameForm || !nameInput || !greeting) {
        return;
    }

    const profile = getUserProfile();
    const savedName = profile.name || "";

    if (savedName.trim()) {
        greeting.textContent = `Hai, ${savedName}!`;
        nameModal.hidden = true;
    } else {
        nameModal.hidden = false;
        nameInput.focus();
    }

    nameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();

        if (!name) {
            nameInput.focus();
            return;
        }

        const updatedProfile = {
            ...getUserProfile(),
            name: name
        };

        saveUserProfile(updatedProfile);

        greeting.textContent = `Hai, ${name}!`;
        nameModal.hidden = true;
    });
}

initializeWelcomePopup();

function updateSidebarProfile() {
    const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
    const name = profile.name || "Alhayu";

    const nameElement = document.getElementById("sidebarProfileName");
    const avatarElement = document.querySelector(".profile .avatar");

    if (nameElement) {
        nameElement.textContent = name;
    }

    if (avatarElement) {
        avatarElement.textContent = name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
            .join("");
    }
}

// Saat Dashboard pertama kali dibuka
document.addEventListener("DOMContentLoaded", updateSidebarProfile);

// Saat nama berubah dari tab/halaman lain
window.addEventListener("storage", function (event) {
    if (event.key === "userProfile") {
        updateSidebarProfile();
    }
});

// Saat kembali ke Dashboard, termasuk lewat tombol Back
window.addEventListener("pageshow", updateSidebarProfile);