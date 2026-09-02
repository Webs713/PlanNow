let selectedPeople = null;
let selectedMoney = null;
let selectedMood = null;

let userLatitude = null;
let userLongitude = null;


/* ================================
   API KEY
================================ */

const API_KEY = "628e5ff9a1724ea8bb1ee4e1d62c5386";


/* ================================
   ELEMENTOS
================================ */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const questionsScreen =
    document.getElementById("questionsScreen");

const resultScreen =
    document.getElementById("resultScreen");

const startButton =
    document.getElementById("startButton");

const generateButton =
    document.getElementById("generateButton");

const anotherButton =
    document.getElementById("anotherButton");

const cityInput =
    document.getElementById("cityInput");

const locationButton =
    document.getElementById("locationButton");

const locationMessage =
    document.getElementById("locationMessage");

const result =
    document.getElementById("result");

const navHome =
    document.getElementById("navHome");

const navSearch =
    document.getElementById("navSearch");

const navFavorites =
    document.getElementById("navFavorites");

 const planTypeScreen = document.getElementById("planTypeScreen");


/* ================================
   FAVORITOS
================================ */

let favorites =
    JSON.parse(
        localStorage.getItem("planNowFavorites")
    ) || [];


function saveFavorites() {

    localStorage.setItem(
        "planNowFavorites",
        JSON.stringify(favorites)
    );
}


function isFavorite(placeId) {

    return favorites.some(
        place => place.id === placeId
    );
}


function toggleFavorite(place) {

    const p =
        place.properties || {};

    const id =
        p.place_id ||
        p.datasource?.raw?.place_id ||
        p.formatted ||
        p.name;

    if (!id) return;


    if (isFavorite(id)) {

        favorites =
            favorites.filter(
                place => place.id !== id
            );

    } else {

        favorites.push({
            id: id,
            name: getPlaceName(place),
            address:
                p.formatted ||
                p.address_line1 ||
                "",
            latitude:
                place.geometry?.coordinates?.[1],
            longitude:
                place.geometry?.coordinates?.[0]
        });
    }

    saveFavorites();
}


/* ================================
   PANTALLAS
================================ */

function showWelcome() {

    welcomeScreen.classList.remove("hidden");

    questionsScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    planTypeScreen.classList.add("hidden");

    ideaScreen.classList.add("hidden");

    ideaResultScreen.classList.add("hidden");
}


function showQuestions() {

    welcomeScreen.classList.add("hidden");

    questionsScreen.classList.remove("hidden");

    resultScreen.classList.add("hidden");

    planTypeScreen.classList.add("hidden");

    ideaScreen.classList.add("hidden");

    ideaResultScreen.classList.add("hidden");
}


function showResults() {

    welcomeScreen.classList.add("hidden");

    questionsScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    planTypeScreen.classList.add("hidden");

    ideaScreen.classList.add("hidden");

    ideaResultScreen.classList.add("hidden");
}

/* ================================
   INICIO
================================ */

startButton.addEventListener(
    "click",
    () => {

        welcomeScreen.classList.add("hidden");
        questionsScreen.classList.add("hidden");
        resultScreen.classList.add("hidden");
        planTypeScreen.classList.remove("hidden");

    }
);
const findPlaceButton = document.getElementById("findPlaceButton");

findPlaceButton.addEventListener(
    "click",
    () => {

        planTypeScreen.classList.add("hidden");
        questionsScreen.classList.remove("hidden");

    }
);
const ideaScreen = document.getElementById("ideaScreen");
const ideaButton = document.getElementById("ideaButton");
const ideaResultScreen = document.getElementById("ideaResultScreen");
const ideaResult = document.getElementById("ideaResult");
const generateIdeaButton = document.getElementById("generateIdeaButton");
const anotherIdeaButton = document.getElementById("anotherIdeaButton");

ideaButton.addEventListener(
    "click",
    () => {

        planTypeScreen.classList.add("hidden");
        ideaScreen.classList.remove("hidden");

    }
);
/* ================================
   NAVEGACIÓN
================================ */

navHome.addEventListener(
    "click",
    event => {

        event.preventDefault();

        showWelcome();
    }
);


navSearch.addEventListener(
    "click",
    event => {

        event.preventDefault();

        showQuestions();
    }
);


navFavorites.addEventListener(
    "click",
    event => {

        event.preventDefault();

        showFavorites();
    }
);


/* ================================
   PERSONAS
================================ */

document
    .querySelectorAll(".people")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".people")
                    .forEach(b => {

                        b.classList.remove(
                            "selected"
                        );

                    });

                button.classList.add(
                    "selected"
                );

                selectedPeople =
                    button.dataset.value;
            }
        );
    });
    let ideaPeople = null;
let ideaMoney = null;
let ideaMood = null;
const ideas = [

    // 🚲 AVENTURA
    {
        mood: "aventura",
        title: "🚲 Ruta en bici",
        text: "Haz una ruta en bicicleta por una zona tranquila y descubre nuevos lugares.",
        time: "1-2 horas",
        maxBudget: 5,
        minPeople: 1
    },
    {
        mood: "aventura",
        title: "🌳 Exploración de un parque",
        text: "Explora un parque que no conozcáis y buscad rincones interesantes.",
        time: "1 hora",
        maxBudget: 0,
        minPeople: 1
    },
    {
        mood: "aventura",
        title: "📸 Ruta de fotos",
        text: "Salid a descubrir vuestra zona y haced fotos de los lugares más curiosos.",
        time: "1-2 horas",
        maxBudget: 0,
        minPeople: 1
    },

    // 🎮 VIDEOJUEGOS
    {
        mood: "videojuegos",
        title: "🎮 Torneo de videojuegos",
        text: "Organizad un pequeño torneo y competid por conseguir la mayor puntuación.",
        time: "1-2 horas",
        maxBudget: 0,
        minPeople: 2
    },
    {
        mood: "videojuegos",
        title: "🏆 Campeonato de puntuaciones",
        text: "Elegid varios juegos y apuntad las puntuaciones de cada jugador.",
        time: "1 hora",
        maxBudget: 0,
        minPeople: 2
    },
    {
        mood: "videojuegos",
        title: "🎲 Noche de juegos",
        text: "Elegid varios juegos y cambiad de juego cada cierto tiempo.",
        time: "2 horas",
        maxBudget: 10,
        minPeople: 2
    },

    // 🏃 DEPORTE
    {
        mood: "deporte",
        title: "⚽ Partido improvisado",
        text: "Montad un partido y dividíos en equipos.",
        time: "1 hora",
        maxBudget: 0,
        minPeople: 4
    },
    {
        mood: "deporte",
        title: "🏀 Reto de tiros",
        text: "Id a una cancha y organizad diferentes rondas de tiros.",
        time: "45-60 minutos",
        maxBudget: 0,
        minPeople: 2
    },
    {
        mood: "deporte",
        title: "🏃 Circuito deportivo",
        text: "Preparad varias pruebas deportivas sencillas y puntuad cada ronda.",
        time: "1 hora",
        maxBudget: 0,
        minPeople: 2
    },

    // 🎨 CREATIVO
    {
        mood: "creativo",
        title: "🎨 Concurso de dibujo",
        text: "Elegid un tema y haced un dibujo. Después votad vuestro favorito.",
        time: "45 minutos",
        maxBudget: 5,
        minPeople: 2
    },
    {
        mood: "creativo",
        title: "🧱 Construcción creativa",
        text: "Construid algo usando materiales que tengáis por casa.",
        time: "1 hora",
        maxBudget: 5,
        minPeople: 1
    },
    {
        mood: "creativo",
        title: "🎬 Grabad un corto",
        text: "Inventad una pequeña historia y grabad vuestro propio cortometraje.",
        time: "1-2 horas",
        maxBudget: 0,
        minPeople: 2
    },

    // 🧩 JUEGOS
    {
        mood: "juegos",
        title: "🧩 Búsqueda del tesoro",
        text: "Esconded pistas y cread una pequeña búsqueda del tesoro.",
        time: "1 hora",
        maxBudget: 5,
        minPeople: 2
    },
    {
        mood: "juegos",
        title: "🕵️ Misterio por equipos",
        text: "Inventad un misterio y cread pistas para que los demás lo resuelvan.",
        time: "1 hora",
        maxBudget: 0,
        minPeople: 3
    },
    {
        mood: "juegos",
        title: "⏱️ Reto de 60 segundos",
        text: "Inventad pruebas que haya que completar en menos de un minuto.",
        time: "45 minutos",
        maxBudget: 0,
        minPeople: 2
    },

    // 🎲 SORPRESA
    {
        mood: "sorpresa",
        title: "🎲 Plan al azar",
        text: "Escribid varias actividades en papeles, mezcladlos y elegid una al azar.",
        time: "1 hora",
        maxBudget: 5,
        minPeople: 1
    },
    {
        mood: "sorpresa",
        title: "📍 Explorad un sitio nuevo",
        text: "Elegid una zona que no conozcáis demasiado y descubridla juntos.",
        time: "1-2 horas",
        maxBudget: 5,
        minPeople: 2
    },
    {
        mood: "sorpresa",
        title: "🎨 Reto creativo sorpresa",
        text: "Elegid al azar algo para dibujar, construir o inventar.",
        time: "45 minutos",
        maxBudget: 0,
        minPeople: 1
    }

];

document.querySelectorAll(".idea-people").forEach(button => {
    button.addEventListener("click", () => {
        ideaPeople = button.dataset.value;

        document.querySelectorAll(".idea-people").forEach(b => {
            b.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});
let lastIdeaTitle = null;

function generateIdea() {

    const people = ideaPeople === "4" ? 4 : Number(ideaPeople);
    const money = Number(ideaMoney);

    let availableIdeas = ideas.filter(idea => {

        const correctMood =
            ideaMood === "sorpresa" ||
            idea.mood === ideaMood;

        const correctBudget =
            idea.maxBudget <= money;

        const correctPeople =
            people >= idea.minPeople;

        return correctMood && correctBudget && correctPeople;
    });

    // Si la última idea vuelve a salir, intentamos quitarla
    if (availableIdeas.length > 1 && lastIdeaTitle) {
        const differentIdeas = availableIdeas.filter(
            idea => idea.title !== lastIdeaTitle
        );

        if (differentIdeas.length > 0) {
            availableIdeas = differentIdeas;
        }
    }

    // Si no hay ninguna idea que encaje perfectamente,
    // buscamos solamente por categoría
    if (availableIdeas.length === 0) {

        availableIdeas = ideas.filter(idea => {

            return (
                ideaMood === "sorpresa" ||
                idea.mood === ideaMood
            );

        });
    }

    // Elegimos una idea al azar
    const randomIndex =
        Math.floor(Math.random() * availableIdeas.length);

    const plan = availableIdeas[randomIndex];

    lastIdeaTitle = plan.title;

    ideaResult.innerHTML = `
        <div class="plan-card">
            <h2>${plan.title}</h2>

            <p>${plan.text}</p>

            <p>⏱️ <strong>Duración:</strong> ${plan.time}</p>

            <p>👥 <strong>Personas:</strong> ${plan.minPeople} o más</p>

            <p>💰 <strong>Presupuesto:</strong> hasta ${plan.maxBudget} €</p>
        </div>
    `;
}

generateIdeaButton.addEventListener("click", () => {

    if (!ideaPeople || !ideaMoney || !ideaMood) {
        alert("⚠️ Elige cuántas personas sois, el presupuesto y qué os apetece.");
        return;
    }

    ideaScreen.classList.add("hidden");
    ideaResultScreen.classList.remove("hidden");

    generateIdea();
});
anotherIdeaButton.addEventListener("click", () => {

    generateIdea();

});
document.querySelectorAll(".idea-money").forEach(button => {
    button.addEventListener("click", () => {
        ideaMoney = button.dataset.value;

        document.querySelectorAll(".idea-money").forEach(b => {
            b.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});
document.querySelectorAll(".idea-mood").forEach(button => {
    button.addEventListener("click", () => {
        ideaMood = button.dataset.value;

        document.querySelectorAll(".idea-mood").forEach(b => {
            b.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});


/* ================================
   DINERO
================================ */

document
    .querySelectorAll(".money")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".money")
                    .forEach(b => {

                        b.classList.remove(
                            "selected"
                        );

                    });

                button.classList.add(
                    "selected"
                );

                selectedMoney =
                    button.dataset.value;
            }
        );
    });


/* ================================
   TIPO DE PLAN
================================ */

document
    .querySelectorAll(".mood")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".mood")
                    .forEach(b => {

                        b.classList.remove(
                            "selected"
                        );

                    });

                button.classList.add(
                    "selected"
                );

                selectedMood =
                    button.dataset.value;
            }
        );
    });


/* ================================
   UBICACIÓN
================================ */

locationButton.addEventListener(
    "click",
    () => {

        if (!navigator.geolocation) {

            locationMessage.textContent =
                "❌ Tu navegador no permite obtener la ubicación.";

            return;
        }

        locationMessage.textContent =
            "📍 Obteniendo ubicación...";


        navigator.geolocation.getCurrentPosition(

            position => {

                userLatitude =
                    position.coords.latitude;

                userLongitude =
                    position.coords.longitude;

                locationMessage.textContent =
                    "✅ Ubicación encontrada.";
            },

            () => {

                locationMessage.textContent =
                    "❌ No hemos podido obtener tu ubicación.";
            }
        );
    }
);


/* ================================
   CATEGORÍAS
================================ */

function getCategories() {

    if (selectedMood === "cultura") {

        return [
            "entertainment.museum",
            "entertainment.culture",
            "tourism"
        ].join(",");
    }


    if (selectedMood === "deporte") {

        return [
            "sport",
            "leisure"
        ].join(",");
    }


    if (selectedMood === "naturaleza") {

        return [
            "leisure.park",
            "natural",
            "tourism"
        ].join(",");
    }


    if (selectedMood === "ocio") {

        return [
            "entertainment",
            "leisure"
        ].join(",");
    }


    if (selectedMood === "comida") {

        return [
            "catering",
            "catering.restaurant",
            "catering.cafe",
            "catering.fast_food"
        ].join(",");
    }


    return [
        "entertainment",
        "leisure",
        "tourism",
        "catering"
    ].join(",");
}


/* ================================
   BUSCAR CIUDAD
================================ */

async function findCity(city) {

    const url =
        "https://api.geoapify.com/v1/geocode/search" +
        "?text=" +
        encodeURIComponent(city) +
        "&limit=1" +
        "&apiKey=" +
        API_KEY;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "No se pudo encontrar la ciudad."
        );
    }


    const data =
        await response.json();


    if (
        !data.features ||
        data.features.length === 0
    ) {

        throw new Error(
            "Ciudad no encontrada."
        );
    }


    const coordinates =
        data.features[0]
            .geometry
            .coordinates;


    return {

        longitude:
            coordinates[0],

        latitude:
            coordinates[1]
    };
}


/* ================================
   BUSCAR LUGARES
================================ */

async function findPlaces(
    latitude,
    longitude
) {

    const categories =
        getCategories();


    const url =
        "https://api.geoapify.com/v2/places" +
        "?categories=" +
        encodeURIComponent(categories) +
        "&filter=circle:" +
        longitude +
        "," +
        latitude +
        ",10000" +
        "&bias=proximity:" +
        longitude +
        "," +
        latitude +
        "&limit=20" +
        "&apiKey=" +
        API_KEY;


    const response =
        await fetch(url);


    if (!response.ok) {

        const errorText =
            await response.text();

        console.error(
            "Error Geoapify:",
            errorText
        );

        throw new Error(
            "No se pudieron buscar lugares."
        );
    }


    const data =
        await response.json();


    return data.features || [];
}


/* ================================
   DETALLES
================================ */

async function getPlaceDetails(
    placeId
) {

    if (!placeId) {

        return null;
    }


    const url =
        "https://api.geoapify.com/v2/place-details" +
        "?id=" +
        encodeURIComponent(placeId) +
        "&lang=es" +
        "&apiKey=" +
        API_KEY;


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            return null;
        }


        const data =
            await response.json();


        if (
            data.features &&
            data.features.length > 0
        ) {

            return data
                .features[0]
                .properties || {};
        }

    } catch (error) {

        console.error(
            "Error obteniendo detalles:",
            error
        );
    }


    return null;
}


/* ================================
   NOMBRE
================================ */

function getPlaceName(place) {

    const p =
        place.properties || {};


    if (
        p.name &&
        p.name.trim() !== ""
    ) {

        return p.name.trim();
    }


    if (
        p.address_line1 &&
        p.address_line1.trim() !== ""
    ) {

        return p.address_line1.trim();
    }


    if (
        p.street &&
        p.street.trim() !== ""
    ) {

        return p.street.trim();
    }


    return null;
}


/* ================================
   TEXTOS
================================ */

function getPeopleText() {

    if (selectedPeople === "1")
        return "1 persona";

    if (selectedPeople === "2")
        return "2 personas";

    if (selectedPeople === "3")
        return "3 personas";

    if (selectedPeople === "4")
        return "4 o más personas";

    return "Cualquier número";
}


function getMoneyText() {

    if (selectedMoney === "0")
        return "Gratis";

    if (selectedMoney === "5")
        return "Hasta 5€";

    if (selectedMoney === "10")
        return "Hasta 10€";

    if (selectedMoney === "20")
        return "20€ o más";

    return "Cualquier presupuesto";
}


function getMoodText() {

    if (selectedMood === "cultura")
        return "🏛️ Cultura";

    if (selectedMood === "deporte")
        return "⚽ Deporte";

    if (selectedMood === "naturaleza")
        return "🌳 Naturaleza";

    if (selectedMood === "ocio")
        return "🎮 Ocio";

    if (selectedMood === "comida")
        return "🍕 Comer";

    return "😎 Cualquier plan";
}


/* ================================
   DISTANCIA
================================ */

function getDistanceText(
    distance
) {

    if (
        distance === undefined ||
        distance === null
    ) {

        return "Distancia desconocida";
    }


    if (distance >= 1000) {

        return (
            distance / 1000
        ).toFixed(1) + " km";
    }


    return (
        Math.round(distance)
    ) + " m";
}


/* ================================
   SEGURIDAD HTML
================================ */

function escapeHTML(text) {

    if (!text)
        return "";

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* ================================
   FOTO
================================ */

function getPlacePhoto(
    place,
    details
) {

    const p =
        place.properties || {};

    const d =
        details || {};


    if (
        d.wiki_and_media &&
        d.wiki_and_media.image
    ) {

        return d
            .wiki_and_media
            .image;
    }


    if (
        d.wiki_and_media &&
        d.wiki_and_media.image_url
    ) {

        return d
            .wiki_and_media
            .image_url;
    }


    if (
        d.datasource &&
        d.datasource.raw
    ) {

        const raw =
            d.datasource.raw;


        if (raw.image)
            return raw.image;

        if (raw.image_url)
            return raw.image_url;
    }


    if (d.image)
        return d.image;

    if (d.image_url)
        return d.image_url;

    if (p.image)
        return p.image;

    if (p.image_url)
        return p.image_url;


    return null;
}


/* ================================
   TARJETA
================================ */

function createPlaceCard(
    place,
    details
) {

    const p =
        place.properties || {};

    const d =
        details || {};


    const name =
        getPlaceName(place);


    const address =
        p.formatted ||
        p.address_line1 ||
        "Dirección no disponible";


    const distance =
        getDistanceText(
            p.distance
        );


    const openingHours =
        d.opening_hours ||
        p.opening_hours ||
        "";


    const website =
        d.website ||
        p.website ||
        "";


    let phone = "";


    if (
        d.contact &&
        d.contact.phone
    ) {

        phone =
            d.contact.phone;

    } else if (
        p.contact &&
        p.contact.phone
    ) {

        phone =
            p.contact.phone;
    }


    const description =
        d.description || "";


    const photo =
        getPlacePhoto(
            place,
            details
        );


    let lat = null;

    let lon = null;


    if (
        place.geometry &&
        place.geometry.coordinates
    ) {

        lon =
            place.geometry
                .coordinates[0];

        lat =
            place.geometry
                .coordinates[1];
    }


    const placeId =
        p.place_id ||
        p.formatted ||
        p.name;


    let mapLink = "";


    if (
        lat !== null &&
        lon !== null
    ) {

        mapLink = `
            <a
                class="place-button"
                href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}"
                target="_blank"
                rel="noopener noreferrer"
            >
                🗺️ Ver en Maps
            </a>
        `;
    }


    let websiteLink = "";


    if (website) {

        websiteLink = `
            <a
                class="place-button"
                href="${escapeHTML(website)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                🌐 Web
            </a>
        `;
    }


    let phoneLink = "";


    if (phone) {

        phoneLink = `
            <a
                class="place-button"
                href="tel:${escapeHTML(phone)}"
            >
                📞 Llamar
            </a>
        `;
    }


    let photoHTML = "";


    if (photo) {

        photoHTML = `
            <img
                class="place-photo"
                src="${escapeHTML(photo)}"
                alt="Foto de ${escapeHTML(name)}"
                loading="lazy"
                onerror="this.style.display='none'"
            >
        `;
    }


    const favorite =
        isFavorite(placeId);


    const favoriteText =
        favorite
            ? "❤️ Guardado en favoritos"
            : "🤍 Añadir a favoritos";


    const card =
        document.createElement("div");


    card.className =
        "place-card";


    card.innerHTML = `

        ${photoHTML}

        <div class="place-content">

            <div class="place-icon">
                📍
            </div>

            <h3>
                ${escapeHTML(name)}
            </h3>

            <p>
                🏠 ${escapeHTML(address)}
            </p>

            <div class="place-info">

                <span>
                    📏 ${distance}
                </span>

                ${
                    openingHours
                        ? `<span>
                            🕐 Horario disponible
                           </span>`
                        : ""
                }

            </div>

            ${
                description
                    ? `
                        <p class="description">
                            ℹ️ ${escapeHTML(description)}
                        </p>
                    `
                    : ""
            }

            ${
                phone
                    ? `<p>📞 ${escapeHTML(phone)}</p>`
                    : ""
            }

            <div class="place-buttons">

                ${mapLink}

                ${websiteLink}

                ${phoneLink}

            </div>

            <button
                class="favorite-button"
            >
                ${favoriteText}
            </button>

        </div>
    `;


    const favoriteButton =
        card.querySelector(
            ".favorite-button"
        );


    favoriteButton.addEventListener(
        "click",
        () => {

            toggleFavorite(place);

            favoriteButton.textContent =
                isFavorite(placeId)
                    ? "❤️ Guardado en favoritos"
                    : "🤍 Añadir a favoritos";
        }
    );


    return card;
}


/* ================================
   MOSTRAR RESULTADOS
================================ */

async function showPlaces(
    places,
    city
) {

    result.innerHTML = "";


    const validPlaces =
        places.filter(place => {

            return (
                getPlaceName(place)
                !== null
            );
        });


    if (
        validPlaces.length === 0
    ) {

        result.innerHTML = `

            <div class="place-card">

                <div class="place-content">

                    <h3>
                        😕 No encontramos lugares
                    </h3>

                    <p>
                        Prueba con otra ciudad
                        o con otro tipo de plan.
                    </p>

                </div>

            </div>
        `;

        return;
    }


    const header =
        document.createElement(
            "div"
        );


    header.className =
        "results-header";


    header.innerHTML = `

        <h2>
            🎯 ${validPlaces.length}
            planes encontrados
        </h2>

        <p>
            📍 Cerca de
            ${escapeHTML(city)}
        </p>

        <div
            class="selected-summary"
        >

            <span>
                👥 ${getPeopleText()}
            </span>

            <span>
                💰 ${getMoneyText()}
            </span>

            <span>
                ${getMoodText()}
            </span>

        </div>
    `;


    result.appendChild(header);


    const loading =
        document.createElement(
            "div"
        );


    loading.className =
        "place-card loading-card";


    loading.innerHTML = `

        <div class="place-content">

            <h3>
                ✨ Preparando los lugares...
            </h3>

            <p>
                Buscando información
                y fotografías.
            </p>

        </div>
    `;


    result.appendChild(
        loading
    );


    const detailedPlaces = [];


    for (
        const place of validPlaces
    ) {

        const placeId =
            place.properties &&
            place.properties.place_id
                ? place.properties.place_id
                : null;


        const details =
            await getPlaceDetails(
                placeId
            );


        detailedPlaces.push({

            place,

            details
        });
    }


    loading.remove();


    detailedPlaces.forEach(
        ({ place, details }) => {

            const card =
                createPlaceCard(
                    place,
                    details
                );

            result.appendChild(
                card
            );
        }
    );
}


/* ================================
   BUSCAR PLANES
================================ */

generateButton.addEventListener(
    "click",
    async () => {

        const city =
            cityInput.value.trim();


        if (
            city === "" &&
            userLatitude === null
        ) {

            alert(
                "Escribe una ciudad o pulsa «Usar mi ubicación»."
            );

            return;
        }


        if (!selectedPeople) {

            alert(
                "Selecciona con quién vas."
            );

            return;
        }


        if (!selectedMoney) {

            alert(
                "Selecciona tu presupuesto."
            );

            return;
        }


        if (!selectedMood) {

            alert(
                "Selecciona qué te apetece hacer."
            );

            return;
        }


        showResults();


        result.innerHTML = `

            <div
                class="place-card loading-card"
            >

                <div class="place-content">

                    <h3>
                        🔎 Buscando planes...
                    </h3>

                    <p>
                        Buscando lugares reales
                        cerca de ti.
                    </p>

                </div>

            </div>
        `;


        try {

            let latitude;

            let longitude;


            const cityName =
                city ||
                "tu ubicación";


            if (
                userLatitude !== null &&
                userLongitude !== null
            ) {

                latitude =
                    userLatitude;

                longitude =
                    userLongitude;

            } else {

                const coordinates =
                    await findCity(
                        city
                    );


                latitude =
                    coordinates.latitude;

                longitude =
                    coordinates.longitude;
            }


            const places =
                await findPlaces(
                    latitude,
                    longitude
                );


            await showPlaces(
                places,
                cityName
            );


        } catch (error) {

            console.error(
                error
            );


            result.innerHTML = `

                <div
                    class="place-card"
                >

                    <div
                        class="place-content"
                    >

                        <h3>
                            ❌ Ha ocurrido un error
                        </h3>

                        <p>
                            No hemos podido realizar
                            la búsqueda.
                        </p>

                    </div>

                </div>
            `;
        }
    }
);


/* ================================
   NUEVA BÚSQUEDA
================================ */

anotherButton.addEventListener(
    "click",
    () => {

        showQuestions();
    }
);


/* ================================
   MOSTRAR FAVORITOS
================================ */

function showFavorites() {

    showResults();


    result.innerHTML = "";


    if (
        favorites.length === 0
    ) {

        result.innerHTML = `

            <div class="place-card">

                <div class="place-content">

                    <h3>
                        ❤️ No tienes favoritos
                    </h3>

                    <p>
                        Cuando encuentres un lugar
                        que te guste, pulsa
                        «Añadir a favoritos».
                    </p>

                </div>

            </div>
        `;

        return;
    }


    const header =
        document.createElement(
            "div"
        );


    header.className =
        "results-header";


    header.innerHTML = `

        <h2>
            ❤️ Tus favoritos
        </h2>

        <p>
            Has guardado
            ${favorites.length}
            lugares.
        </p>
    `;


    result.appendChild(
        header
    );


    favorites.forEach(
        favorite => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "place-card";


            let mapLink = "";


            if (
                favorite.latitude &&
                favorite.longitude
            ) {

                mapLink = `

                    <a
                        class="place-button"
                        href="https://www.google.com/maps/search/?api=1&query=${favorite.latitude},${favorite.longitude}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        🗺️ Ver en Maps
                    </a>
                `;
            }


            card.innerHTML = `

                <div
                    class="place-content"
                >

                    <div
                        class="place-icon"
                    >
                        ❤️
                    </div>

                    <h3>
                        ${escapeHTML(
                            favorite.name
                        )}
                    </h3>

                    <p>
                        🏠
                        ${escapeHTML(
                            favorite.address
                        )}
                    </p>

                    <div
                        class="place-buttons"
                    >

                        ${mapLink}

                    </div>

                    <button
                        class="favorite-button"
                    >
                        🗑️ Quitar de favoritos
                    </button>

                </div>
            `;


            const removeButton =
                card.querySelector(
                    ".favorite-button"
                );


            removeButton.addEventListener(
                "click",
                () => {

                    favorites =
                        favorites.filter(
                            item =>
                                item.id !==
                                favorite.id
                        );


                    saveFavorites();

                    showFavorites();
                }
            );


            result.appendChild(
                card
            );
        }
    );
}
const languageButton = document.getElementById("languageButton");
const languageMenu = document.getElementById("languageMenu");

languageButton.addEventListener("click", function () {
    languageMenu.classList.toggle("show");
});

document.querySelectorAll("[data-language]").forEach(function (button) {
    button.addEventListener("click", function () {
        languageMenu.classList.remove("show");
    });
});

document.addEventListener("click", function (event) {
    if (
        !languageButton.contains(event.target) &&
        !languageMenu.contains(event.target)
    ) {
        languageMenu.classList.remove("show");
    }
});
const translations = {
    es: {
        language: "🌐 ES ▾",
        home: "Inicio",
        search: "Buscar planes",
        favorites: "❤️ Favoritos",
        welcomeTitle: "PlanNow",
        welcomeQuestion: "¿Qué te apetece hacer?",
        welcomeSubtitle: "Encuentra planes cerca de ti según tus gustos.",
        start: "Empezar",
        questionsTitle: "Cuéntanos qué buscas",
        cityTitle: "¿Dónde quieres buscar?",
        peopleTitle: "¿Cuántas personas sois?",
        moneyTitle: "¿Cuánto queréis gastar?",
        moodTitle: "¿Qué os apetece hacer?",
        generate: "✨ Generar planes",
        resultsTitle: "Planes para ti",
        another: "🔄 Buscar otros planes"
    },

    en: {
        language: "🌐 EN ▾",
        home: "Home",
        search: "Find plans",
        favorites: "❤️ Favorites",
        welcomeTitle: "PlanNow",
        welcomeQuestion: "What do you feel like doing?",
        welcomeSubtitle: "Find plans near you based on your preferences.",
        start: "Start",
        questionsTitle: "Tell us what you're looking for",
        cityTitle: "Where do you want to search?",
        peopleTitle: "How many people are you?",
        moneyTitle: "How much do you want to spend?",
        moodTitle: "What do you feel like doing?",
        generate: "✨ Generate plans",
        resultsTitle: "Plans for you",
        another: "🔄 Find other plans"
    },

    fr: {
        language: "🌐 FR ▾",
        home: "Accueil",
        search: "Chercher des plans",
        favorites: "❤️ Favoris",
        welcomeTitle: "PlanNow",
        welcomeQuestion: "Qu'avez-vous envie de faire ?",
        welcomeSubtitle: "Trouvez des plans près de vous selon vos goûts.",
        start: "Commencer",
        questionsTitle: "Dites-nous ce que vous cherchez",
        cityTitle: "Où voulez-vous chercher ?",
        peopleTitle: "Combien êtes-vous ?",
        moneyTitle: "Combien voulez-vous dépenser ?",
        moodTitle: "Qu'avez-vous envie de faire ?",
        generate: "✨ Générer des plans",
        resultsTitle: "Plans pour vous",
        another: "🔄 Chercher d'autres plans"
    },

    de: {
        language: "🌐 DE ▾",
        home: "Startseite",
        search: "Pläne suchen",
        favorites: "❤️ Favoriten",
        welcomeTitle: "PlanNow",
        welcomeQuestion: "Was möchtest du machen?",
        welcomeSubtitle: "Finde Pläne in deiner Nähe passend zu deinen Vorlieben.",
        start: "Starten",
        questionsTitle: "Was suchst du?",
        cityTitle: "Wo möchtest du suchen?",
        peopleTitle: "Wie viele Personen seid ihr?",
        moneyTitle: "Wie viel möchtet ihr ausgeben?",
        moodTitle: "Was möchtet ihr machen?",
        generate: "✨ Pläne erstellen",
        resultsTitle: "Pläne für dich",
        another: "🔄 Andere Pläne suchen"
    },

    it: {
        language: "🌐 IT ▾",
        home: "Home",
        search: "Cerca piani",
        favorites: "❤️ Preferiti",
        welcomeTitle: "PlanNow",
        welcomeQuestion: "Cosa ti va di fare?",
        welcomeSubtitle: "Trova attività vicino a te in base ai tuoi gusti.",
        start: "Inizia",
        questionsTitle: "Dicci cosa stai cercando",
        cityTitle: "Dove vuoi cercare?",
        peopleTitle: "Quante persone siete?",
        moneyTitle: "Quanto volete spendere?",
        moodTitle: "Cosa vi va di fare?",
        generate: "✨ Genera piani",
        resultsTitle: "Piani per te",
        another: "🔄 Cerca altri piani"
    },

    pt: {
        language: "🌐 PT ▾",
        home: "Início",
        search: "Procurar planos",
        favorites: "❤️ Favoritos",
        welcomeTitle: "PlanNow",
        welcomeQuestion: "O que queres fazer?",
        welcomeSubtitle: "Encontra planos perto de ti de acordo com os teus gostos.",
        start: "Começar",
        questionsTitle: "Diz-nos o que procuras",
        cityTitle: "Onde queres pesquisar?",
        peopleTitle: "Quantas pessoas são?",
        moneyTitle: "Quanto querem gastar?",
        moodTitle: "O que querem fazer?",
        generate: "✨ Gerar planos",
        resultsTitle: "Planos para ti",
        another: "🔄 Procurar outros planos"
    }
};

let currentLanguage = localStorage.getItem("planNowLanguage") || "es";

function applyLanguage() {
    const lang = translations[currentLanguage];

    document.getElementById("languageButton").textContent = lang.language;

    document.getElementById("navHome").textContent = lang.home;
    document.getElementById("navSearch").textContent = lang.search;
    document.getElementById("navFavorites").textContent = lang.favorites;

    document.getElementById("welcomeTitle").textContent = lang.welcomeTitle;
    document.getElementById("welcomeQuestion").textContent = lang.welcomeQuestion;
    document.getElementById("welcomeSubtitle").textContent = lang.welcomeSubtitle;
    document.getElementById("startButton").textContent = lang.start;

    document.getElementById("questionsTitle").textContent = lang.questionsTitle;
    document.getElementById("cityTitle").textContent = lang.cityTitle;
    document.getElementById("peopleTitle").textContent = lang.peopleTitle;
    document.getElementById("moneyTitle").textContent = lang.moneyTitle;
    document.getElementById("moodTitle").textContent = lang.moodTitle;
    document.getElementById("generateButton").textContent = lang.generate;

    document.getElementById("resultsTitle").textContent = lang.resultsTitle;
    document.getElementById("anotherButton").textContent = lang.another;
}

document.querySelectorAll("[data-language]").forEach(function (button) {
    button.addEventListener("click", function () {
        currentLanguage = button.dataset.language;

        localStorage.setItem("planNowLanguage", currentLanguage);

        applyLanguage();
    });
});

applyLanguage();
const accountButton = document.getElementById("accountButton");
const accountScreen = document.getElementById("accountScreen");

accountButton.addEventListener("click", function () {
    document.querySelectorAll(".screen").forEach(function (screen) {
        screen.style.display = "none";
    });

    accountScreen.style.display = "flex";
});
const backFromAccountButton = document.getElementById("backFromAccountButton");

const registerButton = document.getElementById("registerButton");
const registerScreen = document.getElementById("registerScreen");


registerButton.addEventListener("click", function () {
    accountScreen.style.display = "none";
    registerScreen.style.display = "flex";
});
const createAccountButton = document.getElementById("createAccountButton");

createAccountButton.addEventListener("click", function () {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const password2 = document.getElementById("registerPassword2").value;

    if (name === "") {
        alert("Escribe tu nombre.");
        return;
    }

    if (email === "") {
        alert("Escribe tu correo electrónico.");
        return;
    }

    if (!email.includes("@")) {
        alert("Escribe un correo electrónico válido.");
        return;
    }

    if (password === "") {
        alert("Escribe una contraseña.");
        return;
    }

    if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    alert("✅ Formulario correcto. ¡Cuenta preparada!");
});