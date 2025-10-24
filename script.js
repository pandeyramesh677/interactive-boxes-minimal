const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
  box.addEventListener('click', () => {
    // Collapse other boxes
    boxes.forEach(b => {
      if (b !== box) {
        b.classList.remove('expanded');
      }
    });

    // Toggle clicked box
    box.classList.toggle('expanded');
  });
});
