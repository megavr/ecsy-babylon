import * as EB from "./index";

declare global { interface Window { EB: any; } }
window.EB = EB;