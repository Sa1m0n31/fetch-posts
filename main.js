const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

document.addEventListener('DOMContentLoaded', () => {
   const container = document.querySelector('.container');

    const fetchFromApi = async (url) => {
        try {
            const response = await fetch(url);
            return response.json();
        }
        catch(err) {
            const isErrorElementExists = document.querySelector('.error');

            if(!isErrorElementExists) {
                const errorElement = document.createElement('p');
                errorElement.classList.add('error');
                errorElement.textContent = 'Wystąpił błąd przy pobieraniu danych.';

                container.appendChild(errorElement);
            }
        }
    }

    const fetchData = async () => {
        const posts = await fetchFromApi(POSTS_URL);
        const comments = await fetchFromApi(COMMENTS_URL);

        return posts.map((item) => {
            const postId = item.id;

            return {
                ...item,
                comments: comments.filter((item) => (item.postId === postId))
            }
        });
    }

    const displayPost = (title, body) => {
        const sectionElement = document.createElement('section');
        const articleElement = document.createElement('article');
        const asideElement = document.createElement('aside');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = body;

        const commentsHeadingElement = document.createElement('h3');
        commentsHeadingElement.textContent = 'Komentarze';

        asideElement.appendChild(commentsHeadingElement);

        articleElement.appendChild(titleElement);
        articleElement.appendChild(bodyElement);

        sectionElement.appendChild(articleElement);
        sectionElement.appendChild(asideElement);

        container.appendChild(sectionElement);
        return sectionElement;
    }

    const displayComment = (comment, postElement) => {
        const { name, email, body } = comment;

        const asideElement = postElement.childNodes[1];
        const commentElement = document.createElement('div');

        const commentAuthorElement = document.createElement('h4');
        commentAuthorElement.textContent = `${name} (${email})`;

        const commentBodyElement = document.createElement('p');
        commentBodyElement.textContent = body;

        commentElement.appendChild(commentAuthorElement);
        commentElement.appendChild(commentBodyElement);

        asideElement.appendChild(commentElement);
    }

    const displayData = async () => {
        const data = await fetchData();
        const documentBody = document.querySelector('body');

        for(const post of data) {
            const { title, body, comments } = post;
            const postElement = displayPost(title, body, documentBody);

            for(const comment of comments) {
                displayComment(comment, postElement);
            }
        }
    }

    displayData();
});
