// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Fermer le menu mobile
    document.querySelector('.nav').classList.remove('active');
  });
});

function scrollToSection(id) {
  document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' });
}

// Menu mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('active');
});

// Gestion des actualités
const newsContainer = document.getElementById('news-container');
let news = JSON.parse(localStorage.getItem('koupeNews')) || [];

// Affichage des actualités
function displayNews() {
  newsContainer.innerHTML = '';
  news.forEach((item, index) => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
      <div class="news-body">
        <div class="news-date">${item.date}</div>
        <h3 class="news-title">${item.title}</h3>
        <p class="news-summary">${item.summary}</p>
        <button class="read-more" onclick="toggleFull(${index})">Lire plus</button>
        <div class="full-content" id="full-${index}">
          <p>${item.content}</p>
          <button class="read-more" onclick="toggleFull(${index})" style="background:#666; margin-top:1rem;">Réduire</button>
        </div>
      </div>
    `;
    newsContainer.appendChild(newsCard);
  });
}

// Afficher/Masquer le contenu complet
function toggleFull(index) {
  const full = document.getElementById(`full-${index}`);
  full.style.display = full.style.display === 'block' ? 'none' : 'block';
}

// Formulaire d'ajout d'actualité
document.getElementById('news-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const newNews = {
    title: document.getElementById('news-title').value,
    summary: document.getElementById('news-summary').value,
    content: document.getElementById('news-content').value,
    image: document.getElementById('news-image').value,
    date: document.getElementById('news-date').value || new Date().toLocaleDateString('fr-FR')
  };
  news.unshift(newNews);
  localStorage.setItem('koupeNews', JSON.stringify(news));
  this.reset();
  displayNews();
  alert('Actualité publiée avec succès !');
});

// Afficher le panneau admin
function toggleAdmin() {
  const admin = document.getElementById('admin');
  admin.style.display = admin.style.display === 'block' ? 'none' : 'block';
  if (admin.style.display === 'block') {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}

// Initialisation
displayNews();

// Données par défaut (exemple)
if (news.length === 0) {
  news = [
    {
      title: "Ouverture de l'atelier de formulation du plan de contingence de la commune de Kando Koupéla",
      summary: "10 novembre 2025 – Ce lundi, dans la salle de réunion de la mairie...",
      content: "La commune de Kando Koupéla a lancé ce lundi 10 novembre 2025 un atelier de formulation de son plan de contingence. Cet événement majeur réunit les acteurs locaux pour renforcer la résilience face aux risques naturels et humains. L'initiative vise à anticiper et gérer efficacement les crises futures.",
      image: "https://via.placeholder.com/600x400?text=Atelier+Koupéla",
      date: "10 novembre 2025"
    },
    {
      title: "22ᵉ Rencontre nationale Gouvernement/Secteur privé",
      summary: "Le Premier ministre appelle à un patriotisme économique...",
      content: "Lors de la 22ᵉ édition de la rencontre nationale entre le gouvernement et le secteur privé, le Premier ministre a insisté sur l'importance d'un patriotisme économique pour le développement du Burkina Faso. Cette rencontre vise à renforcer les partenariats public-privé.",
      image: "https://via.placeholder.com/600x400?text=Rencontre+Nationale",
      date: "10 novembre 2025"
    }
  ];
  localStorage.setItem('koupeNews', JSON.stringify(news));
  displayNews();
}