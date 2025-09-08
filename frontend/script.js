document.getElementById('searchBtn').addEventListener('click', searchArtist);

async function searchArtist() {
    const query = document.getElementById('artistInput').value.trim();
    if (!query) return;

    const resultsList = document.getElementById('results');
    const mainImage = document.getElementById('mainImage');

    resultsList.innerHTML = "";
    mainImage.innerHTML = "";

    try {
        const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        const resjson = await res.json();

        if (!resjson.data || resjson.data.length === 0) {
            mainImage.innerHTML = "<p>Aucun résultat trouvé.</p>";
            return;
        }

        let firstResult = resjson.data[0];

        // Déterminer le type principal : artiste > album > track
        if (firstResult.type === "artist" || (firstResult.artist && firstResult.artist.picture_big)) {
            // C’est un artiste
            mainImage.innerHTML = `
                <img src="${firstResult.artist.picture_big}" alt="${firstResult.artist.name}" class="artist-large">
                <h2>${firstResult.artist.name}</h2>
            `;
        } 
        else if (firstResult.type === "album" || (firstResult.album && firstResult.album.cover_big)) {
            // C’est un album
            mainImage.innerHTML = `
                <img src="${firstResult.album.cover_big}" alt="${firstResult.album.title}">
                <h2>${firstResult.album.title}</h2>
                <h3>${firstResult.artist.name}</h3>
            `;
        } 
        else if (firstResult.type === "track") {
            // C’est un titre, on prend la pochette de l’album
            mainImage.innerHTML = `
                <img src="${firstResult.album.cover_big}" alt="${firstResult.album.title}">
                <h2>${firstResult.album.title}</h2>
                <h3>${firstResult.artist.name}</h3>
            `;
        }

        // Afficher la liste des résultats
        resjson.data.forEach(item => {
            let li = document.createElement('li');
            let imgSrc = item.album ? item.album.cover_small : (item.artist ? item.artist.picture_small : "");
            let title = item.title || item.name;
            let artist = item.artist ? item.artist.name : "";

            li.innerHTML = `
                <img src="${imgSrc}" alt="${title}">
                <span class="titre">${title}</span>
                <span class="artiste">${artist}</span>
            `;

            resultsList.appendChild(li);
        });

    } catch (err) {
        console.error('Erreur lors de la recherche:', err);
    }
}
