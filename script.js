function getRandomPointInView() {
  // Get viewport dimensions
  const viewportWidth = window.screen.width;
  const viewportHeight = window.screen.height;

  const randomX = Math.floor(Math.random() * viewportWidth);
  const randomY = Math.floor(Math.random() * viewportHeight);

  return { top: randomX, left: randomY };
}

function setUrlForTextAnimation() {
  let width = screen.width;
  let animation_container = document.getElementById('animated-text')
  if (width < 375) {
    animation_container.innerHTML = `<img src="https://readme-typing-svg.herokuapp.com?font=Kode Mono=&size=20&width=300&Center=true&color=F7F7F7&lines=Shrawan sunar,;Computer+Science+Student,;Self-taught+Developer,;ML+Enthusiast,;Active+Learner/Researcher,;"></img>`

  }
  else if (width < 500) {
    animation_container.innerHTML = `<img src="https://readme-typing-svg.herokuapp.com?font=Kode Mono=&size=24&width=350&Center=true&color=F7F7F7&lines=Shrawan sunar,;Computer+Science+Student,;Self-taught+Developer,;ML+Enthusiast,;Active+Learner/Researcher,;"></img>`
  } else {
    animation_container.innerHTML = `<img src="https://readme-typing-svg.herokuapp.com?font=Kode Mono=&size=30&width=450&Center=true&color=F7F7F7&lines=Shrawan sunar,;Computer+Science+Student,;Self-taught+Developer,;ML+Enthusiast,;Active+Learner/Researcher,;"></img>`
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setUrlForTextAnimation();
  updateNavText();

  const iconContainer = document.querySelector('.icon-container');
  const icons = iconContainer.querySelectorAll('.floating-icon');

  // Define initial positions for each icon type
  const initialPositions = {
    'linkedin-icon': getRandomPointInView(),
    'github-icon': getRandomPointInView(),
    'instagram-icon': getRandomPointInView(),
    'facebook-icon': getRandomPointInView(),
  };

  let animationFrames = {}; // Object to store animation frames for each icon

  function startFloating() {
    icons.forEach(icon => {
      const iconType = icon.classList[1];
      const iconSize = icon.offsetWidth;
      const initialTop = initialPositions[iconType].top;
      const initialLeft = initialPositions[iconType].left;
      const maxX = window.innerWidth - iconSize;
      const maxY = window.innerHeight - iconSize;


      let x = initialLeft;
      let y = initialTop;

      // Initialize random floating direction and speed
      let deltaX = (Math.random() - 0.5) * 2;
      let deltaY = (Math.random() - 0.5) * 2;
      const speed = Math.random() * 2 + 2; // Random speed between 1 and 4 pixels per frame

      // Animation loop
      function floatStep() {

        // Check if the icon is out of bounds and adjust its position
        if (x < 0) {
          x = 0;
          deltaX *= -1;
        }
        if (x > maxX) {
          x = maxX;
          deltaX *= -1;
        }
        if (y < 0) {
          y = 0;
          deltaY *= -1;
        }
        if (y > maxY) {
          y = maxY;
          deltaY *= -1;
        }

        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;

        // Update position based on direction and speed
        x += deltaX * speed;
        y += deltaY * speed;

        animationFrames[iconType] = requestAnimationFrame(floatStep);
      }

      animationFrames[iconType] = requestAnimationFrame(floatStep);
    });
  }

  // Start floating initially
  startFloating();

  // Event listener for the button click
});

function updateNavText() {
  const sections = document.querySelectorAll('.containers');
  const statusDiv = document.querySelector('.nav-text');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Update the text of the status div based on the intersecting section's ID
        statusDiv.textContent = entry.target.id
      }
    });
  }, { threshold: 0.4 }); // Trigger when at least 40% of the section is in view

  sections.forEach(section => {
    console.log(section)
    observer.observe(section);
  });
}

