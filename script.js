const skillForm = document.getElementById('skill-form');
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');

// Αρχικά βασικά skills στα ελληνικά (με 0 αστέρια αρχικά)
const defaultSkills = [
  { name: 'Κάθισε (Sit)', rating: 0 },
  { name: 'Μείνε (Stay)', rating: 0 },
  { name: 'Έλεγχος Δαγκώματος (Teething)', rating: 0 },
  { name: 'Σταμάτημα Γαψίματος (Demand Barking)', rating: 0 },
  { name: 'Βόλτα με Λουρί', rating: 0 }
];

// Φόρτωση από το LocalStorage ή χρήση των προεπιλεγμένων
let skills = JSON.parse(localStorage.getItem('puppy_skills_el')) || defaultSkills;

function saveSkills() {
  localStorage.setItem('puppy_skills_el', JSON.stringify(skills));
}

function renderSkills() {
  skillsList.innerHTML = '';

  skills.forEach((skill, index) => {
    const li = document.createElement('li');

    // Δημιουργία των 5 αστεριών δυναμικά
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      const activeClass = i <= skill.rating ? 'active' : '';
      starsHTML += `<span class="star ${activeClass}" onclick="setRating(${index}, ${i})">★</span>`;
    }

    li.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <button class="delete-btn" onclick="deleteSkill(${index})" title="Διαγραφή">🗑️</button>
      </div>
      <div class="stars">
        ${starsHTML}
      </div>
    `;

    skillsList.appendChild(li);
  });
}

// Συνάρτηση για ορισμό βαθμολογίας με κλικ στα αστέρια (1 έως 5)
function setRating(skillIndex, starCount) {
  skills[skillIndex].rating = starCount;
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