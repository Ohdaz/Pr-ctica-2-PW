const formulario = document.getElementById('formularioRegistro');

if (formulario) {
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const cuenta = document.getElementById('cuenta').value.trim();
        const charla = document.getElementById('charla').value.trim();

        if (!nombre || !cuenta || charla === "Selecciona una charla...") {
            alert('Todos los campos son obligatorios');
            return;
        }

        const alumno = {
            id: Date.now(), 
            nombre: nombre,
            cuenta: cuenta,
            charla: charla,
        };

        let panelistas = JSON.parse(localStorage.getItem('panelistas')) || [];
        panelistas.push(alumno);
        localStorage.setItem('panelistas', JSON.stringify(panelistas));

        alert('Registro realizado con éxito');

        formulario.reset();

        console.log('Alumno registrado:', alumno);
        console.log('Contenido actual en LocalStorage:', panelistas);

        if (document.getElementById('content')) {
            lista();
        }
    });
}

function lista() {
    const contenedor = document.getElementById('content');
    if (!contenedor) return;

    const panelistas = JSON.parse(localStorage.getItem('panelistas')) || [];
    contenedor.innerHTML = '';

    if (panelistas.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No hay registros disponibles.</p></div>';
        return;
    }

    const tablaHTML = `
        <div class="table-responsive">
            <table class="table table-hover table-bordered shadow-sm">
                <thead class="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                </tbody>
            </table>
        </div>
    `;

    contenedor.innerHTML = tablaHTML;
    const cuerpoTabla = document.getElementById('cuerpoTabla');

    panelistas.forEach((p) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.cuenta}</td>
            <td>${p.charla}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', lista);