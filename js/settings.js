const profileForm = document.getElementById("profileForm");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const taskNotification = document.getElementById("taskNotification");
const moodNotification = document.getElementById("moodNotification");
const darkMode = document.getElementById("darkMode");

const successMessage = document.getElementById("successMessage");

// LOAD SETTINGS
function loadSettings() {

    const profile = JSON.parse(
        localStorage.getItem("userProfile")
    ) || {};

    const preferences = JSON.parse(
        localStorage.getItem("userPreferences")
    ) || {};

    userName.value = profile.name || "";
    userEmail.value = profile.email || "";

    taskNotification.checked =
        preferences.taskNotification ?? true;

    moodNotification.checked =
        preferences.moodNotification ?? true;

    darkMode.checked =
        preferences.darkMode ?? false;

    applyDarkMode();
}

// SAVE PROFILE
profileForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const profile = {
        name: userName.value.trim(),
        email: userEmail.value.trim()
    };

    if (!profile.name || !profile.email) {
        showMessage("Nama dan email wajib diisi.", true);
        return;
    }

    localStorage.setItem(
        "userProfile",
        JSON.stringify(profile)
    );

    showMessage("Profil berhasil disimpan!");
});

// SAVE PREFERENCES
function savePreferences() {

    const preferences = {
        taskNotification: taskNotification.checked,
        moodNotification: moodNotification.checked,
        darkMode: darkMode.checked
    };

    localStorage.setItem(
        "userPreferences",
        JSON.stringify(preferences)
    );

    applyDarkMode();
}

function savePreferences() {

    const preferences = {
        taskNotification: taskNotification.checked,
        moodNotification: moodNotification.checked,
        darkMode: darkMode.checked
    };

    localStorage.setItem(
        "userPreferences",
        JSON.stringify(preferences)
    );

    applyDarkMode();
}

// LISTEN TO CHANGES
taskNotification.addEventListener("change", savePreferences);
moodNotification.addEventListener("change", savePreferences);
darkMode.addEventListener("change", savePreferences);

// DARK MODE
function applyDarkMode() {

    if (darkMode.checked) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// MESSAGE
function showMessage(message, isError = false) {

    successMessage.textContent = message;

    successMessage.style.color = isError
        ? "#D9534F"
        : "#39845C";

    setTimeout(() => {
        successMessage.textContent = "";
    }, 3000);
}

// INITIALIZE
loadSettings();