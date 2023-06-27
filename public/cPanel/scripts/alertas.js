
		document.addEventListener('DOMContentLoaded', function() {
			
			// Obtener la cadena de consulta de la URL
			const queryString = window.location.search;

			// Crear una instancia de URLSearchParams para analizar la cadena de consulta
			const urlParams = new URLSearchParams(queryString);

			// Obtener el valor de un parámetro específico por su nombre
			const mensaje = urlParams.get('mensaje');
			const error = urlParams.get('error');
			if(error == 'true'){
				Swal.fire({
				  title: 'Error',
				  text: 'Ha ocurrido un error inesperado',
				  icon: 'error',
				  confirmButtonText: 'Aceptar'
				});

			}else if(error == 'false'){
				Swal.fire({
				  title: 'Noticias Creada con exito!',
				  text: mensaje,
				  icon: 'success',
				  confirmButtonText: 'Aceptar'
				});

			}
		});