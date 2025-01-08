import { html } from "../../node_modules/lit-html/lit-html.js";
import { addFact } from "../api/data.js";

const createTamplate = (onSubmit) => html`
        <section id="create">
        <div class="form" @submit=${onSubmit}>
         <img class="border" src="../images/banner.webp" alt="banner" />
          <h2>Add Setup</h2>
          <form class="create-form">
            <input type="text" name="setup-name" id="setup-name" placeholder="Setup Name" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <textarea id="parts-used" name="parts-used" placeholder="Parts" rows="2" cols="10"></textarea>
            <button type="submit">Add setup</button>
          </form>
        </div>
      </section>
`;

export async function createPage(ctx) {
  ctx.render(createTamplate(onSubmit));

  async function onSubmit(fact) {
    fact.preventDefault();
    const formData = new FormData(fact.target);

    const newSetup = {
      name: formData.get("setup-name").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      parts: formData.get("parts-used").trim(),
    };

    if (Object.values(newSetup).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addFact(newSetup);
    fact.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
