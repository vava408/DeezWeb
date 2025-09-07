document.getElementById('searchBtn').addEventListener('click', searchArtist);

async function searchArtist() {
    const query = document.getElementById('artistInput').value;
    if (!query) return;

    const resultsList = document.getElementById('results');
    resultsList.querySelectorAll('li:not(.header)').forEach(li => li.remove());

    try {
        const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        const resjson = await res.json();

        resjson.data.forEach(track => {
            const li = document.createElement('li');

            li.innerHTML = `
                <img src="${track.artist.picture}" alt="${track.artist}">
                <span class="titre">${track.title}</span>
                <span class="artiste">${track.artist.name}</span>
            `;

            resultsList.appendChild(li);
        });

    } catch (err) {
        console.error('Erreur lors de la recherche:', err);
    }
}
