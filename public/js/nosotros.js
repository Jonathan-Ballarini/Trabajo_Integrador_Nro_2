document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                event.preventDefault();
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 20,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});



function isInView(element) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.bottom - rect.top;
    const visibilityThreshold = elementHeight * 0.3;

    return (
        rect.top < window.innerHeight && 
        rect.bottom > 0 &&
        rect.top < window.innerHeight - visibilityThreshold &&
        rect.bottom > visibilityThreshold
    );
}

function handleScrollAnimations() {
    const secciones = document.querySelectorAll('.secciones_nosotros');
    secciones.forEach(section => {
        if (isInView(section)) {
            section.classList.add('visible');
            section.classList.remove('anim-hidden');
        } else {
            section.classList.remove('visible');
            section.classList.add('anim-hidden');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);

window.addEventListener('load', handleScrollAnimations);

window.addEventListener('resize', handleScrollAnimations);

