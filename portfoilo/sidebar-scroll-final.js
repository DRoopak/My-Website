document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const links = document.querySelectorAll('.sidebar-nav a');
    
    // Smooth scroll to sections
    links.forEach(link => {
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
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        
        links.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop - 50 <= scrollPos && 
                section.offsetTop + section.offsetHeight > scrollPos) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Enhanced mouse wheel handling
    sidebar.addEventListener('wheel', function(e) {
        // Only prevent default if we're actually scrolling vertically
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            this.scrollBy({
                top: e.deltaY,
                behavior: 'smooth'
            });
        }
    });
});
