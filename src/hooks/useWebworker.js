import { useRef, useEffect, useState } from "react";

const workerHandler = (fn) => {
  onmessage = (event) => {
    setInterval(() => {
      postMessage(fn(event.data));
    }, 1000);
  };
};

export const useWebworker = (fn) => {
  const [status, setStatus] = useState(null);
  //const [statu, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const workerRef = useRef(null);

  useEffect(() => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
    );
    workerRef.current = worker;
    worker.onmessage = (e) => {
      setStatus(e.data);
    };
    worker.onerror = (error) => {
      setError(error.message);
    };
    return () => {
      worker.terminate();
    };
  }, [fn]);

  return {
    status,
    run: (id, source, destination) =>
      workerRef.current.postMessage([id, source, destination])
  };
};

export const useDisposableWebworker = (fn) => {
  const [status, setStatus] = useState("start");
  const [error, setError] = useState(null);
  const [currentFloor, setFloor] = useState(0);

  const run = (id, source, destination) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
    );
    worker.onmessage = (event) => {
      if (event.data.msg === "Door is openning") {
        //setState("STOPPED");
        //remove task
        console.log("chnged state");
      } else {
        //setState("MOVING");
      }
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
    run
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
    step
  };
};
