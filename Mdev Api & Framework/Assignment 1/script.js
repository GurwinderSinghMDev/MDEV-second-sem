const pokemonList = document.querySelector('.pokemon-list');
const pokemonDetails = document.querySelector('.pokemon-details');
const rightSection = document.querySelector('.right-section');

// fetchPokemonList function to fetch specific Pokemon
async function fetchPokemonList() {
    try {
        const pokemonNames = ['snorlax', 'pikachu', 'blastoise', 'butterfree', 'bulbasaur'];

        for (const name of pokemonNames) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            const listItem = document.createElement('div');
            listItem.classList.add('pokemon-item');
            listItem.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>${data.name}</p>
            `;
            listItem.addEventListener('click', () => fetchPokemonDetails(name));
            pokemonList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
    }
}


// Function to extract Pokemon ID from URL
function getPokemonId(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
}

// Function to fetch and display Pokémon details
async function fetchPokemonDetails(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        // Update the left section with Pokémon details
        const leftSection = document.querySelector('.left-section');
        leftSection.innerHTML = `
            <h2>Specs</h2>
            <p>Name: ${data.name}</p>
            <p>Abilities: ${data.abilities.map(ability => `<span class="ability-link">${ability.ability.name}</span>`).join(', ')}</p>
            <p>Height: ${data.height} decimetres</p>
            <p>Base Experience: ${data.base_experience}</p>
        `;

        // Add event listeners to ability links
        const abilityLinks = leftSection.querySelectorAll('.ability-link');
        abilityLinks.forEach(abilityLink => {
            abilityLink.addEventListener('click', () => fetchAbilityDetails(abilityLink.textContent));
        });
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

// Function to fetch and display ability details
async function fetchAbilityDetails(abilityName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
        const data = await response.json();

        // Update the right section with ability details
        rightSection.innerHTML = `
            <h2>Abilities</h2>
            <p class="ability-name">Ability Name: ${data.name}</p>
            <p class="ability-effect">Ability Effect: ${data.effect_entries.find(entry => entry.language.name === 'en').effect}</p>
            <p class="short-effect">Short Effect: ${data.effect_entries.find(entry => entry.language.name === 'en').short_effect}</p>
            <p class="flavor-text">Flavor Text: ${data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>
        `;
    } catch (error) {
        console.error('Error fetching ability details:', error);
    }
}

// Initialize by fetching the Pokémon list
fetchPokemonList();
