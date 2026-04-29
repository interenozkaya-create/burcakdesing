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

function deleteProject(id) {
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
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    const targetTab = document.getElementById('tab-' + tabId);
    if(targetTab) targetTab.classList.add('active');

    document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
    if(element) {
        element.classList.add('active');
    }

    document.querySelector('.main-content').scrollTop = 0;
}

// Site Ayarları Yükleme
function loadSettings() {
    ['home', 'about', 'contact', 'services'].forEach(docName => {
        db.collection('settings').doc(docName).get().then(doc => {
            let data = doc.exists ? doc.data() : {};
            
            if(docName === 'home') {
                document.getElementById('set-hero-title').value = data.heroTitle || "Düşlerinizdeki\nMekanları\nTasarlıyoruz";
                document.getElementById('set-hero-desc').value = data.heroDesc || "Işık ve gölgenin buluştuğu, malzemenin lüksü tanımladığı\nözel mimari çözümler.";
            }
            if(docName === 'about') {
                document.getElementById('set-about-text').value = data.aboutText || "Ben Eren Özkaya — iç mimarı ve görselleştirme uzmanıyım. Yurt dışında geçirdiğim uzun yıllar boyunca, Kıbrıs başta olmak üzere farklı ülkelerde 60'tan fazla villa projesinde hem tasarım hem de mimari görselleştirme ürettim. Bu deneyim bana farklı kültürlerin mekâna bakış açısını ve farklı beklentileri yakından tanıma fırsatı verdi.\n\nSon 7 yıldır Ankara'da; tasarım, 3D görselleştirme ve uygulama olmak üzere projenin başından sonuna kadar bütüncül bir hizmet sunuyorum. Konut projelerinden ticari alanlara, ofislerden konaklama projelerine kadar geniş bir yelpazede çalışıyor, her projeyi kendi dinamiğiyle ele alıyorum.\n\nBenim için tasarım, her şeyden önce insanı anlamakla başlar. Kullandığım malzeme, seçtiğim renk, kurduğum mekânsal düzen — bunların hepsi o projeye ve o insana özgü kararların ürünüdür. Çünkü gerçekten iyi bir mekân, fotoğrafta değil; içinde geçirilen günlük hayatta kendini kanıtlar.";
            }
            if(docName === 'contact') {
                document.getElementById('set-email').value = data.email || "info@burcakdesign.com";
                document.getElementById('set-phone').value = data.phone || "+90 (538) 950 87 58";
                document.getElementById('set-address').value = data.address || "Çankaya, Ankara\nTürkiye";
            }
            if(docName === 'services') {
                document.getElementById('set-serv-1').value = data.serv1 || "Her proje, müşteriyle birlikte geliştirilen bir konseptle başlar. İhtiyaç analizi ve fikir geliştirme aşamasından teknik çizimlere, malzeme seçiminden ürün tedarikine kadar tasarım sürecinin tüm adımlarını eksiksiz yürütüyoruz.";
                document.getElementById('set-serv-2').value = data.serv2 || "Projenizi inşaat başlamadan önce gerçekçi görseller aracılığıyla deneyimlemenizi sağlıyoruz. İç mekân ve dış cephe görselleştirmesinin yanı sıra 360° sanal tur ve animasyon hizmetleriyle mekânınızı tüm detaylarıyla hissedebilirsiniz.";
                document.getElementById('set-serv-3').value = data.serv3 || "Tasarımın hayata geçirilmesi aşamasında 50'yi aşkın kişilik, bünyemizde yer alan deneyimli ve koordineli ekibimizle projenin başından sonuna kesintisiz hizmet sunuyoruz.";
            }
        });
    });

    loadCategories();
    loadNavItems();

}

// Dinamik Site Ayarları Kaydetme
function saveSettings(docName, elementIds, fieldNames) {
    const data = {};
    for (let i = 0; i < elementIds.length; i++) {
        data[fieldNames[i]] = document.getElementById(elementIds[i]).value;
    }
    data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    
    db.collection('settings').doc(docName).set(data, { merge: true }).then(() => {
        alert("Ayarlar başarıyla kaydedildi! Sitenize hemen yansıyacaktır.");
    }).catch(e => alert("Hata: " + e.message));
}

// Kategorileri Yükle
function loadCategories() {
    db.collection('settings').doc('categories').get().then(doc => {
        let cats = {
            "villa": "Villa / Konut", "apartman": "Apartman", "ev": "Ev / İç Mekan", 
            "ofis": "Ofis / Ticari", "restoran": "Restoran / Kafe", "otel": "Otel / Konaklama"
        };
        if(doc.exists && doc.data().list) {
            cats = doc.data().list;
        } else {
            db.collection('settings').doc('categories').set({list: cats}); // Default kaydet
        }
        
        const sel = document.getElementById('project-category');
        const listDiv = document.getElementById('category-list');
        if(sel) sel.innerHTML = '';
        if(listDiv) listDiv.innerHTML = '';
        
        for (const [key, val] of Object.entries(cats)) {
            if(sel) sel.innerHTML += `<option value="${key}">${val}</option>`;
            if(listDiv) listDiv.innerHTML += `
                <div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.05);padding:10px;border-radius:4px;">
                    <span>${val} <small style="color:#666">(${key})</small></span>
                    <button onclick="deleteCategory('${key}')" style="background:#cc0000;border:none;color:white;padding:4px 8px;border-radius:4px;cursor:pointer;">Sil</button>
                </div>
            `;
        }
    });
}

function addCategory() {
    const id = document.getElementById('new-cat-id').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const name = document.getElementById('new-cat-name').value.trim();
    if(!id || !name) return alert("Kategori ID ve İsim boş olamaz!");
    
    db.collection('settings').doc('categories').get().then(doc => {
        let cats = doc.exists && doc.data().list ? doc.data().list : {};
        cats[id] = name;
        db.collection('settings').doc('categories').set({list: cats}).then(() => {
            loadCategories();
            document.getElementById('new-cat-id').value = '';
            document.getElementById('new-cat-name').value = '';
        });
    });
}

function deleteCategory(id) {
    if(!confirm("Bu kategoriyi silmek istediğinize emin misiniz? (Önceden bu kategoriyle yüklenen projeler silinmez, sadece listede gözükmez)")) return;
    db.collection('settings').doc('categories').get().then(doc => {
        let cats = doc.exists && doc.data().list ? doc.data().list : {};
        delete cats[id];
        db.collection('settings').doc('categories').set({list: cats}).then(() => {
            loadCategories();
        });
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

// ===== NAVIGASYON YÖNETİMİ =====
let navItems = [];

function getDefaultNavItems() {
    return [
        {id:'anasayfa', label:'Ana Sayfa', href:'index.html', icon:'home_work', showInBottom:true, order:0},
        {id:'hakkimda', label:'Hakkımda', href:'#hakkimda', icon:'', showInBottom:false, order:1},
        {id:'hizmetler', label:'Hizmetler', href:'hizmetler.html', icon:'architecture', showInBottom:true, order:2},
        {id:'portfolyo', label:'Portfolyo', href:'portfolyo.html', icon:'layers', showInBottom:true, order:3},
        {id:'iletisim', label:'İletişim', href:'iletisim.html', icon:'mail', showInBottom:true, order:4}
    ];
}

function loadNavItems() {
    db.collection('settings').doc('navigation').get().then(doc => {
        navItems = (doc.exists && doc.data().items) ? doc.data().items : getDefaultNavItems();
        if (!doc.exists) {
            db.collection('settings').doc('navigation').set({items: navItems});
        }
        renderNavList();
    });
}

function renderNavList() {
    const listDiv = document.getElementById('nav-list');
    if (!listDiv) return;
    if (!navItems.length) {
        listDiv.innerHTML = '<p style="color:#888;">Menü öğesi yok.</p>';
        return;
    }
    listDiv.innerHTML = [...navItems].sort((a,b) => a.order - b.order).map(item => `
        <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.05);padding:12px 15px;border-radius:4px;">
            <div>
                <span style="font-weight:500;">${item.label}</span>
                <small style="color:#666;margin-left:10px;">${item.href}</small>
                ${item.showInBottom ? '<span style="background:rgba(205,164,94,0.2);color:var(--primary);font-size:11px;padding:2px 6px;border-radius:3px;margin-left:8px;">Mobil Alt Bar</span>' : ''}
            </div>
            <button onclick="deleteNavItem('${item.id}')" style="background:#cc0000;border:none;color:white;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:12px;">Sil</button>
        </div>
    `).join('');
}

function addNavItem() {
    const label = document.getElementById('new-nav-label').value.trim();
    const href = document.getElementById('new-nav-href').value.trim();
    const icon = document.getElementById('new-nav-icon').value.trim();
    const showInBottom = document.getElementById('new-nav-bottom').checked;
    if (!label || !href) return alert('Menü adı ve bağlantı boş olamaz!');
    const id = 'nav_' + Date.now();
    const maxOrder = navItems.length > 0 ? Math.max(...navItems.map(i => i.order)) + 1 : 5;
    navItems.push({id, label, href, icon, showInBottom, order: maxOrder});
    db.collection('settings').doc('navigation').set({items: navItems}).then(() => {
        renderNavList();
        document.getElementById('new-nav-label').value = '';
        document.getElementById('new-nav-href').value = '';
        document.getElementById('new-nav-icon').value = '';
        document.getElementById('new-nav-bottom').checked = false;
        alert('Menü öğesi eklendi! Sayfa yenilendiğinde görünecektir.');
    });
}

function deleteNavItem(id) {
    if (!confirm('Bu menü öğesini silmek istediğinize emin misiniz?')) return;
    navItems = navItems.filter(item => item.id !== id);
    db.collection('settings').doc('navigation').set({items: navItems}).then(() => renderNavList());
}

