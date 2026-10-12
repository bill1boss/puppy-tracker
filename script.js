document.addEventListener('DOMContentLoaded', () => {
  const skillForm = document.getElementById('skill-form');
  const skillInput = document.getElementById('skill-input');
  const skillsList = document.getElementById('skills-list');

  let skills = JSON.parse(localStorage.getItem('puppySkills')) || [];

  function saveSkills() {
    localStorage.setItem('puppySkills', JSON.stringify(skills));
  }

  function renderSkills() {
    skillsList.innerHTML = '';

    skills.forEach((skill, index) => {
      const li = document.createElement('li');
      li.className = 'skill-item';

      const skillName = document.createElement('span');
      skillName.className = 'skill-name';
      skillName.textContent = skill.name;

      const ratingContainer = document.createElement('div');
      ratingContainer.className = 'rating-paws';

      // Δημιουργία 5 πατουσών ως ΚΟΥΜΠΙΑ για να ανταποκρίνονται στα κινητά
      for (let i = 1; i <= 5; i++) {
        const paw = document.createElement('button');
        paw.type = 'button';
        paw.className = 'paw';
        paw.innerHTML = '🐾';

        if (i <= skill.rating) {
          paw.classList.add('active');
        }

        paw.addEventListener('click', (e) => {
          e.preventDefault();
          skills[index].rating = i;
          saveSkills();
          renderSkills();
        });

        ratingContainer.appendChild(paw);
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '❌';
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        skills.splice(index, 1);
        saveSkills();
        renderSkills();
      });

      li.appendChild(skillName);
      li.appendChild(ratingContainer);
      li.appendChild(deleteBtn);

      skillsList.appendChild(li);
    });
  }

  skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSkillName = skillInput.value.trim();

    if (newSkillName !== '') {
      skills.push({
        name: newSkillName,
        rating: 0
      });
      saveSkills();
      renderSkills();
      skillInput.value = '';
    }
  });

  renderSkills();
});