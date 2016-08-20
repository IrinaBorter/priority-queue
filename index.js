const MaxHeap = require('./src/max-heap');
//
// const h = new MaxHeap();
// window.h = h;
const Node = require('./src/node');
debugger;
const h = new MaxHeap();
const nodes = [
    new Node(0, 0),
    new Node(1, 1),
    new Node(2, 2),
    new Node(3, 3),
    new Node(4, 4),
    new Node(5, 5),
    new Node(6, 6),
];

nodes.forEach(node => {
    h.insertNode(node);
});

console.log(h.root === nodes[0]);
console.log(h.root.left === nodes[1]);
console.log(h.root.right === nodes[2]);
console.log(h.root.left.left === nodes[3]);
console.log(h.root.left.right === nodes[4]);