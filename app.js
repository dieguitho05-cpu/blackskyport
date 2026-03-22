let datos = JSON.parse(localStorage.getItem("datos")) || [];

// ======================
// NAVEGACIÓN
// ======================
function mostrar(vista) {
  document.querySelectorAll(".vista").forEach(v => v.style.display = "none");
  document.getElementById(vista).style.display = "block";
}

// ======================
// GUARDAR
// ======================
function guardar() {
  const cliente = document.getElementById("cliente").value;
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const precio = document.getElementById("precio").value;

  if (!cliente || !origen || !destino || !precio) return;

  const servicio = { cliente, origen, destino, precio };

  datos.push(servicio);

  localStorage.setItem("datos", JSON.stringify(datos));

  mostrarLista();
}

// ======================
// MOSTRAR LISTA
// ======================
function mostrarLista() {
  const contenedor = document.getElementById("lista");
  contenedor.innerHTML = "";

  datos.forEach(d => {
    contenedor.innerHTML += `
      <div>
        ${d.cliente} - ${d.origen} → ${d.destino} - S/ ${d.precio}
      </div>
    `;
  });
}

// ======================
// EXPORTAR EXCEL
// ======================
function exportarExcel() {
  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, "Datos");

  XLSX.writeFile(libro, "blackskyport.xlsx");
}

// ======================
// IMPORTAR EXCEL
// ======================
document.getElementById("fileInput").addEventListener("change", function(e) {
  const archivo = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function(event) {
    const data = new Uint8Array(event.target.result);

    const workbook = XLSX.read(data, { type: "array" });

    const hoja = workbook.Sheets[workbook.SheetNames[0]];

    const json = XLSX.utils.sheet_to_json(hoja);

    datos = json;

    localStorage.setItem("datos", JSON.stringify(datos));

    mostrarLista();
  };

  reader.readAsArrayBuffer(archivo);
});

// ======================
// INICIO
// ======================
mostrarLista();