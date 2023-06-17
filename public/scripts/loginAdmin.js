const form = document.querySelector('#form_login');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos de correo electrónico y contraseña
  const correo = document.getElementById('correo').value;
  const pass = document.getElementById('pass').value;
  
  // Obtener el host desde el elemento script en el HTML
  const scriptElement = document.querySelector('script[data-host]');
  const host = scriptElement.getAttribute('data-host');


  // Verificar que se obtuvo el host correctamente
  if (!host) {
    console.error('No se pudo obtener el host');
    return;
  }

  const apiURL = host;
  console.log(apiURL)
  console.log(correo)
  console.log(pass)
  // Realizar la petición al servidor para obtener el token
 
 let myHeaders = new Headers();
 myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

 let urlencoded = new URLSearchParams();
 urlencoded.append("correo", `${correo}`);
 urlencoded.append("pass", `${pass}`);

 let requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: urlencoded,
   redirect: 'follow'
 };

 fetch(host+'/auth', requestOptions)
   .then(response => response.json())
   .then(result =>{ 
    // Ejemplo de uso de SweetAlert

    if(result.err == true){
      console.log(result);
      Swal.fire({
        title: 'Mensaje',
        text: `${result.mensaje}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }else{
      console.log("Deberia haber algo en las cookies")
      window.location.href = '/cpanel';
    }


   })
   .catch(error => console.log('error', error));
});