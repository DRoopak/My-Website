document.addEventListener('DOMContentLoaded', function() {
    // Enable smooth scrolling for entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle all navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav a, .main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 20;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section && section.offsetTop <= scrollPos && 
                section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
});
