// Constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function () {
  /*
    Si Marca es 1(Americano) incrementa en 1.15
    Si Marca es 2(Asiatico) incrementa en 1.05
    Si Marca es 3(Europeo) incrementa en 1.35
  */

  let cantidad;
  const base = 2000;

  console.log(this.marca);
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;

    case "2":
      cantidad = base * 1.05;
      break;

    case "3":
      cantidad = base * 1.35;
      break;

    default:
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.year;

  // Cada añó que la diferencia es mayor el costo va areducirse al 3%
  cantidad -= (diferencia * 3 * cantidad) / 100;

  /*
    Si el seguro es basico se multiplica por un 30% mas
    Si el seguro es completo se multiplica por un 50% mas
  */
  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  return cantidad;
};
function UI() {}

// Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");
  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  // Insertar en el HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

// Instanciar UI
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); // Llena el select con los años
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // Leer la marca seleccionada
  const marca = document.querySelector("#marca").value;

  // Leer el aña seleccionado
  const year = document.querySelector("#year").value;

  // Leere el tipo de cobertura
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  // Validar campos vacios
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatarios", "error");
    return;
  }

  ui.mostrarMensaje("Cotizando...", "exito");

  // Instanaciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  seguro.cotizarSeguro();

  // Utilizar el prototype que va a cotizar
}
