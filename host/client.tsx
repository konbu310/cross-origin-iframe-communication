import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";

const src = "http://127.0.0.1:4000";

const channel = new MessageChannel();
const port1 = channel.port1;

const App: FC<{}> = ({}) => {
  const [inputValue, setInputValue] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();
    port1.postMessage(inputValue);
    setInputValue("");
  };

  const onMessage = (ev: MessageEvent) => {
    console.log(ev.data);
  };

  const postRequest = async () => {
    const res = await fetch(`${src}/hello`, {
      method: "POST",
      body: JSON.stringify({ name: "Yuya" }),
      headers: { "Content-Type": "application/json" },
    });
    const text = await res.text();
    console.log(text);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      port1.onmessage = onMessage;
      iframe.contentWindow?.postMessage("init", src, [channel.port2]);
    };
    iframe.addEventListener("load", onLoad);
  }, []);

  return (
    <main style={{ minHeight: "300px" }}>
      <h1>Host</h1>

      <input
        type="text"
        value={inputValue}
        onChange={(ev) => setInputValue(ev.currentTarget.value)}
      />
      <button onClick={handleClick}>send</button>

      <div style={{ margin: "50px auto" }}>
        <label>CrossOrigin POST</label>
        <button onClick={postRequest}>request</button>
      </div>

      <div style={{ margin: "100px" }} />

      <iframe
        ref={iframeRef}
        src={src}
        style={{ width: 550, height: 330 }}
      ></iframe>
    </main>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<App />);
