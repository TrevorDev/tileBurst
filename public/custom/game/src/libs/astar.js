// This needed to be fixed by me(Trevor Baron) to work with this problem
// javascript-astar
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a binary heap.

var astar = {
    heap: function() {
        return new BinaryHeap(function(node) { 
            return node.f; 
        });
    },
    search: function(grid, start, end, diagonal, heuristic) {
        if (!heuristic){
            heuristic = function(pos0, pos1) {
                // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

                var d1 = Math.abs (pos1.x - pos0.x);
                var d2 = Math.abs (pos1.y - pos0.y);
                return d1 + d2;
            }
        } 

        diagonal = !!diagonal;

        var openHeap = astar.heap();

        openHeap.push(start);

        while(openHeap.size() > 0) {
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();
            // End case -- result has been found, return the traced path.
            if(currentNode === end) {
                var curr = currentNode;
                var ret = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true;

            // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
            var neighbors = astar.neighbors(grid, currentNode, diagonal);

            for(var i=0, il = neighbors.length; i < il; i++) {
                var neighbor = neighbors[i];

                if(neighbor.closed) {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = currentNode.g + neighbor.cost;
                var beenVisited = neighbor.visited;

                if(!beenVisited || gScore < neighbor.g) {

                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }

        // No result was found - empty array signifies failure to find path.
        return [];
    },
    neighbors: function(grid, node, diagonals) {
        var ret = [];
        var x = node.x;
        var y = node.y;

        // West
        grid = grid.nodes
        if(grid[y-1] && grid[y-1][x]) {
            ret.push(grid[y-1][x]);
        }

        // East
        if(grid[y+1] && grid[y+1][x]) {
            ret.push(grid[y+1][x]);
        }

        // South
        if(grid[y] && grid[y][x-1]) {
            ret.push(grid[y][x-1]);
        }

        // North
        if(grid[y] && grid[y][x+1]) {
            ret.push(grid[y][x+1]);
        }

        if (diagonals) {
            // Southwest
            if(grid[y-1] && grid[y-1][x-1]) {
                ret.push(grid[y-1][x-1]);
            }

            // Southeast
            if(grid[y+1] && grid[y+1][x-1]) {
                ret.push(grid[y+1][x-1]);
            }

            // Northwest
            if(grid[y-1] && grid[y-1][x+1]) {
                ret.push(grid[y-1][x+1]);
            }

            // Northeast
            if(grid[y+1] && grid[y+1][x+1]) {
                ret.push(grid[y+1][x+1]);
            }

        }
        return ret;
    }
};