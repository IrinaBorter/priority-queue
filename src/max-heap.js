const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			const detached = this.detachRoot();

			this.restoreRootFromLastInsertedNode(detached);
			this.root && this.shiftNodeDown(this.root);
			this.length--;
			return detached.data;
		}
	}

	detachRoot() {
		const detached = this.root;

		if (this.root.left) {
			this.root.left.parent = null;
		}
		if (this.root.right) {
			this.root.right.parent = null;
		}
		if (!this.root.left || !this.root.right) {
			this.parentNodes.shift();
		}

		this.root = null;
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length && detached.left) {
			const lastInsertedNode = this.parentNodes.pop();

			lastInsertedNode.remove();
			if (detached.left !== lastInsertedNode && detached.right !== lastInsertedNode) {
				lastInsertedNode.left = detached.left;
				lastInsertedNode.left.parent = lastInsertedNode;
				lastInsertedNode.right = detached.right;
				lastInsertedNode.right.parent = lastInsertedNode;
			}
			if (detached.right === lastInsertedNode) {
				lastInsertedNode.left = detached.left;
				lastInsertedNode.left.parent = lastInsertedNode;
			}
			this.root = lastInsertedNode;

			if (!this.root.left || !this.root.right) {
				this.parentNodes.unshift(this.root);
			}
		}
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.size();
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
			this.length++;
			return;
		}
		if (!this.parentNodes[0].left) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.parentNodes.shift();
		}
		this.length++;
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			const swappedItem = node.parent;

			node.swapWithParent();
			if (this.parentNodes.indexOf(swappedItem) !== -1) {
				this.parentNodes[this.parentNodes.indexOf(node)] = swappedItem;
				this.parentNodes[this.parentNodes.indexOf(swappedItem)] = node;
			} else {
				this.parentNodes[this.parentNodes.indexOf(node)] = swappedItem;
			}

			this.shiftNodeUp(node);
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		let swappedItem;

		if (node.left && node.priority < node.left.priority) {
			swappedItem = node.left;
			if (swappedItem.parent === this.root) {
				this.root = swappedItem;
			}
			node.left.swapWithParent();
			if (this.parentNodes.indexOf(node) === -1) {
				this.parentNodes[this.parentNodes.indexOf(swappedItem)] = node;
			} else {
				this.parentNodes[this.parentNodes.indexOf(swappedItem)] = node;
				this.parentNodes[this.parentNodes.indexOf(node)] = swappedItem;
			}
			this.shiftNodeDown(node);
		}

		if (node.right && node.priority < node.right.priority) {
			swappedItem = node.right;
			node.right.swapWithParent();
			if (this.parentNodes.indexOf(node) !== -1) {
				this.parentNodes[this.parentNodes.indexOf(swappedItem)] = node;
			} else {
				this.parentNodes[this.parentNodes.indexOf(node)] = swappedItem;
				this.parentNodes[this.parentNodes.indexOf(swappedItem)] = node;
			}
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
