const apiURL = 'https://jsonplaceholder.typicode.com/posts';

const postslist = document.getElementById('posts-list');
const statusMessage = document.getElementById('status-message');
const postForm = document.getElementById('post-form');
const formError = document.getElementById('form-error');

async function fetchPosts() {
    try {
        statusMessage.textContent = 'Se incarca postarile...';
        statusMessage.classList.remove('hidden');
        postslist.innerHTML = '';

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        posts.slice(0, 10).forEach((post) => {
            renderPost(post);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        statusMessage.textContent = 'Error fetching posts.';
        statusMessage.classList.add('error');
    }
}

function renderPost(post) {
    const listItem = document.createElement('li');
    listItem.dataset.id = post.id;

    const textDiv = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = post.title;
    const body = document.createElement('p');
    body.textContent = post.body;

    textDiv.appendChild(title);
    textDiv.appendChild(body);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Sterge';
    deleteButton.className = 'delete-button';
    deleteButton.dataset.action = 'delete';

    listItem.appendChild(textDiv);
    listItem.appendChild(deleteButton);
    postslist.prepend(listItem);
}

postForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formError.textContent = '';
    const formData = new FormData(postForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newPost = await response.json();
        renderPost(newPost);
        postForm.reset();
    } catch (error) {
        console.error('Error submitting post:', error);
        formError.textContent = 'Error submitting post.';
    }
});

postslist.addEventListener('click', async (event) => {
    if (event.target.dataset.action === 'delete') {
        const listItem = event.target.closest('li');
        if (listItem) {
            listItem.remove();
        }

        if (postslist.children.length === 0) {
            statusMessage.textContent = 'Lista este goala.';
            statusMessage.classList.remove('hidden');
        }
    }
});

fetchPosts();