import { ConfigSingleton } from "./GetProfile.js";

let configData;

(async () => {
  try {
      const configInstance = await ConfigSingleton.getInstance();
      configData = configInstance.getConfig();
      updateHTML(configData);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  
function updateHTML(configData) {
  let projectTitle;

  document.querySelector("#pfThumbnail").src = "Content/".concat(configData.About.Thumbnail);
  document.querySelector("#pfLinkedIn").href = configData.Contact.LinkedIn;
  document.querySelector("#pfGitHub").href = configData.Contact.GitHub;
  
  projectTitle = configData.Project1.Title;
  if (projectTitle) {
    document.querySelector("#pfProject1Img").src = "Content/".concat(configData.Project1.MainImage);
    document.querySelector("#pfProject1Title").innerHTML = projectTitle;
    document.querySelector("#pfProject1Desc").innerHTML = configData.Project1.Desc;
    document.querySelector("#pfProject1Repo").href = configData.Project1.GitHubRepo;
    if (!configData.Project1.GitHubRepo) {
      document.querySelector("#pfProject1Repo").style.display = "none";
    }
    if (configData.Project1.DetailImages.length<1) {
      document.querySelector("#openProject1").style.display = "none";
    }
  } else {
    document.querySelector("#project1").style.display = "none";
  }
  
  projectTitle = configData.Project2.Title;
  if (projectTitle) {
    document.querySelector("#pfProject2Img").src = "Content/".concat(configData.Project2.MainImage);
    document.querySelector("#pfProject2Title").innerHTML = projectTitle;
    document.querySelector("#pfProject2Desc").innerHTML = configData.Project2.Desc;
    document.querySelector("#pfProject2Repo").href = configData.Project2.GitHubRepo;
    if (!configData.Project2.GitHubRepo) {
      document.querySelector("#pfProject2Repo").style.display = "none";
    }
    if (configData.Project2.DetailImages.length<1) {
      document.querySelector("#openProject2").style.display = "none";
    }
  } else {
    document.querySelector("#project2").style.display = "none";
  }

  projectTitle = configData.Project3.Title;
  if (projectTitle) {
    document.querySelector("#pfProject3Img").src = "Content/".concat(configData.Project3.MainImage);
    document.querySelector("#pfProject3Title").innerHTML = projectTitle;
    document.querySelector("#pfProject3Desc").innerHTML = configData.Project3.Desc;
    document.querySelector("#pfProject3Repo").href = configData.Project3.GitHubRepo;
    if (!configData.Project3.GitHubRepo) {
      document.querySelector("#pfProject3Repo").style.display = "none";
    }
    if (configData.Project3.DetailImages.length<1) {
      document.querySelector("#openProject3").style.display = "none";
    }
  } else {
    document.querySelector("#project3").style.display = "none";
  }
  
  projectTitle = configData.Project4.Title;
  if (projectTitle) {
    document.querySelector("#pfProject4Img").src = "Content/".concat(configData.Project4.MainImage);
    document.querySelector("#pfProject4Title").innerHTML = projectTitle;
    document.querySelector("#pfProject4Desc").innerHTML = configData.Project4.Desc;
    document.querySelector("#pfProject4Repo").href = configData.Project4.GitHubRepo;
    if (!configData.Project4.GitHubRepo) {
      document.querySelector("#pfProject4Repo").style.display = "none";
    }
    if (configData.Project4.DetailImages.length<1) {
      document.querySelector("#openProject4").style.display = "none";
    }
  } else {
    document.querySelector("#project4").style.display = "none";
  }
}

function addImages(imgs) {
  // First remove any existing images
  let il = document.querySelector("#imgList");
  while(il.firstChild) il.removeChild(il.firstChild);

  // Then add them in from the profile
  for (let i = 0; i < imgs.length; i++) {
    addListItem(imgs[i])
  }
}

function addListItem(newImg) {
  const newElem = document.createElement("img");
  newElem.setAttribute("src", "Content/".concat(newImg));
  const il = document.querySelector("#imgList");
  il.appendChild(newElem);
}

/* Handle the Carousel */
let slideIdx = 1;

document.querySelector("#next").onclick = () => {
  showImages(++slideIdx);
}

document.querySelector("#prev").onclick = () => {
  showImages(--slideIdx);
}

function showImages(n) {
  const slides = document.querySelectorAll("#imgList>img");
  if (n > slides.length) { slideIdx = 1 }
  if (n < 1) { slideIdx = slides.length }
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIdx - 1].style.display = "block";
}

document.querySelector("#openProject1").onclick = () => {
  addImages(configData.Project1.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  showImages(slideIdx);
}

document.querySelector("#openProject2").onclick = () => {
  addImages(configData.Project2.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  showImages(slideIdx);
}

document.querySelector("#openProject3").onclick = () => {
  addImages(configData.Project3.DetailImages);
  document.querySelector("#modalPage").style.display = "block";
  showImages(slideIdx);
}

document.querySelector("#XOut").onclick = () => {
  document.querySelector("#modalPage").style.display = "none";
}

window.onclick = (event) => {
  if (event.target == document.querySelector("#modalPage")) {
      document.querySelector("#modalPage").style.display = "none";
  }
}
