import React, { FC, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

let port2: MessagePort | undefined;

const App: FC<{}> = ({}) => {
  const [messages, setMessages] = useState<Array<string>>([]);

  const onMessage = (ev: MessageEvent) => {
    setMessages((c) => [...c, ev.data]);
    port2?.postMessage("Received: " + ev.data);
  };

  const handleClick = () => {
    port2?.postMessage({
      now: new Date(),
      ary: [1, "2", [3]],
      obj: { hoge: "hogehoge" },
    });
  };

  useEffect(() => {
    const initPort = (ev: MessageEvent) => {
      port2 = ev.ports[0];
      port2.onmessage = onMessage;
    };

    window.addEventListener("message", initPort);
  }, []);

  return (
    <main style={{ minHeight: "300px" }}>
      <h1>iframe</h1>

      <button onClick={handleClick}>reply</button>

      <ul>
        {messages.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </main>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<App />);
