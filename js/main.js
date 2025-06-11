window.onload = (e) => {
    console.log('JS is in tha house!');

    const btnBuscar = document.querySelector('#btn-buscar');
    const inpPeli = document.querySelector('#inp-peli');
    
    function buscarPeli(){
        const peli = inpPeli.value.trim();
        if (peli === "") {
            alert("Ingresa una película");
            return;
        }
        else{
        //Iniciamos el consumo del servicio
            const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(peli)}`;
        
            fetch(url, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYmMwNTBkNTU4MDY4N2FmMzIxNjVjYjAzYmJjZCIsIm5iZiI6MTc0OTQwMjYzMC43MTUwMDAyLCJzdWIiOiI2ODQ1YzQwNjlhZTE0MjViMzEyMDYwODQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Mcq9YMm83ChH2wK-IDmoVdy4hBddKed9bCi5TkA49iE"
                }})
                .then((response) => {
                    console.log('Datos recibidos:', response);
                    return response.json();
                })
                .then((data) => {
                    if (data.results.length === 0) {
                        mostrar.innerHTML = `<p>Pelicula no encontrada</p>`;
                        return;
                    }
                    else{
                        console.log('Datos de la respuesta',data);
                        mostrarPeli(data.results[0])
                    }
            })
            .catch((error) => {
                console.error('Hubo un error');
                let divRespuesta = document.querySelector('#respuesta');
                divRespuesta.innerHTML = "";
                divRespuesta.innerHTML += "<p>Ocurrio un error al buscar la pelicula</p>";
                })
    }}
    function mostrarPeli(peli){
        const mostrar = document.getElementById('respuesta');
        mostrar.innerHTML = " "
        const posterUrl = `https://image.tmdb.org/t/p/w500${peli.poster_path}`
        mostrar.innerHTML += `<img class="poster" src=${posterUrl} alt=${peli.original_title}>`
        mostrar.innerHTML += `<p id="p-titulo">${peli.original_title}</p>`
        mostrar.innerHTML += `<p>Sinopsis: ${peli.overview}</p>`
        mostrar.innerHTML += `<p>Fecha de lanzamiento: ${peli.release_date}</p>`
        mostrar.innerHTML += `<p>Popularidad: ${peli.popularity}</p>`
        mostrar.innerHTML += `<p>Calificación: ${peli.vote_average}</p>`
    }
    btnBuscar.addEventListener('click', buscarPeli);
    inpPeli.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            buscarPeli();
        }
    }); 
}