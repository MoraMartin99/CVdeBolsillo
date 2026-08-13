import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import settings from "./settings/settings";
import App from "./UI/App/App";

createRoot(document.querySelector("body")).render(
  <StrictMode>
    <App {...settings} />
  </StrictMode>,
);

