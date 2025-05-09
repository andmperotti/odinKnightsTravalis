import Node from "./Node.js";

export default class {
  constructor(arr) {
    this.arr = Array.from(new Set(arr)).sort((a, b) => (a < b ? -1 : 0));
    this.root = this.#buildTree(this.arr, 0, this.arr.length - 1);
  }

  #buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let middle = Math.floor((start + end) / 2);
    let root = new Node(arr[middle]);

    root.left = this.#buildTree(arr, start, middle - 1);
    root.right = this.#buildTree(arr, middle + 1, end);
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        // eslint-disable-next-line prettier/prettier
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  delete(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null && node.right) {
        node = node.right;
      } else if (node.left && node.right === null) {
        node = node.left;
      } else {
        let next = getNext(node);
        node.data = next.data;
        node.right = this.delete(next.data, node.right);
      }
    }

    function getNext(node) {
      node = node.right;
      while (node !== null && node.left !== null) {
        node = node.left;
      }
      return node;
    }

    return node;
  }

  find(value, root = this.root) {
    while (root !== null && root.data !== value) {
      if (value > root.data) {
        root = root.right;
      } else {
        root = root.left;
      }
    }
    if (root?.data === value) {
      return root;
    } else {
      return null;
    }
  }

  levelOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("No Callback given");
    }
    if (root === null) {
      return;
    }
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
      let current = queue[0];
      callback(current);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      queue.shift();
    }
  }

  inOrder(callback, root = this.root) {
    if (root === null) {
      return null;
    }
    if (!callback) {
      throw new Error("Error argument is empty");
    }

    if (root.left !== null) {
      this.inOrder(callback, root.left);
    }
    callback(root);
    if (root.right !== null) {
      this.inOrder(callback, root.right);
    }
  }

  preOrder(callback, root = this.root) {
    if (root === null) {
      return null;
    }
    if (!callback) {
      throw new Error("Error argument is empty");
    }
    callback(root);
    if (root.left !== null) {
      this.preOrder(callback, root.left);
    }
    if (root.right !== null) {
      this.preOrder(callback, root.right);
    }
  }

  postOrder(callback, root = this.root) {
    if (root === null) {
      return null;
    }
    if (!callback) {
      throw new Error("Error argument is empty");
    }
    if (root.left !== null) {
      this.postOrder(callback, root.left);
    }
    if (root.right !== null) {
      this.postOrder(callback, root.right);
    }
    callback(root);
  }

  height(value, root = this.root) {
    let foundNode = this.find(value, root);
    if (foundNode === null) {
      return null;
    } else {
      return this.findHeight(foundNode);
    }
  }

  findHeight(node) {
    if (node === null) {
      return null;
    }
    if (node.left === null && node.right === null) {
      return 0;
    }
    if (node.left && !node.right) {
      return 1 + this.findHeight(node.left);
    } else if (node.right && !node.left) {
      return 1 + this.findHeight(node.right);
    } else {
      return (
        1 + Math.max(this.findHeight(node.left), this.findHeight(node.right))
      );
    }
  }

  depth(value, root = this.root) {
    if (root === null) {
      return null;
    }
    if (root.data === value) {
      return 0;
    }
    if (value > root.data) {
      let recursive = this.depth(value, root.right);
      return recursive !== null ? recursive + 1 : null;
    } else {
      let recursive = this.depth(value, root.left);
      return recursive !== null ? recursive + 1 : null;
    }
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    if (!root.left && !root.right) {
      return true;
    }

    if (
      Math.abs(this.findHeight(root.left) - this.findHeight(root.right)) > 1 ||
      !this.isBalanced(root.left) ||
      !this.isBalanced(root.right)
    ) {
      return false;
    }
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance(root = this.root) {
    if (root === null) {
      return root;
    } else if (this.isBalanced(root)) {
      console.log("tree is already balanced");
    } else {
      this.arr = [];
      this.inOrder((e) => this.arr.push(e.data));
      this.root = this.#buildTree(this.arr, 0, this.arr.length - 1);
    }
  }
}
