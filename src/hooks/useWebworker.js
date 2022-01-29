import { useState } from "react";

const workerHandler = (fn) => {
  onmessage = (event) => {
    setInterval(() => {
      postMessage(fn(event.data));
    }, 1000);
  };
};

export const useWorker = (fn) => {
  const [error, setError] = useState(null);
  const [currentFloor, setFloor] = useState(0);
  const [status, setStatus] = useState("start");

  const step = (id, source, destination) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
    );
    worker.onmessage = (event) => {
      setStatus(event.data.msg);
      setFloor(event.data.floor);
      worker.terminate();
    };
    worker.onerror = (error) => {
      setError(error.message);
      worker.terminate();
    };
    worker.postMessage([id, source, destination]);
  };

  return {
    status,
    currentFloor,
    error,
    step,
  };
};
