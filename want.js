// Auto background changer for the hero section
const heroSection = document.querySelector('.hero-section');
const bgImages = [
  'Aerial drone shot of.png',
  'goes.png',
  'May 18, 2025, 09_46_35 AM.png',
  'realistic futuristic.png'
];

let currentBgIndex = 0;

// Set initial background
if (heroSection) {
  heroSection.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
}

function changeHeroBackground() {
  currentBgIndex = (currentBgIndex + 1) % bgImages.length;
  heroSection.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
}

setInterval(changeHeroBackground, 5000); // Change background every 5 seconds

// Form submission with name, email, message storage
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      // Here, you can store or send the data. For now, just alert it.
      alert(`Thank you, ${name}!\nWe received your message:\n"${message}"\nWe'll contact you at: ${email}`);
      
      // Optionally store in localStorage (temporary browser memory)
      localStorage.setItem('contactData', JSON.stringify({ name, email, message }));

      form.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// Nav toggle button functionality
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}
