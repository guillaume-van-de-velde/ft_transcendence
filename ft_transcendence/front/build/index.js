import { render } from "./components/core/render.js";
import { home } from "./components/pages/home.js";
import { page } from "./pages/index.js";
const homeInstance = {
    content: page.home,
    level: 0,
    create: home,
};
document.addEventListener("DOMContentLoaded", () => {
    render(homeInstance);
});
