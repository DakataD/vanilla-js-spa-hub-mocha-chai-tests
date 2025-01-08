import { html } from "../../node_modules/lit-html/lit-html.js";
import { editFactById, getFactById } from "../api/data.js";

const editTamplate = (fact, onSubmit) => html`
  <section id="edit">
    <div class="form">
     <img class="border" src="../images/banner.webp" alt="banner" />
      <h2>Edit Character</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input
          type="text"
          name="setup-name"
          id="setup-name"
          placeholder="Setup Name"
          value="${fact.name}"
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
          value="${fact.imageUrl}"
        />

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        >
${fact.description}</textarea
        >

        <textarea
          id="parts-used"
          name="parts-used"
          placeholder="Parts"
          rows="2"
          cols="10"
        >
${fact.parts}</textarea
        >

        <button type="submit">Edit</button>
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
      name: formData.get("setup-name").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      parts: formData.get("parts-used").trim(),
    };

    if (Object.values(editFact).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editFactById(factId, editFact);
    fact.target.reset();
    ctx.page.redirect(`/details/${factId}`);
  }
}
