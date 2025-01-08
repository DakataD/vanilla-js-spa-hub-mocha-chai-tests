import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFacts } from "../api/data.js";

const dashboardTemplate = (show) => html`<h2>Users Recommendations</h2>
<section id="shows">
  ${show.length == 0
    ? html`<h2 id="no-show" >No shows Added.</h2>`
    : show.map(
        (e) => html`       
  <div class="show">
            <img src="${e.imageUrl}" alt="example1" />
            <div class="show-info">
              <h3 class="title">${e.title}</h3>
              <p class="genre">Genre: ${e.genre}</p>
              <p class="country-of-origin">Country of Origin: ${e.country}</p>
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
