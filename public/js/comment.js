const newComment = async (event) => {

    event.preventDefault();

    const text = document.querySelector('#comment-text').value;
    const post_id = document.querySelector('#postID').innerHTML;
  
    if (text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ text, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      }
    }
  };

document.querySelector('.new-comment').addEventListener('submit', newComment);
