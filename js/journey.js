const moods = {
    "Senang": 5,
    "Tenang": 4,
    "Biasa": 3,
    "Lelah": 2,
    "Cemas": 1,
    "Sedih": 0
};

const moodEmojis = {
    "Senang": "😊",
    "Tenang": "😌",
    "Biasa": "😐",
    "Lelah": "😴",
    "Cemas": "😟",
    "Sedih": "😢"
};

const moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
const academicTasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

const today = new Date();
today.setHours(0, 0, 0, 0);

const startDate = new Date(today);
startDate.setDate(today.getDate() - 6);

function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function isWithinLastSevenDays(dateString) {
    const date = parseLocalDate(dateString);
    date.setHours(0, 0, 0, 0);

    return date >= startDate && date <= today;
}

function getLastSevenDays() {
    const days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const dateString = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");

        days.push({
            date: dateString,
            label: date.toLocaleDateString("id-ID", {
                weekday: "short"
            })
        });
    }

    return days;
}

function renderPeriod() {
    const options = {
        day: "numeric",
        month: "short"
    };

    const start = startDate.toLocaleDateString("id-ID", options);
    const end = today.toLocaleDateString("id-ID", options);

    document.getElementById("reportPeriod").textContent =
        `${start} - ${end}`;
}

function renderSummary() {
    const recentMoods = moodHistory.filter(item =>
        isWithinLastSevenDays(item.date)
    );

    const completed = academicTasks.filter(task => task.completed).length;
    const pending = academicTasks.length - completed;

    document.getElementById("totalMood").textContent =
        recentMoods.length;

    document.getElementById("completedTasks").textContent =
        completed;

    document.getElementById("pendingTasks").textContent =
        pending;

    document.getElementById("completedDetail").textContent =
        `${completed} tugas selesai`;

    document.getElementById("pendingDetail").textContent =
        `${pending} belum selesai`;

    const percentage = academicTasks.length > 0
        ? Math.round((completed / academicTasks.length) * 100)
        : 0;

    document.getElementById("taskPercentage").textContent =
        `${percentage}%`;

    document.getElementById("taskProgressBar").style.width =
        `${percentage}%`;
}

function renderMoodChart() {
    const days = getLastSevenDays();

    const dailyMood = days.map(day => {
        const entry = moodHistory.find(item => item.date === day.date);

        return entry && Object.hasOwn(moods, entry.mood)
            ? moods[entry.mood]
            : null;
    });

    const ctx = document.getElementById("moodJourneyChart");

    const isDarkMode = document.body.classList.contains("dark-mode");

    const textColor = isDarkMode ? "#B9B3CA" : "#77718F";
    const gridColor = isDarkMode ? "#39364A" : "#F0EEF5";
    const pointBorderColor = isDarkMode ? "#242232" : "#FFFFFF";

    new Chart(ctx, {
        type: "line",

        data: {
            labels: days.map(day => day.label),

            datasets: [{
                label: "Mood",
                data: dailyMood,
                borderColor: "#A995F5",
                backgroundColor: isDarkMode
                    ? "rgba(169, 149, 245, 0.15)"
                    : "rgba(142, 123, 212, 0.12)",
                fill: true,
                tension: 0.35,
                spanGaps: false,
                pointRadius: 5,
                pointBackgroundColor: "#A995F5",
                pointBorderColor: pointBorderColor,
                pointBorderWidth: 2
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: isDarkMode ? "#302D40" : "#FFFFFF",
                    titleColor: isDarkMode ? "#F4F1FA" : "#29263B",
                    bodyColor: isDarkMode ? "#B9B3CA" : "#77718F",
                    borderColor: isDarkMode ? "#484359" : "#EEEAF5",
                    borderWidth: 1,

                    callbacks: {
                        label: function(context) {
                            const value = context.raw;

                            const moodName = Object.keys(moods).find(
                                key => moods[key] === value
                            );

                            return moodName || "Tidak ada catatan";
                        }
                    }
                }
            },

            scales: {
                y: {
                    min: 0,
                    max: 5,

                    ticks: {
                        stepSize: 1,
                        color: textColor,

                        callback: function(value) {
                            return Object.keys(moods).find(
                                key => moods[key] === value
                            ) || "";
                        }
                    },

                    grid: {
                        color: gridColor
                    },

                    border: {
                        color: gridColor
                    }
                },

                x: {
                    ticks: {
                        color: textColor
                    },

                    grid: {
                        display: false
                    },

                    border: {
                        color: gridColor
                    }
                }
            }
        }
    });
}

function updateJourneyChartTheme() {
    const canvas = document.getElementById("moodJourneyChart");

    const existingChart = Chart.getChart(canvas);

    if (existingChart) {
        existingChart.destroy();
    }

    renderMoodChart();
}

function renderMoodDistribution() {
    const container = document.getElementById("moodDistribution");

    const recentMoods = moodHistory.filter(item =>
        isWithinLastSevenDays(item.date)
    );

    if (recentMoods.length === 0) {
        container.innerHTML =
            '<p class="empty-message">Belum ada catatan mood dalam 7 hari terakhir.</p>';
        return;
    }

    const counts = {};

    recentMoods.forEach(item => {
        if (Object.hasOwn(moods, item.mood)) {
            counts[item.mood] = (counts[item.mood] || 0) + 1;
        }
    });

    const sortedMoods = Object.entries(counts)
        .sort((a, b) => b[1] - a[1]);

    container.innerHTML = sortedMoods.map(([mood, count]) => {
        const percentage = Math.round(
            (count / recentMoods.length) * 100
        );

        return `
            <div class="distribution-item">
                <div class="distribution-info">
                    <span>${moodEmojis[mood]} ${mood}</span>
                    <span>${count} catatan (${percentage}%)</span>
                </div>

                <div class="distribution-track">
                    <div class="distribution-fill"
                         style="width: ${percentage}%">
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function renderReflection() {
    const recentMoods = moodHistory.filter(item =>
        isWithinLastSevenDays(item.date)
    );

    const title = document.getElementById("reflectionTitle");
    const text = document.getElementById("reflectionText");

    if (recentMoods.length === 0) {
        title.textContent = "Mulai perjalananmu";
        text.textContent =
            "Belum ada catatan mood selama 7 hari terakhir. Coba luangkan waktu untuk mencatat suasana hatimu setiap hari.";
        return;
    }

    const counts = {};

    recentMoods.forEach(item => {
        counts[item.mood] = (counts[item.mood] || 0) + 1;
    });

    const dominantMood = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])[0][0];

    const positiveMoods = (counts["Senang"] || 0) +
        (counts["Tenang"] || 0);

    const difficultMoods = (counts["Lelah"] || 0) +
        (counts["Cemas"] || 0) +
        (counts["Sedih"] || 0);

    title.textContent = `Mood yang paling sering dicatat: ${dominantMood}`;

    if (positiveMoods > difficultMoods) {
        text.textContent =
            `Dalam 7 hari terakhir, kamu lebih sering mencatat suasana hati yang positif atau tenang. Tetap beri ruang untuk beristirahat dan mengenali perasaanmu.`;
    } else if (difficultMoods > positiveMoods) {
        text.textContent =
            `Kamu cukup sering mencatat perasaan lelah, cemas, atau sedih. Coba perhatikan hal-hal yang memengaruhi harimu dan jangan ragu mencari dukungan dari orang yang kamu percaya.`;
    } else {
        text.textContent =
            `Catatan mood kamu cukup beragam. Setiap suasana hati punya tempatnya sendiri. Terus kenali pola dan kebutuhan dirimu.`;
    }
}

const themeObserver = new MutationObserver(() => {
    updateJourneyChartTheme();
});

themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
});

function initializeJourney() {
    renderPeriod();
    renderSummary();
    renderMoodChart();
    renderMoodDistribution();
    renderReflection();
}

initializeJourney();