document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img.lazyload');
  
    const loadImages = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazyload');
          observer.unobserve(img);
        }
      });
    };
  
    const observer = new IntersectionObserver(loadImages);
    lazyImages.forEach(image => observer.observe(image));
  });