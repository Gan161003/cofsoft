document.getElementById('blogForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    try {
        const response = await axios.post('/api/blog', { title, content });
        console.log(response.data);
        fetchBlogPosts();
    } catch (error) {
        console.error(error);
    }
});

async function fetchBlogPosts() {
    try {
        const response = await axios.get('/api/blog');
        const blogPosts = response.data;
        
        const blogPostsDiv = document.getElementById('blogPosts');
        blogPostsDiv.innerHTML = '';
        
        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><hr>`;
            blogPostsDiv.appendChild(postElement);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchBlogPosts();
