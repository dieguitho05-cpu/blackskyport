// ======================
// VARIABLES
// ======================
let datos = JSON.parse(localStorage.getItem("datos")) || [];

// ======================
// FUNCIONES
// ======================

function mostrar(vista) {
  document.querySelectorAll(".vista").forEach(v => v.style.display = "none");
  document.getElementById(vista).style.display = "block";
}

function guardar() {
  const cliente = document.getElementById("cliente").value;
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const precio = document.getElementById("precio").value;

  const servicio = { cliente, origen, destino, precio };

  datos.push(servicio);

  localStorage.setItem("datos", JSON.stringify(datos));

  mostrarLista();
}

function mostrarLista() {
  const contenedor = document.getElementById("lista");
  contenedor.innerHTML = "";

  datos.forEach((d, i) => {
    contenedor.innerHTML += `
      <div>
        ${d.cliente} - ${d.origen} → ${d.destino} - S/ ${d.precio}
      </div>
    `;
  });
}

// ======================
// INICIO
// ======================
mostrarLista();