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
    },
    physics: {
        enabled: false,
    },
};

// Crear el grafo
var network = new vis.Network(container, data, options);

// Agregar nodo
document.getElementById("agregar-nodo").addEventListener("click", () => {
    var id = document.getElementById("label").value;
    var label = document.getElementById("label").value;

    // Validar que los inputs no estén vacíos
    if (!id || !label) return alert("Por favor ingrese un nombre para el nodo");

    // Verificar que el nodo no exista
    if (nodes.get().find((node) => node.id == id)) {
        return alert("El nodo ya existe");
    }

    nodes.add({ id, label });

    actualizarSelects();
    limpiarInputs();
});

// Agregar arista
document.getElementById("agregar-arista").addEventListener("click", () => {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var weight = document.getElementById("weight").value;
    var label = `${weight}`;

    // Validar que los inputs no estén vacíos
    if (!from || !to || !label || !weight)
        return alert("Por favor ingrese todos los datos");

    var id = edges.length + 1;

    // Haz que la arista tenga flecha para indicar la dirección
    var arrows = "to";

    edges.add({ id, from, to, arrows, label, smooth: false });

    actualizarSelects();
    limpiarInputs();
});

// Editar nodo
document.getElementById("editar-node").addEventListener("click", () => {
    var id = Number(document.getElementById("editar-nodo").value);
    var label = document.getElementById("editar-nombre").value;

    // Validar que los inputs no estén vacíos
    if (!id || !label) return alert("Por favor ingrese un nombre para el nodo");

    // Editar nodo
    nodes.update({ id, label });

    actualizarSelects();
    limpiarInputs();
});

// Editar arista
document.getElementById("editar-edge").addEventListener("click", () => {
    var id = Number(document.getElementById("editar-arista").value);
    var weight = document.getElementById("editar-peso").value;
    var label = `${weight}`;

    // Validar que los inputs no estén vacíos
    if (!id || !label || !weight)
        return alert("Por favor ingrese todos los datos");

    // Editar arista
    edges.update({ id, label });

    actualizarSelects();
    limpiarInputs();
});

// Borrar nodo
document.getElementById("borrar-node").addEventListener("click", () => {
    var id = document.getElementById("borrar-nodo").value;

    // Validar que los inputs no estén vacíos
    if (!id) return alert("Por favor seleccione un nodo para borrar");

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
    if (!id) return alert("Por favor seleccione una arista para borrar");

    // Remover arista
    edges.remove({ id });

    actualizarSelects();
});

// Borrar todo
document.getElementById("borrar-todo").addEventListener("click", () => {
    if (confirm("¿Está seguro de borrar todo?")) {
        nodes.clear();
        edges.clear();
        actualizarSelects();
    }
});

// Rellenar selects con nuevos datos
function actualizarSelects() {
    var selectFrom = document.getElementById("from");
    var selectTo = document.getElementById("to");
    var selectEditarNodo = document.getElementById("editar-nodo");
    var selectEditarArista = document.getElementById("editar-arista");
    var selectBorrarNodo = document.getElementById("borrar-nodo");
    var selectBorrarArista = document.getElementById("borrar-arista");

    // Vaciar las opciones de los selects
    selectFrom.innerHTML = "";
    selectTo.innerHTML = "";
    selectEditarNodo.innerHTML = "";
    selectEditarArista.innerHTML = "";
    selectBorrarNodo.innerHTML = "";
    selectBorrarArista.innerHTML = "";

    // Agregar opción por defecto
    selectFrom.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectTo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectEditarNodo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectEditarArista.innerHTML = `<option value="" selected>Seleccionar arista</option>`;
    selectBorrarNodo.innerHTML = `<option value="" selected>Seleccionar nodo</option>`;
    selectBorrarArista.innerHTML = `<option value="" selected>Seleccionar arista</option>`;

    // Agregar opciones de nodos a los selects
    nodes.forEach((node) => {
        var optionFrom = document.createElement("option");
        var optionTo = document.createElement("option");
        var optionEditarNodo = document.createElement("option");
        var optionBorrarNodo = document.createElement("option");

        optionFrom.value = node.id;
        optionFrom.innerHTML = node.label;

        optionTo.value = node.id;
        optionTo.innerHTML = node.label;

        optionEditarNodo.value = node.id;
        optionEditarNodo.innerHTML = node.label;

        optionBorrarNodo.value = node.id;
        optionBorrarNodo.innerHTML = node.label;

        selectFrom.appendChild(optionFrom);
        selectTo.appendChild(optionTo);
        selectEditarNodo.appendChild(optionEditarNodo);
        selectBorrarNodo.appendChild(optionBorrarNodo);
    });

    // Agregar opciones de aristas a los selects
    edges.forEach((edge) => {
        var optionEditarArista = document.createElement("option");
        var optionBorrarArista = document.createElement("option");

        optionEditarArista.value = edge.id;
        optionEditarArista.innerHTML = edge.from + " - " + edge.to;

        optionBorrarArista.value = edge.id;
        optionBorrarArista.innerHTML = edge.from + " - " + edge.to;

        selectEditarArista.appendChild(optionEditarArista);
        selectBorrarArista.appendChild(optionBorrarArista);
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

nodes.add([
    { id: "s", label: "s", x: -200, y: 100 },
    { id: "1", label: "1", x: 0, y: 0 },
    { id: "2", label: "2", x: 0, y: 200 },
    { id: "3", label: "3", x: 200, y: 0 },
    { id: "4", label: "4", x: 200, y: 200 },
    { id: "t", label: "t", x: 400, y: 100 },
]);

edges.add([
    { id: 1, from: "s", to: "1", arrows: "to", label: "0/10", smooth: false },
    { id: 2, from: "s", to: "2", arrows: "to", label: "0/10", smooth: false },
    { id: 3, from: "1", to: "2", arrows: "to", label: "0/2", smooth: false },
    { id: 4, from: "1", to: "3", arrows: "to", label: "0/4", smooth: false },
    { id: 5, from: "1", to: "4", arrows: "to", label: "0/8", smooth: false },
    { id: 6, from: "2", to: "4", arrows: "to", label: "0/9", smooth: false },
    { id: 7, from: "3", to: "t", arrows: "to", label: "0/10", smooth: false },
    { id: 8, from: "4", to: "3", arrows: "to", label: "0/6", smooth: false },
    { id: 9, from: "4", to: "t", arrows: "to", label: "0/10", smooth: false },
]);

actualizarSelects();
