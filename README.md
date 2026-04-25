# Maze Generator & Solver

## Live Demo
https://vanesargsyan.github.io/Maze-generator-solver/

## Project Description
This project is a Maze Generator and Solver application built using React and graph-based algorithms. The maze is generated using a randomized Depth-First Search (DFS) algorithm and solved using Breadth-First Search (BFS) and Depth-First Search (DFS). The application visually represents the maze and compares the performance of the algorithms in terms of pathfinding efficiency and visited nodes.

## Project Objectives

  ~To model a maze as a 2D grid graph
  
  ~To generate random and fully connected mazes using DFS
  
  ~To implement BFS and DFS algorithms for pathfinding
  
  ~To compare shortest path (BFS) vs exploratory path (DFS)
  
  ~To visualize algorithm execution and results
  
  ~To develop an interactive and educational UI

## Data Structures & Algorithms Used

Data Structures:

  ~2D Array (grid representation of the maze)
  
  ~Queue (used in BFS)
  
  ~Stack (used in DFS)
  
  ~Set (for tracking visited nodes)

Algorithms:

  ~Randomized Depth-First Search (Maze Generation)
  
  ~Breadth-First Search (Shortest Path Finding)
  
  ~Depth-First Search (Path Exploration)

##Overall Approach

The maze is represented as a grid where each cell is either a wall or a path. A randomized DFS algorithm is used to generate a solvable maze. After generation, BFS and DFS algorithms are applied to find paths from the start to the end point. BFS guarantees the shortest path, while DFS explores one possible route without guaranteeing optimality. The results are visualized in a graphical interface with animated path rendering.

## Team Members
Vane Sargsyan  
Knarik Papoyan  

## Contributions

🧑‍💻 Vane Sargsyan

  ~Implemented maze generation algorithm (Randomized DFS)
  
  ~Implemented BFS and DFS pathfinding algorithms
  
  ~Developed React UI and grid visualization
  
  ~Integrated algorithm statistics (path length, visited nodes)
  
  ~Implemented animation of path traversal
  
👩‍💻 Knarik Papoyan

  ~Assisted in UI/UX design and layout structure
  
  ~Supported debugging and testing of algorithms
  
  ~Contributed to styling and user experience improvements
  
  ~Helped in project documentation and presentation preparation

## Technologies Used

React, JavaScript, Vite, CSS
