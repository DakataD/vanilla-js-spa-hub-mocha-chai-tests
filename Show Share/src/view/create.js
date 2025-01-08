import { html } from "../../node_modules/lit-html/lit-html.js";
import { addFact } from "../api/data.js";

const createTamplate = (onSubmit) => html`
        <section id="create">
          <div class="form" @submit=${onSubmit}>
            <h2>Add Show</h2>
            <form class="create-form">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="TV Show title"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
            />
            <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
          />
              <textarea
                id="details"
                name="details"
                placeholder="Details"
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Add Show</button>
            </form>
          </div>
        </section>
`;

export async function createPage(ctx) {
  ctx.render(createTamplate(onSubmit));

  async function onSubmit(fact) {
    fact.preventDefault();
    const formData = new FormData(fact.target);

    const newFact = {
      title: formData.get("title").trim(),
      imageUrl: formData.get("image-url").trim(),
      genre: formData.get("genre").trim(),
      country: formData.get("country").trim(),
      details: formData.get("details").trim(),
     
    };

    if (Object.values(newFact).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addFact(newFact);
    fact.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
