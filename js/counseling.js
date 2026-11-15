const serviceType = document.getElementById("serviceType");
const counselingForm = document.getElementById("counselingForm");
const formMessage = document.getElementById("formMessage");
const preferredDate = document.getElementById("preferredDate");

// Mencegah pengguna memilih tanggal yang sudah lewat
const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

preferredDate.min = localToday;


// Memilih jenis layanan
function selectService(type) {
    serviceType.value = type;

    document.getElementById("requestSection").scrollIntoView({
        behavior: "smooth"
    });
}


// Submit formulir
counselingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const service = serviceType.value;
    const date = preferredDate.value;
    const topic = document.getElementById("consultationTopic").value;

    if (!name || !email || !service || !date || !topic) {
        return;
    }

    // Simulasi pengajuan
    const request = {
        id: Date.now(),
        name,
        email,
        service,
        date,
        topic,
        note: document.getElementById("consultationNote").value,
        status: "Simulasi"
    };

    // Menyimpan data simulasi
    const requests = JSON.parse(
        localStorage.getItem("counselingRequests")
    ) || [];

    requests.push(request);

    localStorage.setItem(
        "counselingRequests",
        JSON.stringify(requests)
    );

    formMessage.hidden = false;

    formMessage.textContent =
        "Simulasi pengajuan berhasil disimpan. Fitur ini belum mengirim permintaan kepada konselor atau membuat jadwal konsultasi.";

    counselingForm.reset();

    preferredDate.min = localToday;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

});