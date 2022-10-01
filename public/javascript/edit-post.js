async function editFormHandler(event) {
  event.preventDefault();

  const title = document
    .querySelector('textarea[name="post-title"]')
    .value.trim();
  const content = document
    .querySelector('textarea[name="content"]')
    .value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log("Im here!!!!!!!!!!!!!!!!!!!!!!!!");
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
