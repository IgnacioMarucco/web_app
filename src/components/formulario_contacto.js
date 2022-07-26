const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  btn.value = 'Enviando';

  const serviceID = 'default_service';
  const templateID = 'template_4hs0gtn';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      Toastify({
        text: `Mensaje enviado correctamente`,
        duration: 3000,
        offset: {
          y: '5em'
        },
        close: true,
        style: {
          color: '#000',
          background: '#fcab31',
        }
      }).showToast();
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});