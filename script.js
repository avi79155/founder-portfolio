// Mobile navigation
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        menuToggle.textContent = '☰';
      });
    });

    // Reveal cards as they enter the viewport; content remains visible if reduced motion is preferred.
    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add('visible'));
    }

    // Highlight the active section in the navigation.
    const sections = document.querySelectorAll('main section, header#home');
    const navAnchors = navLinks.querySelectorAll('a');
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navAnchors.forEach(anchor => {
              anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + entry.target.id);
            });
          }
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      sections.forEach(section => sectionObserver.observe(section));
    }

    // Contact form uses mailto; it has no backend and does not store submissions.
    document.getElementById('contactForm').addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('visitorName').value.trim();
      const email = document.getElementById('visitorEmail').value.trim();
      const message = document.getElementById('visitorMessage').value.trim();
      const subject = encodeURIComponent('Portfolio enquiry from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
      window.location.href = 'mailto:avi79155@gmail.com?subject=' + subject + '&body=' + body;
    });

    document.getElementById('year').textContent = new Date().getFullYear();
