let servicios = [];

function mostrar(vista) {
  document.getElementById("home").style.display = "none";
  document.getElementById("nuevo").style.display = "none";

  document.getElementById(vista).style.display = "block";

  if (vista === "home") {
    mostrarLista();
  }
}

function guardar() {
  let cliente = document.getElementById("cliente").value;
  let origen = document.getElementById("origen").value;
  let destino = document.getElementById("destino").value;
  let precio = document.getElementById("precio").value;

  servicios.push({ cliente, origen, destino, precio });

  localStorage.setItem("servicios", JSON.stringify(servicios));

  alert("Guardado");

  mostrar("home");
}

function mostrarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  servicios.forEach((s, i) => {
    lista.innerHTML += `
      <div>
        ${s.cliente} - ${s.origen} → ${s.destino} ($${s.precio})
      </div>
    `;
  });
}

// cargar datos guardados
window.onload = () => {
  let datos = localStorage.getItem("servicios");
  if (datos) {
    servicios = JSON.parse(datos);
  }
};