
  const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    alert("Your post has been deleted")
    if (response.ok) {
      document.location.replace('/dashboard');
    }
  }
};

document.querySelector('#delete-btn').addEventListener('click', deletePost)