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