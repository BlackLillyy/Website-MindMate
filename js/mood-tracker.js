// MOOD TRACKER

const moodButtons = document.querySelectorAll(".mood-options button");
const moodNote = document.getElementById("moodNote");
const saveMoodBtn = document.getElementById("saveMoodBtn");
const moodHistoryList = document.getElementById("moodHistoryList");
const currentDate = document.getElementById("currentDate");

// DATA MOOD

const moodEmojis = {
    "Senang": "😊",
    "Tenang": "😌",
    "Biasa": "😐",
    "Lelah": "😴",
    "Cemas": "😟",
    "Sedih": "😢"
};

let selectedMood = null;

// FORMAT TANGGAL

function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// TAMPILKAN TANGGAL HARI INI

currentDate.textContent = formatDate(getToday());

// AMBIL DATA DARI LOCAL STORAGE

function getMoodData() {
    return JSON.parse(localStorage.getItem("moodHistory")) || [];
}

// SIMPAN DATA KE LOCAL STORAGE

function saveMoodData(data) {
    localStorage.setItem("moodHistory", JSON.stringify(data));
}

// PILIH MOOD

moodButtons.forEach(button => {

    button.addEventListener("click", function () {

        moodButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedMood = this.dataset.mood;

    });

});

// TAMPILKAN MOOD HARI INI JIKA SUDAH ADA

function loadTodayMood() {

    const today = getToday();
    const moodData = getMoodData();

    const todayMood = moodData.find(item => item.date === today);

    if (todayMood) {

        selectedMood = todayMood.mood;

        moodButtons.forEach(button => {

            if (button.dataset.mood === selectedMood) {
                button.classList.add("selected");
            }

        });

        moodNote.value = todayMood.note;

    }

}

// SIMPAN MOOD

saveMoodBtn.addEventListener("click", function () {

    if (!selectedMood) {
        alert("Pilih suasana hati kamu terlebih dahulu.");
        return;
    }

    const today = getToday();
    const note = moodNote.value.trim();

    let moodData = getMoodData();

    const existingIndex = moodData.findIndex(item => item.date === today);

    const newData = {
        date: today,
        mood: selectedMood,
        note: note
    };

    if (existingIndex !== -1) {

        moodData[existingIndex] = newData;

    } else {

        moodData.push(newData);

    }

    saveMoodData(moodData);

    renderMoodHistory();

    alert("Mood kamu berhasil disimpan!");

});

// TAMPILKAN RIWAYAT MOOD

function renderMoodHistory() {

    const moodData = getMoodData();

    moodHistoryList.innerHTML = "";

    if (moodData.length === 0) {

        moodHistoryList.innerHTML = `
            <div class="empty-history">
                <span>🌱</span>
                <h3>Belum ada riwayat mood</h3>
                <p>
                    Mulai catat suasana hatimu hari ini.
                    Setiap langkah kecil adalah bagian dari perjalananmu.
                </p>
            </div>
        `;

        return;
    }

    // URUTKAN DARI TERBARU

    moodData.sort((a, b) => b.date.localeCompare(a.date));

    moodData.forEach((item, index) => {

        const historyItem = document.createElement("div");

        historyItem.className = "history-item";

        const emoji = moodEmojis[item.mood] || "💭";

        historyItem.innerHTML = `
            <div class="history-emoji">${emoji}</div>

            <div class="history-content">
                <h4>${item.mood}</h4>
                <p>${escapeHTML(item.note) || "Tidak ada catatan."}</p>
                <small>${formatDate(item.date)}</small>
            </div>

            <button
                class="delete-mood"
                type="button"
                data-index="${index}"
                aria-label="Hapus catatan mood"
                title="Hapus catatan"
            >
                ×
            </button>
        `;

        moodHistoryList.appendChild(historyItem);

    });

    // EVENT HAPUS

    document.querySelectorAll(".delete-mood").forEach(button => {

        button.addEventListener("click", function () {

            const index = Number(this.dataset.index);

            const confirmDelete = confirm(
                "Yakin ingin menghapus catatan mood ini?"
            );

            if (!confirmDelete) return;

            let data = getMoodData();

            const deletedItem = data.sort((a, b) =>
                b.date.localeCompare(a.date)
            )[index];

            data = data.filter(item => item !== deletedItem);

            saveMoodData(data);

            if (deletedItem.date === getToday()) {
                selectedMood = null;
                moodNote.value = "";

                moodButtons.forEach(btn => {
                    btn.classList.remove("selected");
                });
            }

            renderMoodHistory();

        });

    });

}

// AMANKAN TEKS CATATAN PENGGUNA

function escapeHTML(text) {

    return String(text).replace(/[&<>"']/g, function (char) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];

    });

}

// JALANKAN SAAT HALAMAN DIBUKA

loadTodayMood();
renderMoodHistory();