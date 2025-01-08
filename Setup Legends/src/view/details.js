import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteFactById,
  getFactById,
  getTotalLikes,
  like,
  didUserLiked
} from "../api/data.js";

const detailsTamplate = (
  fact,
  isOwner,
  onDelete,
  isLoggedIn,
  totalLikesCount,
  onClickLike,
  didUserLikeded
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fact.imageUrl}" alt="example1" />
            <div>
            <p id="details-setup-name">${fact.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                 <p id="setup-description">${fact.description}</p>
                <p id="details-parts">${fact.parts}</p>
              </div>
              </div>
              <h3>Setup Likes:<span id="like">${totalLikesCount}</span></h3>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${fact._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
     ${(() => {
  if (didUserLikeded == 0) {
    if (isLoggedIn && !isOwner) {
      return html` <a href="javascript:void(0)" @click=${onClickLike} id="like-btn">Like</a>`;
    }
  }
})()}
    </div>
            </div>
`;

export async function detailsPage(ctx) {
  const setupId = ctx.params.id;
  const fact = await getFactById(setupId);
  const user = ctx.user;

  let userId;
  let totalLikesCount;
  let didUserLikeded;

  if (user != null) {
    userId = user._id;
    didUserLikeded = await didUserLiked(setupId, userId);
  }

  const isOwner = user && fact._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalLikesCount = await getTotalLikes(setupId);
  ctx.render(
    detailsTamplate(
      fact,
      isOwner,
      onDelete,
      isLoggedIn,
      totalLikesCount,
      onClickLike,
      didUserLikeded
    )
  );

  async function onClickLike() {
    const likes = {
      setupId: setupId,
    };
    await like(likes);

    totalLikesCount = await getTotalLikes(setupId);
    didUserLikeded = await didUserLiked(setupId, userId);
    ctx.render(
      detailsTamplate(
        fact,
        isOwner,
        onDelete,
        isLoggedIn,
        totalLikesCount,
        onClickLike,
        didUserLiked
      )
    );
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteFactById(setupId);
      ctx.page.redirect("/dashboard");
    }
  }
}
