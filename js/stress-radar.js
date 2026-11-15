// STRESS RADAR

// AMBIL DATA

const moodData = JSON.parse(localStorage.getItem("moodHistory")) || [];
const taskData = JSON.parse(localStorage.getItem("academicTasks")) || [];

const today = getToday();

// TANGGAL HARI INI

function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// HITUNG DATA TUGAS

const pending = taskData.filter(task => !task.completed);

const completed = taskData.filter(task => task.completed);

const todayDeadline = pending.filter(
    task => task.deadline === today
).length;

const overdue = pending.filter(
    task => task.deadline < today
).length;

// UPDATE OVERVIEW

document.getElementById("radarPending").textContent = pending.length;

document.getElementById("radarDeadline").textContent = todayDeadline;

document.getElementById("radarMood").textContent = moodData.length;


// HITUNG INDIKATOR

// Beban tugas: semakin banyak tugas aktif, semakin tinggi indikator.
const taskScore = Math.min(pending.length * 15, 100);

// Deadline: memperhatikan tugas yang jatuh tempo hari ini dan terlambat.
const deadlineScore = Math.min(
    todayDeadline * 20 + overdue * 30,
    100
);

// Mood: menghitung frekuensi catatan mood yang menunjukkan perasaan sulit.
// Ini bukan ukuran tingkat stres.
const difficultMoods = ["Lelah", "Cemas", "Sedih"];

const difficultMoodCount = moodData.filter(
    item => difficultMoods.includes(item.mood)
).length;

const moodScore = moodData.length === 0
    ? 0
    : Math.round((difficultMoodCount / moodData.length) * 100);

// Penyelesaian tugas: semakin banyak tugas selesai,
// semakin tinggi indikator penyelesaian.
const completionScore = taskData.length === 0
    ? 0
    : Math.round((completed.length / taskData.length) * 100);

// Keseimbangan aktivitas: indikator ketersediaan data refleksi
// dan penyelesaian tugas, bukan penilaian kondisi mental.
const balanceScore = Math.round(
    (completionScore + (moodData.length > 0 ? 100 : 0)) / 2
);


// DATA CHART

const radarLabels = [
    "Beban Tugas",
    "Deadline",
    "Mood Sulit",
    "Penyelesaian",
    "Keseimbangan"
];

const radarValues = [
    taskScore,
    deadlineScore,
    moodScore,
    completionScore,
    balanceScore
];


// BUAT RADAR CHART

const ctx = document.getElementById("stressRadarChart");

new Chart(ctx, {

    type: "radar",

    data: {

        labels: radarLabels,

        datasets: [{
            label: "Indikator Aktivitas",
            data: radarValues,

            backgroundColor: "rgba(142, 123, 212, 0.18)",

            borderColor: "#8E7BD4",

            borderWidth: 2,

            pointBackgroundColor: "#8E7BD4",

            pointBorderColor: "#FFFFFF",

            pointRadius: 4
        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        scales: {

            r: {

                min: 0,

                max: 100,

                ticks: {
                    stepSize: 20,
                    display: false
                },

                grid: {
                    color: "#EFEDF4"
                },

                angleLines: {
                    color: "#EFEDF4"
                },

                pointLabels: {
                    color: "#777488",
                    font: {
                        size: 10,
                        family: "Plus Jakarta Sans"
                    }
                }

            }

        },

        plugins: {

            legend: {
                display: false
            }

        }

    }

});


// DETAIL INDIKATOR

const indicators = [
    {
        name: "Beban Tugas",
        value: taskScore,
        description: "Berdasarkan jumlah tugas yang belum selesai."
    },
    {
        name: "Deadline",
        value: deadlineScore,
        description: "Berdasarkan tugas yang jatuh tempo dan terlambat."
    },
    {
        name: "Mood Sulit",
        value: moodScore,
        description: "Proporsi catatan mood Lelah, Cemas, dan Sedih."
    },
    {
        name: "Penyelesaian Tugas",
        value: completionScore,
        description: "Proporsi tugas yang telah diselesaikan."
    },
    {
        name: "Keseimbangan Data",
        value: balanceScore,
        description: "Ketersediaan catatan mood dan penyelesaian tugas."
    }
];

const indicatorList = document.getElementById("indicatorList");

indicators.forEach(item => {

    const element = document.createElement("div");

    element.className = "indicator-item";

    element.innerHTML = `

        <div class="indicator-info">
            <span>${item.name}</span>
            <span>${item.value}%</span>
        </div>

        <div class="indicator-track">
            <div
                class="indicator-progress"
                style="width: ${item.value}%"
            ></div>
        </div>

        <small style="font-size: 10px; color: #9692A5;">
            ${item.description}
        </small>

    `;

    indicatorList.appendChild(element);

});


// PERSONAL INSIGHT

const insightTitle = document.getElementById("insightTitle");

const insightDescription = document.getElementById("insightDescription");

if (taskData.length === 0 && moodData.length === 0) {

    insightTitle.textContent = "Mulai kenali aktivitasmu";

    insightDescription.textContent =
        "Belum ada data yang cukup. Cobalah mencatat mood dan aktivitas akademikmu terlebih dahulu.";

} else if (overdue > 0) {

    insightTitle.textContent = "Ada deadline yang terlewat";

    insightDescription.textContent =
        `Kamu memiliki ${overdue} tugas yang melewati deadline. Coba tinjau kembali prioritas dan rencana pengerjaanmu.`;

} else if (pending.length >= 5) {

    insightTitle.textContent = "Aktivitas akademik cukup padat";

    insightDescription.textContent =
        "Ada beberapa tugas yang masih perlu diselesaikan. Pertimbangkan untuk membagi pekerjaan menjadi langkah-langkah kecil.";

} else if (moodData.length === 0) {

    insightTitle.textContent = "Lengkapi catatan mood";

    insightDescription.textContent =
        "Kamu sudah memiliki data tugas. Tambahkan catatan mood agar refleksi aktivitasmu lebih lengkap.";

} else {

    insightTitle.textContent = "Terus kenali pola aktivitasmu";

    insightDescription.textContent =
        "Data aktivitasmu sudah mulai terkumpul. Pertahankan kebiasaan mencatat dan luangkan waktu untuk beristirahat.";

}