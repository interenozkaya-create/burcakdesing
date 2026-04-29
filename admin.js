const firebaseConfig = {
    apiKey: "AIzaSyAtJHm7YPVoz7PsOhL6_HSyk_SURbi6EN8",
    authDomain: "burcakdesing.firebaseapp.com",
    projectId: "burcakdesing",
    storageBucket: "burcakdesing.firebasestorage.app",
    messagingSenderId: "977185073577",
    appId: "1:977185073577:web:39ff7a2ebf0fc366113cb8",
    measurementId: "G-RX6ZBPW3X1"
};

// Firebase Başlatma
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Arayüz Elemanları
const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const loginError = document.getElementById('login-error');

let currentImageUrl = null;

// Oturum Durumu Kontrolü
auth.onAuthStateChanged((user) => {
    if (user) {
        loginScreen.style.display = 'none';
        adminPanel.style.display = 'flex';
        loadProjects();
        loadSettings();
    } else {
        loginScreen.style.display = 'flex';
        adminPanel.style.display = 'none';
    }
});

// Giriş İşlemi
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            loginError.style.display = 'block';
            loginError.textContent = "Hata: " + error.message;
        });
}

// Çıkış İşlemi
function logout() {
    auth.signOut();
}

// Sürükle Bırak İşlemleri
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadText = document.getElementById('upload-text');
const uploadProgress = document.getElementById('upload-progress');
const saveBtn = document.getElementById('save-btn');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        uploadImage(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        uploadImage(e.target.files[0]);
    }
});

function uploadImage(file) {
    if (!file.type.startsWith('image/')) {
        alert('Lütfen sadece resim dosyası yükleyin.');
        return;
    }

    const fileName = Date.now() + '_' + file.name;
    const uploadTask = storage.ref('portfolyo/' + fileName).put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadProgress.style.width = progress + '%';
            uploadText.textContent = "Yükleniyor... %" + Math.round(progress);
        }, 
        (error) => {
            alert("Yükleme hatası: " + error.message);
            uploadText.textContent = "Hata oluştu, tekrar deneyin.";
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                currentImageUrl = downloadURL;
                uploadText.textContent = "Fotoğraf Yüklendi! ✅";
                uploadProgress.style.backgroundColor = "#4caf50";
                
                // Formu aktif et
                saveBtn.disabled = false;
                saveBtn.textContent = "Projeyi Kaydet";
            });
        }
    );
}

function saveProject() {
    const title = document.getElementById('project-title').value;
    const category = document.getElementById('project-category').value;

    if (!title || !currentImageUrl) {
        alert("Lütfen proje adı girin ve fotoğraf yükleyin.");
        return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = "Kaydediliyor...";

    db.collection('projects').add({
        title: title,
        category: category,
        imageUrl: currentImageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        // Formu temizle
        document.getElementById('project-title').value = '';
        currentImageUrl = null;
        uploadProgress.style.width = '0%';
        uploadProgress.style.backgroundColor = "var(--primary)";
        uploadText.textContent = "Fotoğrafı buraya sürükleyin veya seçmek için tıklayın";
        saveBtn.disabled = true;
        saveBtn.textContent = "Önce Fotoğraf Yükleyin";
        
        loadProjects(); // Listeyi yenile
    }).catch(error => {
        alert("Hata: " + error.message);
        saveBtn.disabled = false;
        saveBtn.textContent = "Projeyi Kaydet";
    });
}

function loadProjects() {
    const projectList = document.getElementById('project-list');
    
    db.collection('projects').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
        projectList.innerHTML = ''; // Temizle
        
        if (querySnapshot.empty) {
            projectList.innerHTML = '<p style="grid-column: 1/-1;">Henüz proje eklenmemiş.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            
            projectList.innerHTML += `
                <div class="project-card">
                    <img src="${data.imageUrl}" alt="${data.title}">
                    <div class="project-info">
                        <h4 class="project-title">${data.title}</h4>
                        <p class="project-category">${data.category}</p>
                    </div>
                    <button class="delete-btn" onclick="deleteProject('${id}', '${data.imageUrl}')">Sil</button>
                </div>
            `;
        });
    });
}

function deleteProject(id, imageUrl) {
    if(confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
        // Sadece Firestore'dan siliyoruz (Storage'dan silmek isterseniz ek kod gerekir)
        db.collection('projects').doc(id).delete().then(() => {
            loadProjects();
        }).catch(error => {
            alert("Hata: " + error.message);
        });
    }
}

// Sekme Değiştirme
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    
    document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Site Ayarları Yükleme
function loadSettings() {
    db.collection('settings').doc('general').get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if(data.heroTitle) document.getElementById('set-hero-title').value = data.heroTitle;
            if(data.heroDesc) document.getElementById('set-hero-desc').value = data.heroDesc;
            if(data.email) document.getElementById('set-email').value = data.email;
            if(data.phone) document.getElementById('set-phone').value = data.phone;
            if(data.address) document.getElementById('set-address').value = data.address;
        }
    });
}

// Site Ayarları Kaydetme
function saveSettings() {
    const btn = document.getElementById('save-settings-btn');
    btn.textContent = "Kaydediliyor...";
    
    db.collection('settings').doc('general').set({
        heroTitle: document.getElementById('set-hero-title').value,
        heroDesc: document.getElementById('set-hero-desc').value,
        email: document.getElementById('set-email').value,
        phone: document.getElementById('set-phone').value,
        address: document.getElementById('set-address').value,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => {
        btn.textContent = "Tüm Ayarları Kaydet";
        alert("Ayarlar başarıyla kaydedildi! Sitenize hemen yansıyacaktır.");
    }).catch(error => {
        alert("Hata: " + error.message);
        btn.textContent = "Tüm Ayarları Kaydet";
    });
}

// Eski 28 Projeyi Veritabanına Aktarma
function importOldProjects() {
    const oldProjects = [
        {title: "Obsidian Villa", cat: "villa", img: "images/villa1.png"},
        {title: "Noir Residence", cat: "villa", img: "images/villa2.png"},
        {title: "Shadow House", cat: "villa", img: "images/villa3.png"},
        {title: "Onyx Tower", cat: "apartman", img: "images/apt1.png"},
        {title: "Slate Residences", cat: "apartman", img: "images/apt2.png"},
        {title: "Obsidian Penthouse", cat: "ev", img: "images/salon1.png"},
        {title: "Noir Bedroom Suite", cat: "ev", img: "images/yatak1.png"},
        {title: "Dark Kitchen", cat: "ev", img: "images/mutfak1.png"},
        {title: "Spa Bathroom", cat: "ev", img: "images/banyo1.png"},
        {title: "Executive Office", cat: "ofis", img: "images/ofis1.png"},
        {title: "The Obsidian Kitchen", cat: "ev", img: "images/project1.png"},
        {title: "Aura Spa Retreat", cat: "otel", img: "images/project2.png"},
        {title: "Metropolis Highrise", cat: "apartman", img: "images/apt3.png"},
        {title: "Lumina Tower", cat: "apartman", img: "images/apt4.png"},
        {title: "Modern Living Room", cat: "ev", img: "images/ev1.png"},
        {title: "Minimalist Dining Area", cat: "ev", img: "images/ev2.png"},
        {title: "Luxury Master Bath", cat: "ev", img: "images/ev3.png"},
        {title: "Cozy Reading Nook", cat: "ev", img: "images/ev4.png"},
        {title: "Elegant Home Office", cat: "ev", img: "images/ev5.png"},
        {title: "Zen Bedroom", cat: "ev", img: "images/ev6.png"},
        {title: "Creative Studio", cat: "ofis", img: "images/ofis2.png"},
        {title: "Corporate Boardroom", cat: "ofis", img: "images/ofis3.png"},
        {title: "Tech Workspace", cat: "ofis", img: "images/ofis4.png"},
        {title: "Fine Dining Hall", cat: "restoran", img: "images/restoran2.png"},
        {title: "Cozy Cafe", cat: "restoran", img: "images/restoran3.png"},
        {title: "Grand Lobby", cat: "otel", img: "images/otel2.png"},
        {title: "Luxury Suite", cat: "otel", img: "images/otel3.png"},
        {title: "Rooftop Lounge", cat: "otel", img: "images/otel4.png"}
    ];
    
    const btn = document.getElementById('import-btn');
    btn.disabled = true;
    btn.textContent = "Aktarılıyor, lütfen bekleyin...";
    
    let count = 0;
    oldProjects.forEach(proj => {
        db.collection('projects').add({
            title: proj.title,
            category: proj.cat,
            imageUrl: proj.img,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Sıralamayı korumak biraz zor olabilir ama tarih ile hallederiz
        }).then(() => {
            count++;
            if(count === oldProjects.length) {
                alert("Tüm 28 proje başarıyla veritabanına aktarıldı!");
                btn.style.display = 'none';
                loadProjects();
            }
        });
    });
}
