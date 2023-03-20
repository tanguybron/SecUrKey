function btnDelete() {
  var result = confirm("Are you sure to delete?");
  if(result){
    console.log('button clicked');
    const btn1 = document.querySelectorAll('.btn1');
    btn1.addEventListener('click', event => {
      event.preventDefault();
      const form = btn1.closest('form');
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
  }
}