/* =========================================================
   ELEMENTOS PRINCIPAIS
   ========================================================= */

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");


/* =========================================================
   MENU MOBILE
   ========================================================= */

// Abre e fecha a barra lateral em ecrãs pequenos.
if (mobileMenu && sidebar) {

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

        const icon = mobileMenu.querySelector("i");

        const isOpen = sidebar.classList.contains("open");

        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);

    });
}


// Fecha o menu depois de escolher uma seção.
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!sidebar || !mobileMenu) return;

        sidebar.classList.remove("open");

        const icon = mobileMenu.querySelector("i");

        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");

    });

});


/* =========================================================
   DETALHES DOS PROJETOS
   ========================================================= */

// Expande os detalhes dentro do próprio cartão.
const detailButtons =
    document.querySelectorAll(".details-button");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const projectId = button.dataset.project;
        const details = document.getElementById(projectId);

        if (!details) return;

        const isOpen =
            details.classList.toggle("show");

        button.classList.toggle("open", isOpen);

        button.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

});


/* =========================================================
   NAVEGAÇÃO ATIVA
   ========================================================= */

// Identifica qual seção está atualmente visível.
const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const currentId =
                    entry.target.id;

                navLinks.forEach(link => {

                    const linkTarget =
                        link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        linkTarget === `#${currentId}`
                    );

                });

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );

sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   ANIMAÇÕES DE ENTRADA
   ========================================================= */

// Revela elementos suavemente quando aparecem no ecrã.
const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   FEEDBACK DOS CONTACTOS
   ========================================================= */

// Pequeno efeito visual ao clicar num contacto.
const contactLinks =
    document.querySelectorAll(".contact-item");

contactLinks.forEach(link => {

    link.addEventListener("click", () => {

        link.classList.add("clicked");

        setTimeout(() => {

            link.classList.remove("clicked");

        }, 300);

    });

});


/* =========================================================
   ANO AUTOMÁTICO
   ========================================================= */

// Atualiza automaticamente o ano do rodapé.
const currentYear =
    new Date().getFullYear();

document
    .querySelectorAll(".main-footer")
    .forEach(footer => {

        footer.innerHTML =
            footer.innerHTML.replace(
                "2026",
                currentYear
            );

    });