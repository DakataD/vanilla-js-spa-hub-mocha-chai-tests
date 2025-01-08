import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFacts } from "../api/data.js";

const dashboardTemplate = (setup) => html` <h2>Setup Showcase</h2>
<section id="setups">
  ${setup.length == 0
    ? html`<h2 id="no-setup">No Setups Added.</h2>`
    : setup.map(
        (e) => html`
        <div class="setup">
          <img src=${e.imageUrl} alt="example1" />
          <div class="setup-info">
            <h3 class="setup-name">${e.name}</h3>
            <p class="description">
              ${e.description}
            </p>
            <a class="details-btn" href="/details/${e._id}">Details</a>
          </div>
        </div>
        `
      )}
</section>`;


export async function dashboardPage(ctx) {
  const events = await getAllFacts();
  console.log(events);
  ctx.render(dashboardTemplate(events));
}
