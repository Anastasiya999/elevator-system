import { useState } from "react";

const workerHandler = (fn) => {
  onmessage = (event) => {
    if (event.data === true) {
      //setInterval(() => {
      postMessage(event.data);
      // }, 1000);
    } else {
      setInterval(() => {
        postMessage(event.data);
      }, 5000);
    }
  };
};

export const useDoorWorker = () => {
  const [error, setError] = useState(null);
  const [isClose, setIsOpen] = useState(false);

  const closeDoor = (value) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerHandler})()`]))
    );
    worker.onmessage = (event) => {
      setIsOpen(event.data);
      worker.terminate();
    };
    worker.onerror = (error) => {
      setError(error.message);
      worker.terminate();
    };
    worker.postMessage(value);
  };

  return {
    isClose,
    error,
    closeDoor
  };
};
