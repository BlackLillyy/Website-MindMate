const articles = [
    {
        id: 1,
        title: "Memahami Burnout Akademik pada Mahasiswa",
        category: "Mental Health",
        description: "Mengenali kelelahan akademik dan pentingnya menjaga keseimbangan.",
        icon: "☁",
        cover: "cover-lavender",
        content: [
            {
                heading: "Apa itu burnout akademik?",
                text: "Burnout akademik merupakan kondisi kelelahan yang berkaitan dengan tekanan dan tuntutan kegiatan akademik. Kondisi ini dapat memengaruhi motivasi, konsentrasi, dan pengalaman mahasiswa dalam menjalani perkuliahan."
            },
            {
                heading: "Hal yang perlu diperhatikan",
                text: "Kesulitan berkonsentrasi, kehilangan motivasi belajar, merasa kewalahan dengan tugas, dan kelelahan berkepanjangan dapat menjadi hal yang perlu diperhatikan. Pengalaman setiap orang bisa berbeda."
            },
            {
                heading: "Apa yang bisa dilakukan?",
                text: "Cobalah membagi pekerjaan menjadi bagian yang lebih kecil, menyusun prioritas, memberi jeda istirahat, dan mencari dukungan ketika beban terasa sulit dihadapi."
            }
        ]
    },

    {
        id: 2,
        title: "Mengelola Stres di Tengah Kesibukan Kuliah",
        category: "Mental Health",
        description: "Memahami sumber stres dan membangun strategi untuk menghadapinya.",
        icon: "🌱",
        cover: "cover-sage",
        content: [
            {
                heading: "Mengenali sumber stres",
                text: "Stres selama perkuliahan dapat berkaitan dengan tugas, ujian, organisasi, hubungan sosial, maupun perubahan lingkungan. Mengenali sumber tekanan dapat membantu menentukan langkah yang sesuai."
            },
            {
                heading: "Mengatur aktivitas",
                text: "Buat daftar aktivitas berdasarkan prioritas. Hindari memaksakan semua pekerjaan selesai dalam satu waktu. Berikan ruang untuk istirahat dan kegiatan pribadi."
            },
            {
                heading: "Mencari dukungan",
                text: "Berbagi cerita dengan teman, keluarga, dosen pembimbing, atau konselor dapat membantu ketika tekanan terasa sulit dikelola sendiri."
            }
        ]
    },

    {
        id: 3,
        title: "Pentingnya Self-Care bagi Mahasiswa",
        category: "Self Care",
        description: "Membangun kebiasaan sederhana untuk memperhatikan kebutuhan diri.",
        icon: "♡",
        cover: "cover-peach",
        content: [
            {
                heading: "Apa itu self-care?",
                text: "Self-care adalah upaya memperhatikan kebutuhan fisik, emosional, dan sosial diri sendiri melalui kebiasaan yang mendukung kesejahteraan."
            },
            {
                heading: "Mulai dari hal sederhana",
                text: "Memenuhi kebutuhan istirahat, menjaga pola makan yang teratur, melakukan aktivitas yang disukai, dan memberi waktu untuk diri sendiri merupakan beberapa contoh self-care."
            },
            {
                heading: "Tidak harus sempurna",
                text: "Self-care bukan tentang menjalankan rutinitas yang rumit. Mulailah dari kebiasaan kecil yang realistis dan sesuai dengan kebutuhanmu."
            }
        ]
    },

    {
        id: 4,
        title: "Menyusun Prioritas dan Mengelola Deadline",
        category: "Productivity",
        description: "Strategi sederhana untuk mengatur tugas dan waktu perkuliahan.",
        icon: "◷",
        cover: "cover-lavender",
        content: [
            {
                heading: "Catat semua tanggung jawab",
                text: "Tuliskan tugas, kegiatan, dan deadline yang perlu diselesaikan agar tidak ada hal penting yang terlewat."
            },
            {
                heading: "Tentukan prioritas",
                text: "Perhatikan tingkat urgensi dan waktu pengerjaan setiap tugas. Kerjakan hal yang paling mendesak atau membutuhkan persiapan lebih awal."
            },
            {
                heading: "Evaluasi progres",
                text: "Periksa kembali daftar tugas secara berkala. Jika rencana awal tidak berjalan, sesuaikan prioritas tanpa mengabaikan kebutuhan istirahat."
            }
        ]
    },

    {
        id: 5,
        title: "Menghadapi Tekanan Menjelang Ujian",
        category: "Academic Life",
        description: "Mempersiapkan diri menghadapi ujian dengan lebih terarah.",
        icon: "✎",
        cover: "cover-peach",
        content: [
            {
                heading: "Persiapan lebih awal",
                text: "Membagi materi menjadi beberapa bagian dan membuat jadwal belajar dapat membantu menghindari penumpukan persiapan menjelang ujian."
            },
            {
                heading: "Gunakan metode belajar yang sesuai",
                text: "Kamu bisa mencoba latihan soal, membuat rangkuman, berdiskusi, atau menjelaskan kembali materi dengan bahasamu sendiri."
            },
            {
                heading: "Perhatikan kebutuhan diri",
                text: "Persiapan ujian juga perlu disertai istirahat dan waktu jeda. Jangan menjadikan belajar sebagai satu-satunya aktivitas dalam keseharian."
            }
        ]
    },

    {
        id: 6,
        title: "Membangun Kebiasaan Produktif yang Realistis",
        category: "Productivity",
        description: "Memulai rutinitas produktif tanpa harus menuntut diri secara berlebihan.",
        icon: "✧",
        cover: "cover-sage",
        content: [
            {
                heading: "Mulai dari target kecil",
                text: "Pilih satu atau dua aktivitas sederhana yang ingin diselesaikan setiap hari. Target yang realistis lebih mudah dievaluasi dan disesuaikan."
            },
            {
                heading: "Konsistensi dan fleksibilitas",
                text: "Rutinitas dapat berubah mengikuti kondisi dan kebutuhan. Tidak semua hari harus berjalan sesuai rencana."
            },
            {
                heading: "Apresiasi proses",
                text: "Perhatikan progres yang sudah dicapai, termasuk langkah kecil. Evaluasi rutinitas tanpa menjadikan kesalahan sebagai alasan untuk menyalahkan diri."
            }
        ]
    }
];

let selectedCategory = "Semua";

const articleGrid = document.getElementById("articleGrid");
const searchInput = document.getElementById("searchInput");
const articleCount = document.getElementById("articleCount");
const noResult = document.getElementById("noResult");

function renderArticles() {
    const keyword = searchInput.value.toLowerCase();

    const filteredArticles = articles.filter(article => {
        const matchCategory =
            selectedCategory === "Semua" ||
            article.category === selectedCategory;

        const matchKeyword =
            article.title.toLowerCase().includes(keyword) ||
            article.description.toLowerCase().includes(keyword) ||
            article.category.toLowerCase().includes(keyword);

        return matchCategory && matchKeyword;
    });

    articleCount.textContent = `${filteredArticles.length} Artikel`;

    noResult.hidden = filteredArticles.length !== 0;

    articleGrid.innerHTML = filteredArticles.map(article => `
        <article class="article-card">

            <div class="article-cover ${article.cover}">
                ${article.icon}
            </div>

            <div class="article-info">
                <span class="article-category">
                    ${article.category}
                </span>

                <h3>${article.title}</h3>

                <p>${article.description}</p>

                <button class="article-read"
                    onclick="openArticle(${article.id})">
                    Baca Selengkapnya →
                </button>
            </div>

        </article>
    `).join("");
}

// CATEGORY FILTER
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        renderArticles();
    });
});

// SEARCH
searchInput.addEventListener("input", renderArticles);

// OPEN ARTICLE DETAIL
function openArticle(id) {
    const article = articles.find(item => item.id === id);

    if (!article) return;

    const detail = document.getElementById("articleDetail");
    const detailContent = document.getElementById("articleDetailContent");

    detailContent.innerHTML = `
        <span class="detail-category">${article.category}</span>

        <h1 class="detail-title">${article.title}</h1>

        <p class="detail-description">${article.description}</p>

        <div class="detail-body">
            ${article.content.map(section => `
                <h3>${section.heading}</h3>
                <p>${section.text}</p>
            `).join("")}
        </div>
    `;

    document.getElementById("featuredArticle").hidden = true;
    document.querySelector(".article-search").hidden = true;
    document.querySelector(".category-section").hidden = true;
    document.querySelector(".article-section").hidden = true;

    detail.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// CLOSE ARTICLE DETAIL
function closeArticle() {
    document.getElementById("articleDetail").hidden = true;

    document.getElementById("featuredArticle").hidden = false;
    document.querySelector(".article-search").hidden = false;
    document.querySelector(".category-section").hidden = false;
    document.querySelector(".article-section").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// INITIALIZE
renderArticles();