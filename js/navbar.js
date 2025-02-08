const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('scrolled');
  }
});