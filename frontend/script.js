document.getElementById('searchBtn').addEventListener('click', searchArtist);

async function searchArtist()
{
    const query = document.getElementById('artistInput').value;
    if(!query)
    {
        return
    }
    document.getElementById('artistInfo').innerHTML = '';
    document.getElementById('tracks').innerHTML = '';
    console.log(query)

    //recherche avec l api
    try
    {
        const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`)
        const resjson = res.json();
        console.log(res);
        console.log(resjson);

    } catch (err) {
        console.error('Erreur lors de la recherche:', err);
    }
}