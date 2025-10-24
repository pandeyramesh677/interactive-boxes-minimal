// Minimal vanilla JS for interactive boxes
document.addEventListener('DOMContentLoaded', function(){
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    const id = box.dataset.box;
    const toggle = box.querySelector('.toggle');
    const body = box.querySelector('.box-body');
    const colorBtns = box.querySelectorAll('.color');
    const sizeBtns = box.querySelectorAll('.size');
    const closeBtn = box.querySelector('.close');

    // Initial size
    box.classList.add('size-medium');

    // Helper to collapse others
    function collapseOthers(current){
      boxes.forEach(b => {
        if(b !== current){
          b.setAttribute('aria-expanded','false');
          const bBody = b.querySelector('.box-body');
          if(bBody) bBody.setAttribute('aria-hidden','true');
        }
      });
    }

    // Toggle expand/collapse
    function toggleBox(){
      const expanded = box.getAttribute('aria-expanded') === 'true';
      if(expanded){
        box.setAttribute('aria-expanded','false');
        body.setAttribute('aria-hidden','true');
      } else {
        collapseOthers(box);
        box.setAttribute('aria-expanded','true');
        body.setAttribute('aria-hidden','false');
      }
    }

    // Click handlers
    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      toggleBox();
    });

    // Header click toggles (but avoid when clicking controls)
    const header = box.querySelector('.box-header');
    header.addEventListener('click', function(e){
      if(e.target.closest('.options') || e.target === toggle) return;
      toggleBox();
    });

    // Keyboard accessibility
    box.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggleBox();
      }
    });

    // Color buttons change border/background
    colorBtns.forEach(btn => {
      btn.style.backgroundColor = btn.dataset.color;
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        const color = btn.dataset.color;
        box.style.borderColor = color;
        box.style.background = color + '10';
      });
    });

    // Size buttons
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const size = btn.dataset.size;
        box.classList.remove('size-small','size-medium','size-large');
        box.classList.add(size === 'small' ? 'size-small' : size === 'large' ? 'size-large' : 'size-medium');
      });
    });

    // Close button
    closeBtn.addEventListener('click', function(e){
      e.stopPropagation();
      box.setAttribute('aria-expanded','false');
      body.setAttribute('aria-hidden','true');
    });
  });
});
