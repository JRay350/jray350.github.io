import { ConfigSingleton } from "./GetProfile.js";

let configData;
let slideIdx = 1;

// Make sure DOM is ready before touching it
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const configInstance = await ConfigSingleton.getInstance();
    configData = configInstance.getConfig();
    // Debug: make sure we really see 4 projects
    console.log("Config data:", configData);

    updateHTML(configData);
    initCarouselHandlers();
    initModalHandlers();
  } catch (error) {
    console.error("Error loading config:", error);
  }
});

function updateHTML(configData) {
  if (!configData) return;

  // ---- ABOUT / CONTACT ----
  const about = configData.About || {};
  const contact = configData.Contact || {};

  const pfThumbnail = document.querySelector("#pfThumbnail");
  if (pfThumbnail && about.Thumbnail) {
    pfThumbnail.src = "Content/" + about.Thumbnail;
  }

  const pfLinkedIn = document.querySelector("#pfLinkedIn");
  if (pfLinkedIn && contact.LinkedIn) {
    pfLinkedIn.href = contact.LinkedIn;
  }

  const pfGitHub = document.querySelector("#pfGitHub");
  if (pfGitHub && contact.GitHub) {
    pfGitHub.href = contact.GitHub;
  }

  // ---- PROJECTS 1–4 ----
  updateProjectUI(configData.Project1, 1);
  updateProjectUI(configData.Project2, 2);
  updateProjectUI(configData.Project3, 3);
  updateProjectUI(configData.Project4, 4);
}

function updateProjectUI(project, idx) {
  const projectContainer = document.querySelector(`#project${idx}`);
  if (!projectContainer) {
    // If the HTML doesn't have this section, just skip it
    return;
  }

  if (!project || !project.Title) {
    // If there is no data for this project, hide the block
    projectContainer.style.display = "none";
    return;
  }

  const img      = document.querySelector(`#pfProject${idx}Img`);
  const titleEl  = document.querySelector(`#pfProject${idx}Title`);
  const descEl   = document.querySelector(`#pfProject${idx}Desc`);
  const repoEl   = document.querySelector(`#pfProject${idx}Repo`);
  const openBtn  = document.querySelector(`#openProject${idx}`);

  if (img && project.MainImage) {
    img.src = "Content/" + project.MainImage;
  }

  if (titleEl) {
    titleEl.innerHTML = project.Title;
  }

  if (descEl && project.Desc) {
    descEl.innerHTML = project.Desc;
  }

  if (repoEl) {
    if (project.GitHubRepo) {
      repoEl.href = project.GitHubRepo;
      repoEl.style.display = "";
    } else {
      // Hide repo link when there’s no GitHub URL
      repoEl.style.display = "none";
    }
  }

  const hasDetailImages =
    Array.isArray(project.DetailImages) && project.DetailImages.length > 0;

  if (openBtn) {
    openBtn.style.display = hasDetailImages ? "" : "none";
  }

  // Make sure the project container itself is visible
  projectContainer.style.display = "";
}

/* ---------- IMAGE LIST & CAROUSEL ---------- */

function addImages(imgs) {
  const il = document.querySelector("#imgList");
  if (!il) return;

  while (il.firstChild) il.removeChild(il.firstChild);
  if (!Array.isArray(imgs)) return;

  imgs.forEach(src => addListItem(src));

  slideIdx = 1;
  showImages(slideIdx);
}

function addListItem(newImg) {
  const il = document.querySelector("#imgList");
  if (!il) return;

  const newElem = document.createElement("img");
  newElem.setAttribute("src", "Content/" + newImg);
  il.appendChild(newElem);
}

function initCarouselHandlers() {
  const nextBtn = document.querySelector("#next");
  const prevBtn = document.querySelector("#prev");

  if (nextBtn) {
    nextBtn.onclick = () => showImages(++slideIdx);
  }
  if (prevBtn) {
    prevBtn.onclick = () => showImages(--slideIdx);
  }
}

function showImages(n) {
  const slides = document.querySelectorAll("#imgList > img");
  if (!slides || slides.length === 0) return;

  if (n > slides.length) slideIdx = 1;
  if (n < 1) slideIdx = slides.length;

  slides.forEach(slide => (slide.style.display = "none"));
  slides[slideIdx - 1].style.display = "block";
}

/* ---------- MODAL HANDLERS ---------- */

function initModalHandlers() {
  const modal = document.querySelector("#modalPage");
  const xOut  = document.querySelector("#XOut");

  for (let i = 1; i <= 4; i++) {
    const openBtn = document.querySelector(`#openProject${i}`);
    if (!openBtn) continue;

    openBtn.onclick = () => {
      if (!configData) return;

      const project = configData[`Project${i}`];
      if (!project || !Array.isArray(project.DetailImages)) return;

      addImages(project.DetailImages);
      if (modal) modal.style.display = "block";
    };
  }

  if (xOut && modal) {
    xOut.onclick = () => {
      modal.style.display = "none";
    };
  }

  window.onclick = (event) => {
    if (modal && event.target === modal) {
      modal.style.display = "none";
    }
  };
}
