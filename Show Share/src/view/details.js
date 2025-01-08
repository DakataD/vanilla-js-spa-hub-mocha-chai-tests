import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFactById, deleteFactById, } from '../api/data.js';


const detailsTamplate = (
  fact,
  isOwner,
  onDelete,
) => html`
  <section id="details-and-comments">
    <div id="details-wrapper">
      <img id="details-img" src="${fact.imageUrl}" alt="example1" />
      <div id="details-text">
        <p id="details-title">${fact.title}</p>
        <div id="info-wrapper">
          <div id="description">
            <p id="details-description">${fact.details}</p>
          </div>
        </div>
        <div id="action-buttons">
          ${isOwner
            ? html`<a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                  <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>`
            : ""}
        </div>
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const factId = ctx.params.id;
  const fact = await getFactById(factId);
  const user = ctx.user;

  const isOwner = user && fact._ownerId == user._id;
  const isLoggedIn = user !== undefined;


  ctx.render(detailsTamplate(fact, isOwner, onDelete, isLoggedIn));



  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteFactById(factId);
      ctx.page.redirect("/dashboard");
    }
  }
}
