const progressLines = document.querySelectorAll('.progress-line');
const circleBlocks = document.querySelectorAll('.circular-progress');

const animateProgress = (entry) => {
  const target = entry.target;
  const progress = target.dataset.progress || '0';
  const bar = target.querySelector('span');
  if (bar) {
    bar.style.width = `${progress}%`;
  }
};

const animateCircle = (entry) => {
  const target = entry.target;
  const progress = Number(target.dataset.progress || 0);
  const circle = target.querySelector('.circle-value');
  const label = target.querySelector('.circle-text span');
  const circumference = 276.46;
  if (circle) {
    const offset = circumference - (circumference * progress) / 100;
    circle.style.strokeDashoffset = offset;
  }
  if (label) {
    let current = 0;
    const step = Math.max(1, Math.round(progress / 30));
    const update = () => {
      current += step;
      if (current >= progress) {
        current = progress;
      }
      label.textContent = `${current}%`;
      if (current < progress) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (entry.target.classList.contains('progress-line')) {
      animateProgress(entry);
    }
    if (entry.target.classList.contains('circular-progress')) {
      animateCircle(entry);
    }
    obs.unobserve(entry.target);
  });
}, { threshold: 0.35 });

progressLines.forEach((line) => observer.observe(line));
circleBlocks.forEach((circle) => observer.observe(circle));

const rotatingWords = ['Cyber Security', 'Youtuber', 'Web Developer'];
const multipleText = document.querySelector('.multiple-text');
let rotatingIndex = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const typeWord = async (word) => {
  for (let i = 1; i <= word.length; i += 1) {
    multipleText.textContent = word.slice(0, i);
    await sleep(100);
  }
};

const deleteWord = async () => {
  const current = multipleText.textContent;
  for (let i = current.length; i >= 0; i -= 1) {
    multipleText.textContent = current.slice(0, i);
    await sleep(80);
  }
};

const rotateWords = async () => {
  if (!multipleText) return;

  while (true) {
    const word = rotatingWords[rotatingIndex];
    await typeWord(word);
    await sleep(1500);
    await deleteWord();
    rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
  }
};

if (multipleText) {
  multipleText.textContent = '';
  rotateWords();
}

/* ================= MOBILE MENU ================= */

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if(menuIcon){
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');

        if(menuIcon.classList.contains('bx-menu')){
            menuIcon.classList.replace('bx-menu','bx-x');
        }else{
            menuIcon.classList.replace('bx-x','bx-menu');
        }
    }
}

/* CLOSE MENU ON CLICK */

document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuIcon.classList.replace('bx-x','bx-menu');
    }
});

/* HEADER SHADOW ON SCROLL */

window.addEventListener('scroll', () => {

    const header = document.querySelector('.header');

    if(window.scrollY > 50){
        header.style.boxShadow =
        "0 0 25px rgba(47,201,255,0.15)";
    }else{
        header.style.boxShadow = "none";
    }
});
