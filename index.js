const url = "https://jsonplaceholder.typicode.com";

const getUser = async (id) => {
  const res = await fetch(`${url}/users?id=${id}`);
  const user = (await res.json())[0];

  return user;
}

const getPosts = async (user) => {
  const res = await fetch(`${url}/posts?userId=${user.id}&_limit=3`)
  const posts = await res.json();

  return posts;
}

const getCommentsForEachPost = async (posts) => {
  const res = await Promise.all(posts.map(post => 
    fetch(`${url}/comments?postId=${post.id}&_limit=3`)  
  ));
  const postComments = await Promise.all(res.map(r => r.json()));

  return postComments; // Devuelve los comentarios
}

const getBlogContent = async () => {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user);
    const postComments = await getCommentsForEachPost(posts);

    posts.forEach(post => {
      content.innerHTML += `
      <div class="post">
      <h4>${post.title}</h4>
      <p>${post.body}</p>
      <br>
      ${postComments[posts.indexOf(post)].map(c => `<p><span>${c.email}:</span>${c.body}</p>`).join('')}
      </div>
      `;
    });
  } catch (err) {
    console.log(err);
  }
}

getBlogContent();

//cambios videos 1