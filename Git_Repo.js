function getRepositories() {
    const username = document.getElementById('username').value.trim();
    const resultContainer = document.getElementById('result');

    // Clear previous results
    resultContainer.innerHTML = '';

    if (username === '') {
        alert('Please enter a GitHub username.');
        return;
    }

    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Not Found') {
                resultContainer.innerHTML = `<p>User not found.</p>`;
            } else {
                const repositories = Array.isArray(data) ? data.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('') : '<p>No repositories found.</p>';
                resultContainer.innerHTML = `<ul>${repositories}</ul>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultContainer.innerHTML = `<p>An error occurred while fetching data.</p>`;
        });
}
