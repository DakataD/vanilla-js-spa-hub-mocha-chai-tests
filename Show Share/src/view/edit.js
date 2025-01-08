import { html } from "../../node_modules/lit-html/lit-html.js";
import { editFactById, getFactById } from "../api/data.js";

const editTamplate = (fact, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Show</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="TV Show title"
                value="${fact.title}"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                value="${fact.imageUrl}"
              />
              <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              value="${fact.genre}"
            />
            <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            value="${fact.country}"
          />
              <textarea
                id="details"
                name="details"
                placeholder="Details"
                rows="2"
                cols="10"
              >${fact.details}"</textarea>
              <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
  const factId = ctx.params.id;

  const fact = await getFactById(factId);
  ctx.render(editTamplate(fact, onSubmit));

  async function onSubmit(fact) {
    fact.preventDefault();
    const formData = new FormData(fact.target);

    const editFact = {
      title: formData.get("title").trim(),
      imageUrl: formData.get("image-url").trim(),
      genre: formData.get("genre").trim(),
      country: formData.get("country").trim(),
      details: formData.get("details").trim(),
    };

    if (Object.values(editFact).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editFactById(factId, editFact);
    fact.target.reset();
    ctx.page.redirect(`/details/${factId}`);
  }
}
