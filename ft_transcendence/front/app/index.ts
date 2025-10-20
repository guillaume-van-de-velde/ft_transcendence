import { render } from "./components/core/render.js";
import { home } from "./components/pages/home.js";
import { closeClicked } from "./components/utils/globalEvents.js";
import { PageInstance } from "./components/utils/interfaces.js";
import { pageRegistery } from "./components/utils/pageRegistery.js";
import { page } from "./pages/index.js";

const homeInstance:PageInstance = {
    content: page.home,
    level: 0,
    create: home,
};

document.addEventListener("DOMContentLoaded", () => {
  render(homeInstance);
});