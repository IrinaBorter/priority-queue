class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = this.left = this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			this.left.parent = this;
		} else if (!this.right) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left.parent = null;
			this.left = null;
		} else if (node === this.right) {
			this.right.parent = null;
			this.right = null;
		} else {
			throw new Error();
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
            const preParent = this.parent.parent;

			if (this === this.parent.left) {
				if (this.parent.right) {
					const rightChild = this.right;
					this.parent.right.parent = this;
					this.right = this.parent.right;
					this.parent.right = rightChild;
					if (rightChild) {
						rightChild.parent = this.parent;
					}
				} else {
					this.parent.right = null;
				}
				this.parent.left = null;
				this.parent.parent = this;
                if (this.left) {
                    this.parent.left = this.left;
					this.left.parent = this.parent;
                }
                this.left = this.parent;
			}
			if (this === this.parent.right) {
				if (this.parent.left) {
					const leftChild = this.left;
					this.parent.left.parent = this;
					this.left = this.parent.left;
					this.parent.left = leftChild;
					if (leftChild) {
						leftChild.parent = this.parent;
					}
				} else {
					this.parent.left = null;
				}
				this.parent.right = null;
                this.parent.parent = this;
				if (this.right) {
					this.parent.right = this.right;
					this.right.parent = this.parent;
				}
                this.right = this.parent;
            }
			if (preParent) {
				if (this.parent === preParent.left) {
					preParent.left = this;
				} else {
					preParent.right = this;
				}
				this.parent = preParent;
			} else {
				this.parent = preParent;
			}
		}
		return this;
	}
}

module.exports = Node;
