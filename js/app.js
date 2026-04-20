const formulario = document.getElementById('formularioRegistro');

if (formulario) {
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const inventario = document.getElementById('inventario').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const categoria = document.getElementById('categoria').value.trim();

        if (!inventario || !nombre || categoria === "Selecciona una charla...") {
            alert('Todos los campos son obligatorios');
            return;
        }

        const prod = { 
            inventario: inventario,
            nombre: nombre,
            categoria: categoria,
        };

        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push(prod);
        localStorage.setItem('productos', JSON.stringify(productos));

        alert('Registro realizado con éxito');

        formulario.reset();

        console.log('Producto registrado:', prod);
        console.log('Contenido actual en LocalStorage:', productos);

        if (document.getElementById('content')) {
            lista();
        }
    });
}

function lista(filtro = 'Todo') {
    const contenedor = document.getElementById('content');
    if (!contenedor) return;

    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (filtro !== 'Todo') {
        productos = productos.filter(p => p.categoria === filtro);
    }

    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No hay registros disponibles.</p></div>';
        return;
    }

    const tablaHTML = `
        <div class="table-responsive">
            <table class="table table-hover table-bordered shadow-sm">
                <thead class="table-primary">
                    <tr>
                        <th>#</th>
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

    productos.forEach((p, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.inventario}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    lista();

    const botones = document.querySelectorAll('.d-flex.justify-content-center.gap-4 button');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const textoBoton = this.innerText.trim();

            if (textoBoton === "Lista completa") {
                lista('Todo');
            } else if (textoBoton === "Frutas") {
                lista('Frutas');
            } else if (textoBoton === "Verduras") {
                lista('Verduras');
            } else if (textoBoton === "Lácteos") {
                lista('Lácteos');
            } else if (textoBoton === "Ocultar productos") {
                document.getElementById('content').innerHTML = '';
            }
        });
    });
});