
// Floating particles animation
document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const container = document.createElement('div');
  container.className = 'particles-container';
  hero.prepend(container);

  // Create 30 particles with random properties
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-7px
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration (10-20s)
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    
    // Random delay to stagger animations
    particle.style.animationDelay = `${Math.random() * -20}s`;
    
    container.appendChild(particle);

    // Recycle particles when animation ends
    particle.addEventListener('animationend', function() {
      particle.remove();
      createParticle(container);
    });
  }

  function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * -20}s`;
    
    container.appendChild(particle);
    
    particle.addEventListener('animationend', function() {
      particle.remove();
      createParticle(container);
    });
  }
});
