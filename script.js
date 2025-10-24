(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
      const id = box.dataset.box;
      const toggleBtn = box.querySelector('.toggle-btn');
      const body = box.querySelector('.box-body');
      const content = box.querySelector('.content-area');
      const colorRadios = box.querySelectorAll(`input[name="color-${id}"]`);
      const sizeSelect = box.querySelector(`select[name="size-${id}"]`);
      const resetBtn = box.querySelector('.reset-btn');

      // Set initial default size to small
      sizeSelect.value = 'small';
      box.classList.add('size-small');
      content.style.height = '64px'; // enough for controls

      // Apply color
      function applyColor() {
        const checked = box.querySelector(`input[name="color-${id}"]:checked`);
        const hex = checked ? checked.value : '#ffffff';
        box.style.borderColor = hex;
        box.style.background = `linear-gradient(0deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), ${hex}22`;
        content.style.background = `${hex}12`;
      }

      // Apply size
// Apply size function
function applySize() {
  const size = sizeSelect ? sizeSelect.value : 'small';
  box.classList.remove('size-small','size-medium','size-large');
  box.classList.add(size === 'small' ? 'size-small' : size === 'large' ? 'size-large' : 'size-medium');

  // Adjust content area height
  if(size === 'small') content.style.height = '64px';
  else if(size === 'medium') content.style.height = '140px';
  else content.style.height = '220px';

  // Always show reset button
  resetBtn.style.display = 'inline-flex';
}

      applyColor();
      applySize();

      function collapseAllExcept(except) {
        boxes.forEach(b => {
          if (b !== except) {
            b.setAttribute('aria-expanded', 'false');
            const bBody = b.querySelector('.box-body');
            if (bBody) bBody.setAttribute('aria-hidden', 'true');
          }
        });
      }

    
// When box opens, default to small size
function toggle() {
  const expanded = box.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    box.setAttribute('aria-expanded', 'false');
    body.setAttribute('aria-hidden', 'true');
  } else {
    collapseAllExcept(box);
    box.setAttribute('aria-expanded', 'true');
    body.setAttribute('aria-hidden', 'false');

    // Reset size to small on open
    sizeSelect.value = 'small';
    applySize();
  }
}


      toggleBtn.addEventListener('click', function(e){
        e.stopPropagation();
        toggle();
      });

      const header = box.querySelector('.box-header');
      header.addEventListener('click', function(e){
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON') return;
        toggle();
      });

      box.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });

      colorRadios.forEach(r => r.addEventListener('change', applyColor));
      sizeSelect.addEventListener('change', applySize);

resetBtn.addEventListener('click', function(e){
  e.stopPropagation();
  // Reset size to small and first color
  const radios = box.querySelectorAll(`input[name="color-${id}"]`);
  if (radios && radios.length) radios[0].checked = true;

  if(sizeSelect) sizeSelect.value = 'small';
  applyColor();
  applySize();
});
    });
  });
})();
