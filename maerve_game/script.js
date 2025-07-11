document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("gameContainer");
  const scoreDisplay = document.getElementById("score");
  const message = document.getElementById("message");
  const width = 10;
  const cells = [];
  let merveIndex = 22;
  let score = 0;
  let totalPellets = 0;
  let currentLevel = 0;

  const layouts = [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 2, 0, 1, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 0, 1, 1, 0, 1,
      1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
      1, 0, 1, 1, 1, 1, 0, 1, 0, 1,
      1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
      1, 0, 1, 1, 0, 1, 1, 1, 0, 1,
      1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
      1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 2, 0, 1, 0, 3, 0, 0, 1,
      1, 0, 0, 0, 1, 0, 1, 1, 0, 1,
      1, 0, 1, 4, 0, 0, 0, 1, 0, 1,
      1, 0, 1, 1, 1, 1, 0, 1, 0, 1,
      1, 0, 2, 0, 0, 1, 0, 0, 0, 1,
      1, 0, 1, 1, 0, 1, 1, 1, 0, 1,
      1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
      1, 0, 0, 0, 1, 0, 2, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
  ];

  let layout = layouts[currentLevel];

  function createGrid() {
    container.innerHTML = "";
    cells.length = 0;
    totalPellets = 0;

    for (let i = 0; i < layout.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (layout[i] === 1) {
        cell.classList.add("wall");
      } else if (layout[i] === 2) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        cell.appendChild(dot);
        totalPellets++;
      } else if (layout[i] === 3) {
        const pellet = document.createElement("div");
        pellet.classList.add("power-pellet");
        cell.appendChild(pellet);
        totalPellets++;
      }

      container.appendChild(cell);
      cells.push(cell);
    }
  }

  function drawmerve() {
    cells.forEach(cell => cell.classList.remove("merve"));
    cells[merveIndex].classList.add("merve");

    const dot = cells[merveIndex].querySelector(".dot");
    if (dot) {
      dot.remove();
      score += 10;
      totalPellets--;
      scoreDisplay.textContent = score;
    }

    const pellet = cells[merveIndex].querySelector(".power-pellet");
    if (pellet) {
      pellet.remove();
      score += 50;
      totalPellets--;
      scoreDisplay.textContent = score;
    }

    if (totalPellets === 0) {
      finishLevel();
    }
  }

  function movemerve(e) {
    let newIndex = merveIndex;

    if (e.key === "ArrowLeft" && merveIndex % width !== 0) {
      newIndex -= 1;
    } else if (e.key === "ArrowRight" && merveIndex % width < width - 1) {
      newIndex += 1;
    } else if (e.key === "ArrowUp" && merveIndex - width >= 0) {
      newIndex -= width;
    } else if (e.key === "ArrowDown" && merveIndex + width < layout.length) {
      newIndex += width;
    }

    if (layout[newIndex] !== 1) {
      merveIndex = newIndex;
      drawmerve();
    }
  }

  // Yeni: Level bitişi için fonksiyon
  function finishLevel() {
    message.textContent = "🎉 Tebrikler! Seviye tamamlandı.";
    // Hareketi durdurmak için keydown'u kaldır
    document.removeEventListener("keydown", movemerve);

    // Sonraki seviye butonu oluştur
    const nextLevelBtn = document.createElement("button");
    nextLevelBtn.textContent = "Sonraki Seviye";
    nextLevelBtn.style.marginTop = "20px";
    nextLevelBtn.style.fontSize = "18px";
    nextLevelBtn.id = "nextLevelBtn";

    container.appendChild(nextLevelBtn);

    nextLevelBtn.addEventListener("click", () => {
      // Butonu kaldır
      nextLevelBtn.remove();
      message.textContent = "";
      currentLevel++;

      if (currentLevel >= layouts.length) {
        message.textContent = "🎉 Tüm seviyeler tamamlandı! Oyunu bitirdiniz.";
        return;
      }

      layout = layouts[currentLevel];
      merveIndex = 22; // Başlangıç noktası
      createGrid();
      drawmerve();

      // Kontrolleri yeniden ekle
      document.addEventListener("keydown", movemerve);
    });
  }

  // Başlangıç
  createGrid();
  drawmerve();
  document.addEventListener("keydown", movemerve);
});
