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
			const parent = lastInsertedNode.parent;
			lastInsertedNode.remove();
			if (parent && this.parentNodes.indexOf(parent) === -1) {
				this.parentNodes.unshift(parent);
			}
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
			if (swappedItem === this.root) {
				this.root = node;
			}
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node.left && node.priority < node.left.priority &&
			(!node.right || node.left.priority > node.right.priority)) {
			this.shiftNodeUp(node.left);
			this.shiftNodeDown(node);
		}
		if (node.right && node.priority < node.right.priority &&
			(!node.left || node.right.priority > node.left.priority)) {
			this.shiftNodeUp(node.right);
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
