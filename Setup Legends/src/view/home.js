import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTamplate = html`
      <section id="home">
      <img id="home-img" src="./images/show.webp" alt="home-img" />
        <h1>
          Welcome to Setup Legends, discover, share, and be inspired by epic gaming PC setups from around the world.
          Whether you're showcasing your ultimate battlestation or seeking ideas to elevate your own, Setup Legends is
          the hub where creativity meets performance. Join the community and let your setup shine!
        </h1>
      </section>

`;

export async function homePage(ctx) {
  ctx.render(homeTamplate);
}
