let currentPuzzle = []; // Arreglo que almacenará el estado actual del rompecabezas
let emptyTile = 8; // Índice de la pieza vacía (número 8)

// Arreglo de rompecabezas predefinidos
const puzzles = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8], // Rompecabezas 1 en orden resuelto
    [1, 2, 3, 4, 0, 5, 6, 7, 8], // Rompecabezas 2 desordenado
    [1, 2, 0, 3, 4, 5, 6, 7, 8]  // Rompecabezas 3 desordenado
];

// URLs de las imágenes que se usarán como fondo de los rompecabezas
const images = [
    'https://lumiere-a.akamaihd.net/v1/images/eu_ts4_trailer-stories_hero_m_ff30b1d6.jpeg?region=0,0,750,663', // Imagen 1
    'https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2021/11/26/disney-vaiana-maui.jpeg',   // Imagen 2
    'https://larepublica.cronosmedia.glr.pe/original/2024/06/17/667080fc52e2b76c3d236517.jpg'                // Imagen 3
];

let currentImage = ''; // URL de la imagen actual usada en el rompecabezas

// Función para seleccionar un rompecabezas basado en su número
function selectPuzzle(puzzleNumber) {
    currentPuzzle = [...puzzles[puzzleNumber - 1]]; // Se copia el rompecabezas seleccionado
    emptyTile = currentPuzzle.indexOf(8); // Se encuentra la posición de la pieza vacía (8)
    currentImage = images[puzzleNumber - 1]; // Se asigna la imagen correspondiente al rompecabezas
    renderPuzzle(); // Llama a la función para dibujar el rompecabezas en la página
}

// Función para renderizar (dibujar) el rompecabezas en el contenedor
function renderPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container'); // Selecciona el contenedor HTML del rompecabezas
    puzzleContainer.innerHTML = ''; // Limpia el contenido actual del contenedor

    // Itera sobre las 9 piezas del rompecabezas
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div'); // Crea un nuevo elemento <div> para la pieza
        piece.className = 'puzzle-piece'; // Asigna la clase 'puzzle-piece' para aplicar estilos

        if (currentPuzzle[i] !== 8) { // Si la pieza no es la vacía (8)
            const x = (currentPuzzle[i] % 3) * -100; // Calcula la posición x de la imagen de fondo
            const y = Math.floor(currentPuzzle[i] / 3) * -100; // Calcula la posición y de la imagen de fondo
            piece.style.backgroundImage = `url(${currentImage})`; // Asigna la imagen de fondo
            piece.style.backgroundPosition = `${x}px ${y}px`; // Ajusta la posición de la imagen
        } else {
            piece.style.backgroundColor = '#333'; // Si es la pieza vacía, se le da un color de fondo sólido
        }

        piece.addEventListener('click', () => movePiece(i)); // Añade un evento para mover la pieza al hacer clic
        puzzleContainer.appendChild(piece); // Añade la pieza al contenedor
    }
}

// Función para mover una pieza si está adyacente a la pieza vacía
function movePiece(index) {
    if (isAdjacent(index, emptyTile)) { // Verifica si la pieza seleccionada está adyacente a la vacía
        [currentPuzzle[index], currentPuzzle[emptyTile]] = [currentPuzzle[emptyTile], currentPuzzle[index]]; // Intercambia las posiciones de la pieza y la vacía
        emptyTile = index; // Actualiza la posición de la pieza vacía
        renderPuzzle(); // Redibuja el rompecabezas con el nuevo estado

        if (checkWin()) { // Si el rompecabezas está en orden correcto
            setTimeout(() => {
                showWinMessage(); // Muestra el mensaje de victoria tras una pequeña pausa
            }, 300);
        }
    }
}

// Función que verifica si dos índices son adyacentes en la cuadrícula
function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 3); // Calcula la fila de la primera pieza
    const col1 = index1 % 3; // Calcula la columna de la primera pieza
    const row2 = Math.floor(index2 / 3); // Calcula la fila de la segunda pieza
    const col2 = index2 % 3; // Calcula la columna de la segunda pieza

    // Verifica si las piezas están adyacentes sumando la diferencia de filas y columnas
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

// Función que verifica si el jugador ha ganado el juego
function checkWin() {
    return currentPuzzle.every((value, index) => value === index); // Verifica si todas las piezas están en orden correcto
}

// Función que muestra un mensaje cuando el jugador resuelve el rompecabezas
function showWinMessage() {
    const winMessage = document.createElement('div'); // Crea un nuevo <div> para el mensaje de victoria
    winMessage.className = 'win-message'; // Asigna la clase 'win-message' para aplicar estilos
    winMessage.innerHTML = `
        <h2>¡Felicidades! <span>Has resuelto</span> el <span>rompecabezas</span>.</h2>
        <img src="https://resizer.iproimg.com/unsafe/1200x674/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/09/503544_landscape.jpg" alt="Celebración">
        <button id="play-again-btn">Jugar de nuevo</button>
    `; // HTML para el mensaje de victoria y el botón de "Jugar de nuevo"
    document.body.appendChild(winMessage); // Añade el mensaje al cuerpo de la página

    setTimeout(() => {
        winMessage.style.opacity = '1'; // Aplica una transición para mostrar el mensaje con efecto
    }, 100);

    const playAgainBtn = document.getElementById('play-again-btn'); // Selecciona el botón de "Jugar de nuevo"
    playAgainBtn.addEventListener('click', resetGame); // Añade un evento al botón para reiniciar el juego
}

// Función que reinicia el juego recargando la página
function resetGame() {
    location.reload(); // Recarga la página para empezar de nuevo
}

// Evento que se ejecuta cuando la página carga, inicializando el primer rompecabezas
document.addEventListener('DOMContentLoaded', () => {
    selectPuzzle(1); // Selecciona el primer rompecabezas al cargar la página
    // Añadir un evento para el botón de "Encuesta"
document.getElementById('survey-btn').addEventListener('click', () => {
    window.location.href = 'formulario.html'; // Redirige a la página de encuesta
});

// Código restante...

});
