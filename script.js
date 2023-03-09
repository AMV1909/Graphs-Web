// Crear nodos y aristas iniciales
var nodes = new vis.DataSet([
    { id: 1, label: "Nodo 1" },
    { id: 2, label: "Nodo 2" },
    { id: 3, label: "Nodo 3" },
    { id: 4, label: "Nodo 4" },
    { id: 5, label: "Nodo 5" },
]);

var edges = new vis.DataSet([
    { from: 1, to: 2, label: "Arista 1 - 2", weight: 5 },
    { from: 2, to: 3, label: "Arista 2 - 3", weight: 4 },
    { from: 3, to: 4, label: "Arista 3 - 4", weight: 3 },
    { from: 4, to: 5, label: "Arista 4 - 5", weight: 2 },
    { from: 5, to: 1, label: "Arista 5 - 1", weight: 1 },
]);

// Crear contenedor y datos para el grafo
var container = document.getElementById("grafo");

var data = {
    nodes: nodes,
    edges: edges,
};

if (data) actualizarSelects();

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
    },
};

// Crear el grafo
var network = new vis.Network(container, data, options);

// Agregar nodo
document.getElementById("agregar-nodo").addEventListener("click", () => {
    var id = Number(document.getElementById("id").value);
    var label = `Nodo ${document.getElementById("label").value}`;

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

    if (!from || !to || !label || !weight) return;

    edges.add({ from, to, label, weight });

    actualizarSelects();
    limpiarInputs();
});

// Borrar nodo
document.getElementById("borrar-node").addEventListener("click", () => {
    var id = Number(document.getElementById("borrar-nodo").value);

    if (!id) return;

    nodes.remove({ id });
    edges.remove(
        edges.get().filter((edge) => edge.from == id || edge.to == id)
    );

    actualizarSelects();
});

// Borrar arista

// Rellenar selects con nuevos datos
function actualizarSelects() {
    var selectFrom = document.getElementById("from");
    var selectTo = document.getElementById("to");
    var selectBorrarNodo = document.getElementById("borrar-nodo");
    var selectBorrarArista = document.getElementById("borrar-arista");

    selectFrom.innerHTML = "";
    selectTo.innerHTML = "";
    selectBorrarNodo.innerHTML = "";
    selectBorrarArista.innerHTML = "";

    selectFrom.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectTo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectBorrarNodo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectBorrarArista.innerHTML = `<option value="" selected>Seleccionar arista</option>`;

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

    edges.forEach((edge) => {
        var option = document.createElement("option");
        option.value = edge.id;
        option.innerHTML = edge.label;

        selectBorrarArista.appendChild(option);
    });
}

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
