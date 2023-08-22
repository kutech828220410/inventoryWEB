function animateButton() {
    const button = document.querySelector('.animated-button');
    button.classList.add('clicked');
  
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  }