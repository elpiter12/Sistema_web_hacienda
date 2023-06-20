//*Tomando el manejador de eventos para el bnt ver detalles*//
const btn_ver_detalles = document.querySelector('.ver-detalles')
var usuario = {
  nombre: 'Juan Jose Gil Castañeda',
  email: 'juan@example.com',
  edad: 25,
  estado_solicitud: 'sin revisión'
};


btn_ver_detalles.addEventListener('click',(e)=>{
	e.preventDefault();
	//disparamos la alerta en donde muestra detalles de ese registro
	swal({
	  title: 'Información de Usuario',
	  text: `Nombre: ${usuario.nombre}\nEmail: ${usuario.email}\nEdad: ${usuario.edad} \nEstado de la solicitud: ${estado_solicitud}`,
	  icon: 'info',
	  showCancelButton: true,
	    confirmButtonText: 'Botón principal',
	    cancelButtonText: 'Botón secundario',
	    buttonsStyling: false,
	    customClass: {
	      confirmButton: 'btn btn-primary',
	      cancelButton: 'btn btn-secondary'
	    }
	}).then((result) => {
	  if (result.isConfirmed) {
	    // Acción cuando se hace clic en el botón principal
	    alert("accion nomral")
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
	    // Acción cuando se hace clic en el botón secundario (cancelar)
	    alert("acccion cancelar!")
	  }
	});
})