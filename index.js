import Tree from "./Tree.js";

// let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// test.prettyPrint(test.root);

// test.insert(28); //correct
// test.prettyPrint(test.root);

// test.delete(8); //incorrect, deleting 23 as well
// test.prettyPrint(test.root);

// test.delete(324); //correct
// test.prettyPrint(test.root);

// console.log(test.find(9));

// console.log(test.find(28)); //correct
// test.levelOrder((e) => console.log(e)); //correct
// test.prettyPrint(test.root);

// console.log();
// test.inOrder((e) => console.log(e.data), test.root); //1,2,3,4,5
// console.log();
// test.preOrder((e) => console.log(e.data), test.root); //3,1,2,4,5
// console.log();
// test.postOrder((e) => console.log(e.data), test.root); //2,1,5,4,3

// console.log();
// console.log(test.height(6345)); //0
// console.log(test.height(8)); //3
// console.log(test.height(69)); //null

// console.log();
// console.log(test.depth(8)); //0
// console.log(test.depth(67)); //1
// console.log(test.depth(6345)); //3
// console.log(test.depth(800)); //null

// console.log();
// console.log(test.isBalanced(test.root));
// test.insert(42069); //balanced still
// test.insert(420569); //not balanced

// test.prettyPrint(test.root);

// console.log(test.isBalanced(test.root));
// test.rebalance();
// test.prettyPrint(test.root);
// console.log(test.isBalanced(test.root));
//
//
//
//tie it all together:
// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
let randomNumArr = Array.from({ length: 10 }, () =>
  // eslint-disable-next-line prettier/prettier
  Math.floor(Math.random() * 100)
);
let tieTogether = new Tree(randomNumArr);
// console.log(randomNumArr); //does indeed create an array of ten elements of random numbers <100
tieTogether.prettyPrint(tieTogether.root); //works
// Confirm that the tree is balanced by calling isBalanced.
console.log(tieTogether.isBalanced()); //true
// Print out all elements in level, pre, post, and in order.
console.log("level order:");
tieTogether.levelOrder((e) => console.log(e.data));
console.log("pre order:");
tieTogether.preOrder((e) => console.log(e.data));
console.log("post order:");
tieTogether.postOrder((e) => console.log(e.data));
console.log("in order:");
tieTogether.inOrder((e) => console.log(e.data));
// Unbalance the tree by adding several numbers > 100.
tieTogether.insert(420);
tieTogether.insert(421);
tieTogether.insert(422);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(tieTogether.isBalanced(tieTogether.root)); //false
// Balance the tree by calling rebalance.
tieTogether.rebalance(tieTogether.root);
// Confirm that the tree is balanced by calling isBalanced.
console.log(tieTogether.isBalanced(tieTogether.root)); //true
// Print out all elements in level, pre, post, and in order.
console.log("level order:");
tieTogether.levelOrder((e) => console.log(e.data));
console.log("pre order:");
tieTogether.preOrder((e) => console.log(e.data));
console.log("post order:");
tieTogether.postOrder((e) => console.log(e.data));
console.log("in order:");
tieTogether.inOrder((e) => console.log(e.data));
