const skillForm = document.getElementById('skill-form');
const skillInput = document.getElementById('skill-input');
const skillsList = document.getElementById('skills-list');

const defaultSkills = [
  { name: 'Κάθισε (Sit)', rating: 0 },
  { name: 'Μείνε (Stay)', rating: 0 },
  { name: 'Έλεγχος Δαγκώματος (Teething)', rating: 0 },
  { name: 'Σταμάτημα Γαψίματος (Demand Barking)', rating: 0 },
  { name: 'Βόλτα με Λουρί', rating: 0 }
];

let skills = JSON.parse(localStorage.getItem('puppy_skills_paws')) || defaultSkills;

// Νέο, ρεαλιστικό SVG πατούσας (μεγάλο κεντρικό μαξιλαράκι + 4 δάχτυλα)
const pawSVG = `
<svg class="paw-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Κεντρικό μεγάλο μαξιλαράκι -->
  <path d="M256 224c-53 0-96 35.8-96 80 0 25.4 14.2 48 37.1 62.9C215.9 375.4 235.3 384 256 384s40.1-8.6 58.9-17.1C337.8 352 352 329.4 352 304c0-44.2-43-80-96-80z"/>
  <!-- Πάνω 4 δαχτυλάκια -->
  <circle cx="136" cy="192" r="36"/>
  <circle cx="216" cy="136" r="40"/>
  <circle cx="296" cy="136" r="40"/>
  <circle cx="376" cy="192" r="36"/>
</svg>
`;

function saveSkills() {
  localStorage.setItem('puppy_skills_paws', JSON.stringify(skills));
}

function renderSkills() {
  skillsList.innerHTML = '';

  skills.forEach((skill, index) => {
    const li = document.createElement('li');

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

function setRating(skillIndex, pawCount) {
  skills[skillIndex].rating = pawCount;
  saveSkills();
  renderSkills();
}

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

function deleteSkill(index) {
  skills.splice(index, 1);
  saveSkills();
  renderSkills();
}

renderSkills();