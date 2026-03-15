
    const projectsData = JSON.parse(document.getElementById("projects-data").textContent);
    const projectsGrid = document.getElementById("projects-grid");

    projectsData.forEach((project) => {
      const card = document.createElement("div");
      card.className = "card project-card";

      const image = document.createElement("div");
      image.className = "project-image";
      if (project.image) {
        image.classList.add("has-img");
        const img = document.createElement("img");
        img.src = project.image;
        img.alt = project.imageAlt || project.title;
        img.loading = "lazy";
        image.appendChild(img);
      }
      if (!project.image) {
        image.setAttribute("aria-label", project.imageAlt || project.title);
      }

      const title = document.createElement("h3");
      title.textContent = project.title;

      const meta = document.createElement("p");
      meta.className = "project-meta";
      meta.textContent = project.meta;

      const list = document.createElement("ul");
      project.bullets.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });

      const actions = document.createElement("div");
      actions.className = "project-actions";

      const link = document.createElement("a");
      link.className = "btn primary small";
      link.textContent = project.linkLabel || "Ver site";
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noopener";
      actions.appendChild(link);

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(list);
      card.appendChild(actions);

      projectsGrid.appendChild(card);
    });

    const navbar = document.getElementById("navbar");
    const toggle = document.querySelector(".nav-toggle");
    const themeToggle = document.getElementById("theme-toggle");

    function applyTheme(theme) {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggle.textContent = "Tema Claro";
        themeToggle.setAttribute("aria-label", "Ativar tema claro");
      } else {
        document.documentElement.removeAttribute("data-theme");
        themeToggle.textContent = "Tema Escuro";
        themeToggle.setAttribute("aria-label", "Ativar tema escuro");
      }
      localStorage.setItem("portfolio-theme", theme);
    }

    const savedTheme = localStorage.getItem("portfolio-theme");
    applyTheme(savedTheme === "dark" ? "dark" : "light");

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });

    toggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".navbar a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
        if (window.innerWidth <= 850) {
          navbar.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("main section");
      const scrollPos = window.scrollY + 110;

      sections.forEach((sec) => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          const id = sec.id;
          document.querySelectorAll(".navbar a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
        }
      });
    });
  
