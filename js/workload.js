// ACADEMIC WORKLOAD TRACKER

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskFilter = document.getElementById("taskFilter");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

// DATA TUGAS

let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

// TANGGAL

function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// SIMPAN DATA

function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

// HITUNG RINGKASAN

function updateSummary() {

    totalTasks.textContent = tasks.length;

    pendingTasks.textContent = tasks.filter(
        task => !task.completed
    ).length;

    completedTasks.textContent = tasks.filter(
        task => task.completed
    ).length;

}

// TAMBAH TUGAS

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("taskName").value.trim();
    const course = document.getElementById("courseName").value.trim();
    const deadline = document.getElementById("taskDeadline").value;
    const priority = document.getElementById("taskPriority").value;

    if (!name || !course || !deadline || !priority) {
        alert("Lengkapi semua informasi tugas.");
        return;
    }

    if (deadline < getToday()) {
        alert("Deadline tidak boleh menggunakan tanggal yang sudah lewat.");
        return;
    }

    const newTask = {
        id: Date.now(),
        name,
        course,
        deadline,
        priority,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskForm.reset();

});

// TANGGAL HARI INI

function getToday() {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// STATUS DEADLINE

function getDeadlineStatus(deadline, completed) {

    if (completed) return "Selesai";

    const today = getToday();

    if (deadline === today) return "Deadline hari ini";

    if (deadline < today) return "Terlambat";

    return "Belum selesai";

}

// TAMPILKAN TUGAS

function renderTasks() {

    const filter = taskFilter.value;

    let filteredTasks = [...tasks];

    if (filter === "Belum") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    if (filter === "Selesai") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    // URUTKAN BERDASARKAN DEADLINE

    filteredTasks.sort((a, b) =>
        a.deadline.localeCompare(b.deadline)
    );

    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-task">
                <span>📝</span>
                <h3>Belum ada tugas</h3>
                <p>Tambahkan tugas pertamamu untuk mulai mengatur aktivitas akademik.</p>
            </div>
        `;

        updateSummary();
        return;
    }

    filteredTasks.forEach(task => {

        const taskItem = document.createElement("div");

        taskItem.className = task.completed
            ? "task-item completed"
            : "task-item";

        const priorityClass = {
            "Tinggi": "priority-tinggi",
            "Sedang": "priority-sedang",
            "Rendah": "priority-rendah"
        }[task.priority];

        const deadlineStatus = getDeadlineStatus(
            task.deadline,
            task.completed
        );

        taskItem.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
                aria-label="Tandai tugas selesai"
            >

            <div class="task-details">

                <h3>${escapeHTML(task.name)}</h3>

                <p>${escapeHTML(task.course)}</p>

                <small>📅 Deadline: ${formatDate(task.deadline)}</small>

                <div class="task-badges">

                    <span class="priority-badge ${priorityClass}">
                        ${task.priority}
                    </span>

                    <span class="status-badge">
                        ${deadlineStatus}
                    </span>

                </div>

            </div>

            <button class="delete-task" type="button" aria-label="Hapus tugas">
                ×
            </button>
        `;

        // UBAH STATUS

        taskItem.querySelector(".task-checkbox").addEventListener(
            "change",
            function() {

                const selectedTask = tasks.find(
                    item => item.id === task.id
                );

                selectedTask.completed = this.checked;

                saveTasks();
                renderTasks();

            }
        );

        // HAPUS TUGAS

        taskItem.querySelector(".delete-task").addEventListener(
            "click",
            function() {

                const confirmDelete = confirm(
                    "Yakin ingin menghapus tugas ini?"
                );

                if (!confirmDelete) return;

                tasks = tasks.filter(
                    item => item.id !== task.id
                );

                saveTasks();
                renderTasks();

            }
        );

        taskList.appendChild(taskItem);

    });

    updateSummary();

}

// FILTER TUGAS

taskFilter.addEventListener("change", renderTasks);

// AMANKAN TEKS INPUT

function escapeHTML(text) {

    return String(text).replace(/[&<>"']/g, function(char) {

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

renderTasks();