// Array de nodos
var nodes = new vis.DataSet([]);

// Array de aristas
var edges = new vis.DataSet([]);

// Obtener el contenedor del grafo
var container = document.getElementById("grafo");

// Crear datos para el grafo
var data = {
    nodes: nodes,
    edges: edges,
};

// Actualizar las opciones para los select usando la función actualizarSelects() si hay datos
if (data) actualizarSelects();

// Crear opciones de diseño para el grafo
var options = {
    nodes: {
        shape: "dot",
        size: 20,
        font: {
            size: 15,
        },
        borderWidth: 2,
    },
    edges: {
        width: 2,
        color: { inherit: "from" },
        font: {
            size: 15,
            align: "middle",
        },
        labelHighlightBold: true,
        label: edges.weight,
    },
};

// Crear el grafo
var network = new vis.Network(container, data, options);

// Agregar nodo
document.getElementById("agregar-nodo").addEventListener("click", () => {
    var id = Number(document.getElementById("id").value);
    var label = `Nodo ${document.getElementById("label").value}`;

    // Validar que los inputs no estén vacíos
    if (!id || !label) return;

    nodes.add({ id, label });

    actualizarSelects();
    limpiarInputs();
});

// Agregar arista
document.getElementById("agregar-arista").addEventListener("click", () => {
    var from = Number(document.getElementById("from").value);
    var to = Number(document.getElementById("to").value);
    var label = `Arista ${from} - ${to}`;
    var weight = Number(document.getElementById("weight").value);

    // Validar que los inputs no estén vacíos
    if (!from || !to || !label || !weight) return;

    var id = edges.length + 1;

    edges.add({ id, from, to, label, weight });

    actualizarSelects();
    limpiarInputs();
});

// Borrar nodo
document.getElementById("borrar-node").addEventListener("click", () => {
    var id = Number(document.getElementById("borrar-nodo").value);

    // Validar que los inputs no estén vacíos
    if (!id) return;

    // Remover nodo y aristas que lo contengan
    nodes.remove({ id });
    edges.remove(
        edges.get().filter((edge) => edge.from == id || edge.to == id)
    );

    actualizarSelects();
});

// Borrar arista
document.getElementById("borrar-edge").addEventListener("click", () => {
    var id = Number(document.getElementById("borrar-arista").value);

    // Validar que los inputs no estén vacíos
    if (!id) return;

    // Remover arista
    edges.remove({ id });

    actualizarSelects();
});

// Borrar todo
document.getElementById("borrar-todo").addEventListener("click", () => {
    nodes.clear();
    edges.clear();

    actualizarSelects();
});

// Rellenar selects con nuevos datos
function actualizarSelects() {
    var selectFrom = document.getElementById("from");
    var selectTo = document.getElementById("to");
    var selectBorrarNodo = document.getElementById("borrar-nodo");
    var selectBorrarArista = document.getElementById("borrar-arista");

    // Vaciar las opciones de los selects
    selectFrom.innerHTML = "";
    selectTo.innerHTML = "";
    selectBorrarNodo.innerHTML = "";
    selectBorrarArista.innerHTML = "";

    // Agregar opción por defecto
    selectFrom.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectTo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectBorrarNodo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectBorrarArista.innerHTML = `<option value="" selected>Seleccionar arista</option>`;

    // Agregar opciones de nodos a los selects
    nodes.forEach((node) => {
        var option = document.createElement("option");
        option.value = node.id;
        option.innerHTML = node.label;

        selectFrom.appendChild(option);
    });

    nodes.forEach((node) => {
        var option = document.createElement("option");
        option.value = node.id;
        option.innerHTML = node.label;

        selectBorrarNodo.appendChild(option);
    });

    // Agregar opciones de aristas a los selects
    edges.forEach((edge) => {
        var option = document.createElement("option");
        option.value = edge.id;
        option.innerHTML = edge.label;

        selectBorrarArista.appendChild(option);
    });
}

// Cuando se hace un cambio en la información, se elimna el contenido de los inputs para evitar molestias
function limpiarInputs() {
    var inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        input.value = "";
    });
}

// Borrar opciones de select al cambiar
document.getElementById("from").addEventListener("change", () => {
    if (document.getElementById("from").value) {
        document.getElementById("to").innerHTML = "";
        document.getElementById(
            "to"
        ).innerHTML = `<option value="" selected>Seleccionar nodo</option>`;

        nodes.forEach((node) => {
            if (node.id != document.getElementById("from").value) {
                var option = document.createElement("option");
                option.value = node.id;
                option.innerHTML = node.label;

                document.getElementById("to").appendChild(option);
            }
        });
    } else {
        document.getElementById("to").innerHTML = "";
        document.getElementById(
            "to"
        ).innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    }
});
