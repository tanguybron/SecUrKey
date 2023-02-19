function btnDelete() {
  console.log('button clicked');
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.parentNode.remove();
      fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        },
        body: new URLSearchParams(new FormData(form)).toString()
      });
    });
  });
}

