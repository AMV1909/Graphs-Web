// Crear nodos y aristas iniciales
var nodes = new vis.DataSet([
    { id: 1, label: 'Nodo 1' },
    { id: 2, label: 'Nodo 2' },
    { id: 3, label: 'Nodo 3' },
    { id: 4, label: 'Nodo 4' },
    { id: 5, label: 'Nodo 5' }
]);

var edges = new vis.DataSet([
    { from: 1, to: 2, label: 'Arista 1-2', weight: 5 },
    { from: 2, to: 3, label: 'Arista 2-3', weight: 7 },
    { from: 3, to: 4, label: 'Arista 3-4', weight: 3 },
    { from: 4, to: 5, label: 'Arista 4-5', weight: 6 },
    { from: 5, to: 1, label: 'Arista 5-1', weight: 2 },
    { from: 5, to: 3, label: 'Arista 5-3', weight: 5 }
]);

// Crear contenedor y datos para el grafo
var container = document.getElementById('grafo');

var data = {
    nodes: nodes,
    edges: edges
};

if (data) actualizarSelects();

var options = {};

// Crear el grafo
var network = new vis.Network(container, data, options);

// Agregar nodo
document.getElementById('agregar-nodo').addEventListener('click', () => {
    var id = Number(document.getElementById('id').value);
    var label = `Nodo ${document.getElementById('label').value}`;

    if (!id || !label) return;

    nodes.add({ id, label });

    actualizarSelects();
})

// Agregar arista
document.getElementById('agregar-arista').addEventListener('click', () => {
    var from = Number(document.getElementById('from').value);
    var to = Number(document.getElementById('to').value);
    var label = `Arista ${from} - ${to}`;
    var weight = Number(document.getElementById('weight').value);

    console.log(from, to, label, weight);

    if (!from || !to || !label || !weight) return;

    edges.add({ from, to, label, weight });

    actualizarSelects();
})

// Rellenar selects con nuevos datos
function actualizarSelects() {
    var selectFrom = document.getElementById('from');
    var selectTo = document.getElementById('to');
    var selectBorrarNodo = document.getElementById('borrar-nodo');
    var selectBorrarArista = document.getElementById('borrar-arista');

    selectFrom.innerHTML = '';
    selectTo.innerHTML = '';
    selectBorrarNodo.innerHTML = '';
    selectBorrarArista.innerHTML = '';

    nodes.forEach(node => {
        var option = document.createElement('option');
        option.value = node.id;
        option.innerHTML = node.label;

        selectFrom.appendChild(option);
        selectTo.appendChild(option.cloneNode(true));
    });

    nodes.forEach(node => {
        var option = document.createElement('option');
        option.value = node.id;
        option.innerHTML = node.label;

        selectBorrarNodo.appendChild(option);
    });

    edges.forEach(edge => {
        var option = document.createElement('option');
        option.value = edge.id;
        option.innerHTML = edge.label;

        selectBorrarArista.appendChild(option);
    });
}