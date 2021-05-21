import { createStore } from "./core.js";
import reducer from "./reducer.js";

const { attach, connect, dispath } = createStore(reducer);

window.dispath = dispath;
export { attach, connect };
