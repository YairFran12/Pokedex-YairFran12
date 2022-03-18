const pokePhoto = document.getElementById("pokeImg");
const nombreRes = document.querySelector("#result");
const puntosGolpeRes = document.querySelector("#type-screen");
const experienciaRes = document.querySelector("#id-screen");
const acercaRes = document.querySelector("#about-screen");

window.onload = () => {
  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector("#termino").value;

  if (terminoBusqueda === "") {
    // mensaje de error
    mostrarAlerta("Agrega un término de búsqueda");
    return;
  }

  buscarPokemon();
}

function mostrarAlerta(mensaje) {
  const alerta = document.querySelector(".cardAlerta");
  if (!alerta) {
    const alerta = document.createElement("p");

    alerta.classList.add("cardAlerta");

    alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

async function buscarPokemon() {
  const pokeName = document.querySelector("#termino").value;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    if (respuesta.status == "404") {
      mostrarAlerta("Pokemon no encontrado");
      return;
    }
  }

  const resultado = await respuesta.json();

  console.log(resultado);

  const pokemon = {
    img: resultado.sprites.front_default,
    name: resultado.species.name,
    hp: resultado.stats[0].base_stat,
    xp: resultado.base_experience,
    ataque: resultado.stats[1].base_stat,
    defensa: resultado.stats[2].base_stat,
  };

  mostrarResultados(pokemon);
}

function mostrarResultados(pokemon) {
  const nombre = document.createElement("p");
  const puntosGolpe = document.createElement("p");
  const experiencia = document.createElement("p");
  const acerca = document.createElement("p");

  const { img, name, hp, xp, ataque, defensa } = pokemon;

  let nombreMayus = name.charAt(0).toUpperCase() + name.slice(1);

  limpiarHTML();

  nombre.innerHTML = `
  <span">${nombreMayus}</span>
`;

  puntosGolpe.innerHTML = `
  <span">${hp} hp</span>
`;

  experiencia.innerHTML = `
  <span">${xp} xp</span>
`;

  acerca.innerHTML = `
<span">Ataque:${ataque} k Defensa:${defensa} K</span>
`;

  pokePhoto.src = img;
  nombreRes.appendChild(nombre);
  puntosGolpeRes.appendChild(puntosGolpe);
  experienciaRes.appendChild(experiencia);
  acercaRes.appendChild(acerca);
}

function limpiarHTML() {
  while (nombreRes.firstChild) {
    nombreRes.removeChild(nombreRes.firstChild);
    puntosGolpeRes.removeChild(puntosGolpeRes.firstChild);
    experienciaRes.removeChild(experienciaRes.firstChild);
    acercaRes.removeChild(acercaRes.firstChild);
  }
}
