module.exports = function convertirFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
  const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

  const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
  const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);

  return `${fechaFormateada} a las ${horaFormateada}`;
}
