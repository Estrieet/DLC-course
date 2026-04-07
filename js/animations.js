document.addEventListener('DOMContentLoaded', () => {
  const progressive = document.querySelectorAll('.delay-1, .delay-2, .delay-3, .delay-4, .delay-5, .delay-6');
  progressive.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
  });
});
