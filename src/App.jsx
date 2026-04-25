import { useState } from "react";

const SIZE = 15;

function generateMaze() {
  const maze = Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(1));

  function carve(x, y) {
    const dirs = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ].sort(() => Math.random() - 0.5);

    for (let [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx > 0 &&
        ny > 0 &&
        nx < SIZE - 1 &&
        ny < SIZE - 1 &&
        maze[nx][ny] === 1
      ) {
        maze[nx][ny] = 0;
        maze[x + dx / 2][y + dy / 2] = 0;
        carve(nx, ny);
      }
    }
  }

  maze[1][1] = 0;
  carve(1, 1);

  return maze;
}

function bfs(maze, start, end) {
  const queue = [[start, []]];
  const visited = new Set();
  let visitedCount = 0;

  while (queue.length) {
    const [[x, y], path] = queue.shift();
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    visitedCount++;

    if (x === end[0] && y === end[1])
      return { path: [...path, [x, y]], visited: visitedCount };

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < SIZE &&
        ny < SIZE &&
        maze[nx][ny] === 0
      ) {
        queue.push([[nx, ny], [...path, [x, y]]]);
      }
    }
  }

  return { path: [], visited: visitedCount };
}

function dfs(maze, start, end) {
  const stack = [[start, []]];
  const visited = new Set();
  let visitedCount = 0;

  while (stack.length) {
    const [[x, y], path] = stack.pop();
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    visitedCount++;

    if (x === end[0] && y === end[1])
      return { path: [...path, [x, y]], visited: visitedCount };

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (let [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < SIZE &&
        ny < SIZE &&
        maze[nx][ny] === 0
      ) {
        stack.push([[nx, ny], [...path, [x, y]]]);
      }
    }
  }

  return { path: [], visited: visitedCount };
}

export default function App() {
  const [maze, setMaze] = useState(generateMaze());
  const [path, setPath] = useState([]);
  const [stats, setStats] = useState(null);

  const start = [1, 1];
  const end = [SIZE - 2, SIZE - 2];

  function animatePath(p) {
    setPath([]);
    p.forEach((cell, i) => {
      setTimeout(() => {
        setPath((prev) => [...prev, cell]);
      }, i * 40);
    });
  }

  function solveBFS() {
    const result = bfs(maze, start, end);
    animatePath(result.path);
    setStats({
      type: "BFS",
      length: result.path.length,
      visited: result.visited,
    });
  }

  function solveDFS() {
    const result = dfs(maze, start, end);
    animatePath(result.path);
    setStats({
      type: "DFS",
      length: result.path.length,
      visited: result.visited,
    });
  }

  function newMaze() {
    setMaze(generateMaze());
    setPath([]);
    setStats(null);
  }

  function isPath(x, y) {
    return path.some(([px, py]) => px === x && py === y);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        backgroundColor: "#242424",
        color: "#fff",
      }}
    >
      <h1>Maze Generator & Solver</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 30px)`,
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {maze.map((row, i) =>
          row.map((cell, j) => {
            let color = cell ? "#222" : "#fff";
            if (isPath(i, j)) color = "yellow";
            if (i === start[0] && j === start[1]) color = "green";
            if (i === end[0] && j === end[1]) color = "red";

            return (
              <div
                key={`${i}-${j}`}
                style={{
                  width: 30,
                  height: 30,
                  background: color,
                  border: "1px solid #555",
                  transition: "background 0.2s ease",
                }}
              ></div>
            );
          })
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={newMaze}>Generate Maze</button>
        <button onClick={solveBFS} style={{ marginLeft: 10 }}>
          Solve BFS
        </button>
        <button onClick={solveDFS} style={{ marginLeft: 10 }}>
          Solve DFS
        </button>
      </div>

      {stats && (
        <div>
          <h3>Algorithm: {stats.type}</h3>
          <p>Path Length: {stats.length}</p>
          <p>Nodes Visited: {stats.visited}</p>
        </div>
      )}
    </div>
  );
}