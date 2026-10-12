const skillForm = document.getElementById('skill-form');
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');

// Αρχικά βασικά skills στα ελληνικά
const defaultSkills = [
  { name: 'Κάθισε (Sit)', rating: 0 },
  { name: 'Μείνε (Stay)', rating: 0 },
  { name: 'Έλεγχος Δαγκώματος (Teething)', rating: 0 },
  { name: 'Σταμάτημα Γαψίματος (Demand Barking)', rating: 0 },
  { name: 'Βόλτα με Λουρί', rating: 0 }
];

// Φόρτωση από το LocalStorage ή χρήση των προεπιλεγμένων
let skills = JSON.parse(localStorage.getItem('puppy_skills_paws')) || defaultSkills;

// Το SVG γραφικό της πατούσας ως string
const pawSVG = `
<svg class="paw-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path d="M256 224c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm128-96c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm128-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 480c61.9 0 112-50.1 112-112s-50.1-112-112-112-112 50.1-112 112 50.1 112 112 112z"/>
</svg>
`;

function saveSkills() {
  localStorage.setItem('puppy_skills_paws', JSON.stringify(skills));
}

function renderSkills() {
  skillsList.innerHTML = '';

  skills.forEach((skill, index) => {
    const li = document.createElement('li');

    // Δημιουργία των 5 πατουσών ως κουμπιά με SVG
    let pawsHTML = '';
    for (let i = 1; i <= 5; i++) {
      const activeClass = i <= skill.rating ? 'active' : '';
      pawsHTML += `
        <button type="button" class="paw-btn ${activeClass}" onclick="setRating(${index}, ${i})" title="${i} από 5">
          ${pawSVG}
        </button>`;
    }

    li.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <button type="button" class="delete-btn" onclick="deleteSkill(${index})" title="Διαγραφή">🗑️</button>
      </div>
      <div class="paws">
        ${pawsHTML}
      </div>
    `;

    skillsList.appendChild(li);
  });
}

// Συνάρτηση για ορισμό βαθμολογίας (1 έως 5)
function setRating(skillIndex, pawCount) {
  skills[skillIndex].rating = pawCount;
  saveSkills();
  renderSkills();
}

// Προσθήκη νέου skill από τη φόρμα
skillForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = skillInput.value.trim();

  if (name !== '') {
    skills.push({ name: name, rating: 0 });
    saveSkills();
    renderSkills();
    skillInput.value = '';
  }
});

// Διαγραφή skill
function deleteSkill(index) {
  skills.splice(index, 1);
  saveSkills();
  renderSkills();
}

// Αρχική εμφάνιση λίστας
renderSkills();