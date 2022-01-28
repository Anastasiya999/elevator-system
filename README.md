# :book: Table of Content:

- [About The Project](#project-description)
- [Goals and Scenarios](#goals)
- [Approach](#aproach)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Landing page](#landing-page)
- [Screenshots](#screenshots)
- [Adding an elevator](#scenario1)
- [Pick up request](#sc)
-

## :pencil: About The Project

The aim of this project is to simulate elevator system mechanizm. The system can simultaneously serve at least 16 lifts. It allows to:

- Process pick up requests
- Update elevator's state
- Simulate the lifting step
- Choose a desired floor
- Check the current state of the elevator: direction, floor and destination

## :rocket: Goals and Scenarios

The basic elevator system includes an elevator, logic controls and special buttons for sending requests. On every floor there are two buttons: "UP" and "DOWN" that represents the desired direction. The elevator responds to the pressing of these buttons depending on the current travel route. If it is idle, it will respond immediately to the floor of the user request. Moreover, the elevator always moves from bottom to top and only stops on other requests that are on it's current path. When all requests are handled in one cycle direction, the elevator will reverse and begin serving other pending tasks. The user can choose the destination floor presssing dedicated buttons inside the lift.

#### Some basic Scenarios
* When a user presses UP or DOWN, the elevator will begin moving towards the source of request provided it matches it's current route, otherwise the requests will be added to the pending queue
* When the elevator is idle, it responds immediately to requests
* When there are several users inside the elevator with different disered locations the elevator will firstly served the one that is along it's path
* If the user refuses to select the a floor, the elevator will automatically close after 10 seconds and begin serving other requests


## :rocket: Approach

In order to implement an elevator system I used a SCAN algorithm. It is a simple algorithm used in disk scheduling. 

#### The main idea of algorithm
1. Let our elevator system store three queue of tasks.``currentTasks`` array represents currently handled requests that are on the route path. The ``up`` array represents up requests that can not be served at the moment, the same with ``down`` array but in opposite direction. The values are unique and sorted in ascending order.
2. If a user presses the "UP"/"DOWN" button the ``pickUp(direction,source)`` is trigged. Then the task is added to a dedicated queue depending on its direction and the source of request.
3. If current direction of the elevator is "UP" and ``currentTasks`` is not empty it shifs and serves the first request from the queue. If direction is "DOWN" - pops and serves the last request from the queue.
4. If there are no jobs, the elevator will reverse direction and operate ``up`` or ``down`` queue due to the changed direction. If queues are empty the elevator changes its state to "IDLE".

When implementing the SCAN algorithm, I considered the elevator system as a finite state machine. Depending on it's states: "UP", "DOWN", "IDLE", "MOVING", "STOPPED", "OPEN" or 
"CLOSE" the elevator starts and responds to the user's requests. Thus, the change of state triggers the elevator behavior. Using the useState and useEffect hooks, I was able to get the proper rendering and the correct status display change. Besides I used useRef hook to store references to ``up``, ``down``, ``tasks`` and trigger re-rendering only when updating the state of the ``current tasks`` array. In order to process tasks simultaneously I use Web Workers. Every time ``step(id, currentFloor, destinationFloor)`` is called, a new elevator worker is created. The worker post the message with new ``status`` 10 000ms timeout and the state of ``currentFloor`` is updated. After sending the message the worker terminates.  

## :file_folder: Project Structure

```bash
│   App.js
│   index.js
│   reportWebVitals.js
│
├───assets
│       background-system.png
│       door.png
│
├───components
│   ├───Controller
│   │       Controller.js
│   │       styles.js
│   │
│   ├───Elevator
│   │       Elevator.js
│   │       styles.js
│   │
│   ├───ElevatorSystem
│   │       ElevatorSystem.js
│   │       styles.js
│   │
│   ├───Floor
│   │   │   Floor.js
│   │   │   styles.js
│   │   │
│   │   └───Door
│   │           Door.js
│   │           styles.js
│   │
│   └───Header
│       │   Header.js
│       │   styles.js
│       │
│       └───AddButton
│               AddButton.js
│               styles.js
│
├───constants
│       enums.js
│
├───hooks
│       useDoorWorker.js
│       useElevatorWorker.js
│       useWebworker.js
│
└───themes
        light.js
```

## :computer: Technologies

- JavaScript, multithreading(web workers)
- React.js, hooks
- Material UI

## :pushpin: Getting Started

First of all download the project. Then in the project directory use the following command to start the application:

```bash
  npm start
```

The app will be in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Screenshots

### Landing page

![landing](screenshots/landing_page.png)

### Adding an elevator

![adding](screenshots/add_elevator.png)

### Pick up

![pickup](screenshots/pick_up.png)

### Choosing the floor

![choosing](screenshots/choosing_floor.png)

### Status display

![choosing](screenshots/status.png)


