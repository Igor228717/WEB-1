const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadPost() {
    try {
        const [postRes, commentsRes] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ]);

        if (!postRes.ok || !commentsRes.ok) throw new Error('Ошибка загрузки');

        const post = await postRes.json();
        const comments = await commentsRes.json();

        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-body').textContent = post.body;
        
        document.getElementById('comments').innerHTML = comments.map(comment => `
            <div class="comment">
                <h4>${comment.name}</h4>
                <p><strong>${comment.email}</strong></p>
                <p>${comment.body}</p>
            </div>
        `).join('');

    } catch (error) {
        document.body.innerHTML = '<div class="error">Ошибка загрузки поста</div>';
        console.error(error);
    }
}
loadPost();