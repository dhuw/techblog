const updatePost = async (event) => {

    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const text = document.querySelector('#post-text').value;
    const id = event.target.getAttribute('data-id');
  
    if (title && text && id) {
      const response = await fetch(`/updatepost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text, id }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
    }
  };


document.querySelector('.post-form').addEventListener('click', updatePost);