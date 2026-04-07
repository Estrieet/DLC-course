document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-link');
  const popup = document.getElementById('popupBox');

  links.forEach((link) => {
    const message = link.dataset.popup;
    if (!message) return;

    link.addEventListener('pointerenter', () => showPopup(message));
    link.addEventListener('focus', () => showPopup(message));
    link.addEventListener('pointerleave', hidePopup);
    link.addEventListener('blur', hidePopup);
    link.addEventListener('touchstart', () => showPopup(message));
  });

  function showPopup(text) {
    popup.textContent = text;
    popup.classList.add('show');
    window.clearTimeout(popup.hideTimeout);
    popup.hideTimeout = window.setTimeout(hidePopup, 2500);
  }

  function hidePopup() {
    popup.classList.remove('show');
  }

  const completeLessonButtons = document.querySelectorAll('.complete-lesson');
  const savedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
  completeLessonButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.lessonIndex || '0');
      if (!index) return;
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      if (!completedLessons.includes(index)) {
        completedLessons.push(index);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        localStorage.setItem('lessonsCompleted', String(Math.min(14, completedLessons.length)));
        showPopup('Lesson marked complete.');
      } else {
        showPopup('This lesson is already marked complete.');
      }
    });
  });
});
