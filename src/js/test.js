function resizeWindow() {
  if (matchMedia) {
    const mq = window.matchMedia('(min-width: 60em)');
  
    mq.addListener(toggleMenu);
    toggleMenu(mq);
  }
}

function toggleMenu(mq) {
  const menu = document.getElementById('menu')

  // window is > 60em
  if (mq.matches) {    
    menu.classList.remove('overlay', 'overlay__panel')
    
    // window is < 60em
  } else {
    menu.classList.add('overlay', 'overlay__panel')  
  }
}

resizeWindow()

export default toggleMenu();
