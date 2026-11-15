const assessmentForm = document.getElementById("assessmentForm");

assessmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let totalScore = 0;
    const totalQuestions = 5;

    // Mengambil jawaban pengguna
    for (let i = 1; i <= totalQuestions; i++) {

        const answer = document.querySelector(
            `input[name="q${i}"]:checked`
        );

        if (!answer) {
            alert("Silakan jawab semua pertanyaan terlebih dahulu.");
            return;
        }

        totalScore += Number(answer.value);
    }

    // Menentukan hasil refleksi
    let title = "";
    let description = "";

    if (totalScore <= 4) {

        title = "Kondisimu relatif terkendali";

        description =
            "Dari jawabanmu, tekanan akademik yang dirasakan " +
            "tampak relatif rendah. Tetap jaga keseimbangan " +
            "antara aktivitas kuliah dan waktu istirahat.";

    } else if (totalScore <= 9) {

        title = "Ada beberapa hal yang perlu diperhatikan";

        description =
            "Jawabanmu menunjukkan adanya beberapa tantangan " +
            "akademik yang mungkin memengaruhi keseharianmu. " +
            "Coba kenali hal yang paling membebani dan atur " +
            "kembali prioritas aktivitasmu.";

    } else {

        title = "Kamu mungkin sedang menghadapi tekanan akademik";

        description =
            "Jawabanmu menunjukkan bahwa tekanan akademik " +
            "cukup sering dirasakan. Pertimbangkan untuk " +
            "bercerita kepada orang yang kamu percaya atau " +
            "menghubungi layanan konseling kampus.";

    }

    // Menampilkan hasil
    document.getElementById("resultTitle").textContent = title;

    document.getElementById("resultDescription").textContent =
        description;

    document.getElementById("assessmentResult").hidden = false;

    document.getElementById("assessmentResult").scrollIntoView({
        behavior: "smooth"
    });

});