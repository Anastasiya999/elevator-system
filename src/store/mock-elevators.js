export const elevators = [];

for (let i = 0; i < 16; i++) {
  elevators.push({
    id: i,
    direction: 1,
    state: "IDLE",
    current: 0,
    destination: 0,
    isOpen: false,
    tasks: [],
    up: [],
    down: [],
  });
}
