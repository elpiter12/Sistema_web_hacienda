document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#btn_consultar_estado').addEventListener('click' , e=>{
		Swal.fire({
		  title: 'Puedes consultar el estado de tu patente comercial ',
		  text: 'Puedes ponerte en contacto directamente con el departamento de Hacienda Municipal Mediante este numero de telefono 0414-5057588',
		  icon: 'info',
		  confirmButtonText: 'Ok Listo!'
		});
	})
   // Obtener la cadena de consulta de la URL
   const queryString = window.location.search;

   // Crear una instancia de URLSearchParams para analizar la cadena de consulta
   const urlParams = new URLSearchParams(queryString);

   // Obtener el valor de un parámetro específico por su nombre
   const mensaje = urlParams.get('mensaje');
   const error = urlParams.get('error');
   if(!error && mensaje != undefined){
   	Swal.fire({
   	  title: 'MENSAJE ENVIADO!',
   	  text: 'Mensajes Enviado Correctamente! :) Nos pondremos en contacto contigo lo mas pronto posible',
   	  icon: 'success',
   	  confirmButtonText: 'OK!'
   	});
   }

});