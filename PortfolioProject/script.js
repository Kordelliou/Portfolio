document.addEventListener('DOMContentLoaded', () => {
  // Плавная прокрутка
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Подсветка активного пункта меню
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.7 // Порог видимости секции
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, options);
  sections.forEach(section => observer.observe(section));

  // Анимация появления секций
  const revealSections = document.querySelectorAll('.about, .gallery, .contact');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Чтобы не триггерилось повторно
      }
    });
  });
  revealSections.forEach(section => revealObserver.observe(section));

  // Модальное окно для галереи
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img class="modal-image" src="" alt="Full Image">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector('.modal-image');
  const modalClose = modal.querySelector('.modal-close');
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('open');
      modalImage.src = img.src;
    });
  });
  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
});
