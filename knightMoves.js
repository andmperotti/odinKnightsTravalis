// need to calculate the shortest path from one location to another using the knights 1x2 or 2x1 moves

class Node {
  constructor(location, parent) {
    this.location = location;
    this.parent = parent;
  }
}

function knightMoves(start, destination) {
  //use BFS to check a specific nodes 8 possible next moves
  //create an array to hold the eventual correct move nodes
  let results = [];
  //create an array to hold the already visited locations
  let visited = [];
  //so create a queue, which is an array using shift and push
  let queue = [];
  //immediately push in the starting node into the queue (creating a new Node instance)
  queue.push(new Node(start, null));
  //while the current first node.location in the queue is not === destination and while the length of the queue is > 0. Thus this will run until one of these conditions is not true
  while (queue.length > 0) {
    let currentNode = queue.shift();
    if (
      currentNode.location[0] === destination[0] &&
      currentNode.location[1] === destination[1]
    ) {
      results.push(currentNode);
      break;
    }
    //add this current node as visited, but only the location property value
    visited.push(JSON.stringify(currentNode.location));
    //create an array which represents the horizontal and vertical additions&subtractions for the next 8 moves
    let nextMoves = [
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
    ];
    //add the next 8 moves into the queue as new Node instances with the current node set as their parent, IF they are in valid locations aka >=0,0 and less than 8,8, and IF they haven't been visited yet.
    //so loop through the nextMoves adding each of their location values to the currentNodes location values
    for (let nextMove of nextMoves) {
      let tempMove = [
        currentNode.location[0] + nextMove[0],
        currentNode.location[1] + nextMove[1],
      ];
      if (
        tempMove[0] < 8 &&
        tempMove[0] >= 0 &&
        tempMove[1] < 8 &&
        tempMove[1] >= 0 &&
        !visited.includes(`[${tempMove[0]},${tempMove[1]}]`)
      ) {
        //if valid move then add it into queue as a new Node instance with the correct location and tell its parent to be the node this move originated from
        queue.push(new Node(tempMove, currentNode));
      }
    }
  }

  //if the results array has elements, then the path was found
  if (results.length > 0) {
    //use a while loop to push in the parent of this node and its parent and its parent etc until there is no parent node of the node you just pushed, thereby creating an array of moves from the starting to destination position
    let destinationNode = results[0];
    while (destinationNode.parent !== null) {
      destinationNode = destinationNode.parent;
      results.push(destinationNode);
    }
    //log a statement describing the user how many moves were made to get from starting position to destination position
    console.log(
      `You made it in ${results.length - 1} moves! Here's your path:`
    );
    //to output the moves in order, use a while loop , log the last element in the result array while popping it off the queue
    while (results.length > 0) {
      let temp = results.pop();
      console.log(temp.location);
    }
  } else {
    console.log("No path found.");
  }
}

//export
export { knightMoves };
