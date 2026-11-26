document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const nameInput = document.getElementById("profileName");
    const emailInput = document.getElementById("profileEmail");
    const message = document.getElementById("profileMessage");

    const profileDisplayName = document.getElementById("profileDisplayName");
    const profileAvatar = document.getElementById("profileAvatar");
    const sidebarName = document.getElementById("sidebarName");
    const sidebarAvatar = document.getElementById("sidebarAvatar");

    function getUserProfile() {
        try {
            return JSON.parse(localStorage.getItem("userProfile")) || {};
        } catch (error) {
            return {};
        }
    }

    const profile = {
        name: document.getElementById("profileName").value.trim(),
        email: document.getElementById("profileEmail").value.trim()
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));

    function getInitials(name) {
        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }

        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }

    function renderProfile() {
        const profile = getUserProfile();
        const name = profile.name || "";
        const email = profile.email || "";

        nameInput.value = name;
        emailInput.value = email;

        const displayName = name || "Pengguna";
        const initials = name ? getInitials(name) : "U";

        profileDisplayName.textContent = displayName;
        profileAvatar.textContent = initials;

        sidebarName.textContent = displayName;
        sidebarAvatar.textContent = initials;
    }

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name) {
            nameInput.focus();
            message.textContent = "Nama panggilan perlu diisi.";
            return;
        }

        const currentProfile = getUserProfile();

        const updatedProfile = {
            ...currentProfile,
            name: name,
            email: email
        };

        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

        renderProfile();
        message.textContent = "Perubahan profil berhasil disimpan.";
    });

    renderProfile();
});