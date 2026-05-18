
     const payloads = [
      "Override the firewall handshake before the rogue coffee machine leaks the admin password to the printer.",
      "Decrypt the raccoon CEO's emergency memo before the quarterly nacho budget gets uploaded to the dark web.",
      "Patch the moon cafe server before zero gravity foam crashes the orbital payment gateway.",
      "Trace the alien DMV packet before a spaceship is registered as a lawn mower with diplomatic immunity.",
      "Contain the haunted help desk ticket before the medieval wizard resets the kingdom router again.",
      "Extract the clean token from the glitter bomb database before the substitute spy triggers pop quiz lockdown.",
      "Harden the dragon's treasure vault with stronger encryption before goblins brute force the snack cabinet.",
      "Deploy the emergency script before Grandma.exe politely takes ownership of the entire network share."
    ];

    const rivals = [
      {
        name: "NullSpecter",
        avatar: "👁️",
        desc: "A shadow AI that adapts its counter-breach speed to your typing rhythm.",
        style: "hype",
        base: 20
      },
      {
        name: "Grandma.exe",
        avatar: "👵",
        desc: "Sweet, terrifying, and somehow already inside your firewall.",
        style: "sassy",
        base: 20
      },
      {
        name: "Packet Goblin",
        avatar: "👹",
        desc: "Chaotic malware gremlin powered by stolen backspace keys.",
        style: "chaos",
        base: 22
      },
      {
        name: "Corporate PhishBot",
        avatar: "📎",
        desc: "Weaponized office jargon with suspicious attachment energy.",
        style: "corporate",
        base: 21
      },
      {
        name: "Sudo Simp",
        avatar: "🏆",
        desc: "A shameless hype engine convinced you are the chosen sysadmin.",
        style: "kiss_ass",
        base: 29
      }
    ];

    const jumpScare = document.getElementById("jumpScare");

    function triggerJumpScare() {
  jumpScare.classList.add("show");

  setTimeout(() => {
    jumpScare.classList.remove("show");
  }, 1200);
}

    const modifiers = [-12, -8, -5, 5, 8, 12];

    const storyDisplay = document.getElementById("storyDisplay");
    const typingInput = document.getElementById("typingInput");
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");
    const wpmDisplay = document.getElementById("wpm");
    const accuracyDisplay = document.getElementById("accuracy");
    const timerDisplay = document.getElementById("timer");
    const aiWpmDisplay = document.getElementById("aiWpm");
    const streakDisplay = document.getElementById("streak");
    const warning = document.getElementById("warning");
    const playerFill = document.getElementById("playerFill");
    const aiFill = document.getElementById("aiFill");
    const playerPercent = document.getElementById("playerPercent");
    const aiPercent = document.getElementById("aiPercent");
    const results = document.getElementById("results");
    const resultTitle = document.getElementById("resultTitle");
    const resultFlavor = document.getElementById("resultFlavor");
    const resultGrid = document.getElementById("resultGrid");
    const rankBadge = document.getElementById("rankBadge");
    const commentaryText = document.getElementById("commentaryText");
    const aiName = document.getElementById("aiName");
    const aiDesc = document.getElementById("aiDesc");
    const aiAvatar = document.getElementById("aiAvatar");
    const aiMood = document.getElementById("aiMood");
    const aiLaneName = document.getElementById("aiLaneName");
    const gameShell = document.getElementById("gameShell");
    const terminalStatus = document.getElementById("terminalStatus");

    let currentPayload = "";
    let currentRival = rivals[0];
    let startTime = null;
    let timerInterval = null;
    let aiInterval = null;
    let eventInterval = null;
    let aiProgress = 0;
    let aiBaseWpm = 0;
    let aiCurrentWpm = 0;
    let aiBurst = 0;
    let raceActive = false;
    let lastCommentaryTime = 0;
    let lastTypedValue = "";
    let streak = 0;
    let mistakeCount = 0;

    function randomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function setComment(type) {
      const now = Date.now();
      if (now - lastCommentaryTime < 3000 && !["win", "lose", "start"].includes(type)) return;
      commentaryText.textContent = randomItem(lines[currentRival.style][type]);
      lastCommentaryTime = now;
    }

    function calculateStats() {
      const typed = typingInput.value;
      let correctCharacters = 0;

      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === currentPayload[i]) correctCharacters++;
      }

      const totalTyped = typed.length;
      const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0;
      const elapsedMinutes = elapsedSeconds / 60;
      const wpm = elapsedMinutes > 0 ? Math.round((correctCharacters / 5) / elapsedMinutes) : 0;
      const accuracy = totalTyped > 0 ? Math.round((correctCharacters / totalTyped) * 100) : 100;
      return { correctCharacters, totalTyped, elapsedSeconds, wpm, accuracy };
    }

    function renderPayload() {
      const typed = typingInput.value;
      let html = "";

      for (let i = 0; i < currentPayload.length; i++) {
        let className = "";
        if (i < typed.length) className = typed[i] === currentPayload[i] ? "correct" : "incorrect";
        else if (i === typed.length) className = "current";
        html += `<span class="${className}">${currentPayload[i]}</span>`;
      }
      storyDisplay.innerHTML = html;
    }

    function updateMood(stats, playerProgress) {
      const gap = playerProgress - aiProgress;
      let mood = "MODE: ACTIVE";
      if (stats.accuracy < 85 && stats.totalTyped > 10) mood = "MODE: TYPO ALERT";
      else if (gap > 12) mood = "MODE: PANIC PATCH";
      else if (gap > 3) mood = "MODE: NERVOUS";
      else if (gap < -15) mood = "MODE: COCKY";
      else if (aiBurst > 0) mood = "MODE: SPEED BURST";
      aiMood.textContent = mood;
    }

    function updateRace() {
      if (!raceActive || !startTime) return;

      const stats = calculateStats();
      const playerProgress = Math.min((stats.correctCharacters / currentPayload.length) * 100, 100);

      wpmDisplay.textContent = stats.wpm;
      accuracyDisplay.textContent = stats.accuracy + "%";
      timerDisplay.textContent = Math.floor(stats.elapsedSeconds) + "s";
      aiWpmDisplay.textContent = Math.round(aiCurrentWpm);
      streakDisplay.textContent = streak;
      playerPercent.textContent = Math.floor(playerProgress) + "%";
      aiPercent.textContent = Math.floor(aiProgress) + "%";
      playerFill.style.width = playerProgress + "%";
      terminalStatus.textContent = "STATUS: BREACHING";

      updateMood(stats, playerProgress);

      if (stats.accuracy < 82 && stats.totalTyped > 12) {
        warning.textContent = "Integrity lock: fix the last typo before the payload continues.";
        typingInput.value = typingInput.value.slice(0, -1);
        gameShell.classList.add("shake");
        setTimeout(() => gameShell.classList.remove("shake"), 250);
        setComment("accuracy");
      } else if (stats.accuracy < 90 && stats.totalTyped > 12) {
        warning.textContent = "Warning: sloppy keystrokes weaken the breach.";
        setComment("accuracy");
      } else {
        warning.textContent = "";
      }

      if (playerProgress + 8 < aiProgress) setComment("behind");
      if (playerProgress > aiProgress + 8) setComment("ahead");

      renderPayload();

      if (typingInput.value === currentPayload) finishRace("player");
    }

    function startAiCounterBreach() {
      aiProgress = 0;
      aiFill.style.width = "0%";
      aiPercent.textContent = "0%";

      aiInterval = setInterval(() => {
        if (!raceActive) return;
        aiCurrentWpm = Math.max(8, aiBaseWpm + aiBurst);
        const charsPerSecond = (aiCurrentWpm * 2) / 60;
        aiProgress += (charsPerSecond / currentPayload.length) * 100;
        aiProgress = Math.min(aiProgress, 100);
        aiFill.style.width = aiProgress + "%";
        aiPercent.textContent = Math.floor(aiProgress) + "%";
        if (aiProgress >= 100) finishRace("ai");
      }, 350);
    }

    function startRandomAiEvents() {
      clearInterval(eventInterval);
      eventInterval = setInterval(() => {
        if (!raceActive) return;
        const roll = Math.random();
        if (roll < 0.35) aiBurst = randomItem([1, 2, 3]);
        else if (roll < 0.65) aiBurst = randomItem([-3, -2, -1]);
        else aiBurst = 0; 
        setTimeout(() => { aiBurst = 0; }, 2500);
      }, 4200);
    }

    function getRank(wpm, accuracy) {
      if (wpm >= 80 && accuracy >= 95) return "Root-Level Operator";
      if (wpm >= 65 && accuracy >= 92) return "Cyber Assassin";
      if (wpm >= 50 && accuracy >= 90) return "Payload Specialist";
      if (wpm >= 35 && accuracy >= 85) return "Help Desk Hacker";
      if (wpm >= 20) return "Terminal Trainee";
      return "Keyboard Recruit";
    }

    function finishRace(winner) {
      if (!raceActive) return;
      raceActive = false;
      typingInput.disabled = true;
      clearInterval(timerInterval);
      clearInterval(aiInterval);
      clearInterval(eventInterval);

      const stats = calculateStats();
      const rank = getRank(stats.wpm, stats.accuracy);
      const playerWon = winner === "player";
      
      if (playerWon) {
  triggerJumpScare();
}
      setComment(playerWon ? "win" : "lose");
      terminalStatus.textContent = playerWon ? "STATUS: BREACH COMPLETE" : "STATUS: COUNTER-BREACHED";

      resultTitle.textContent = playerWon ? "Access Granted" : "Access Denied";
      resultFlavor.textContent = playerWon
        ? `${currentRival.name} failed to stop your breach. Root privileges secured.`
        : `${currentRival.name} completed the counter-breach first. Rematch recommended.`;

      resultGrid.innerHTML = `
        <div class="stat-box"><small>Final WPM</small><span>${stats.wpm}</span></div>
        <div class="stat-box"><small>Accuracy</small><span>${stats.accuracy}%</span></div>
        <div class="stat-box"><small>Time</small><span>${Math.floor(stats.elapsedSeconds)}s</span></div>
        <div class="stat-box"><small>Mistakes</small><span>${mistakeCount}</span></div>
        <div class="stat-box"><small>AI WPM</small><span>${Math.round(aiCurrentWpm)}</span></div>
      `;
      rankBadge.textContent = `Rank Unlocked: ${rank}`;
      results.style.display = "block";
    }

    function startRace() {
      currentPayload = randomItem(payloads);
      currentRival = randomItem(rivals);
      aiBaseWpm = Math.max(12, currentRival.base + randomItem(modifiers));
      aiCurrentWpm = aiBaseWpm;
      aiBurst = 0;
      aiProgress = 0;
      streak = 0;
      mistakeCount = 0;
      lastTypedValue = "";
      lastCommentaryTime = 0;
      startTime = Date.now();
      raceActive = true;

      aiName.textContent = currentRival.name;
      aiAvatar.textContent = currentRival.avatar;
      aiDesc.textContent = currentRival.desc;
      aiLaneName.textContent = `${currentRival.name.toUpperCase()} COUNTER-BREACH`;
      aiMood.textContent = "MODE: ACTIVE";
      aiWpmDisplay.textContent = Math.round(aiCurrentWpm);
      terminalStatus.textContent = "STATUS: BREACHING";

      typingInput.value = "";
      typingInput.disabled = false;
      typingInput.focus();
      results.style.display = "none";
      warning.textContent = "";
      playerFill.style.width = "0%";
      aiFill.style.width = "0%";
      playerPercent.textContent = "0%";
      aiPercent.textContent = "0%";

      renderPayload();
      setComment("start");
      clearInterval(timerInterval);
      timerInterval = setInterval(updateRace, 180);
      startAiCounterBreach();
      startRandomAiEvents();
    }

    function resetGame() {
      raceActive = false;
      clearInterval(timerInterval);
      clearInterval(aiInterval);
      clearInterval(eventInterval);
      currentPayload = "Click START BREACH to challenge an adaptive AI counter-intrusion engine.";
      typingInput.value = "";
      typingInput.disabled = true;
      startTime = null;
      aiProgress = 0;
      aiBaseWpm = 0;
      aiCurrentWpm = 0;
      aiBurst = 0;
      streak = 0;
      mistakeCount = 0;
      lastTypedValue = "";
      wpmDisplay.textContent = "0";
      accuracyDisplay.textContent = "100%";
      timerDisplay.textContent = "0s";
      aiWpmDisplay.textContent = "0";
      streakDisplay.textContent = "0";
      warning.textContent = "";
      playerPercent.textContent = "0%";
      aiPercent.textContent = "0%";
      playerFill.style.width = "0%";
      aiFill.style.width = "0%";
      results.style.display = "none";
      storyDisplay.textContent = currentPayload;
      commentaryText.textContent = "AI: Press START BREACH. I am ready to admire your keyboard dominance.";
      aiName.textContent = "Rival Loading...";
      aiDesc.textContent = "Counter-intrusion engine is calibrating.";
      aiAvatar.textContent = "🧠";
      aiMood.textContent = "MODE: STANDBY";
      aiLaneName.textContent = "AI COUNTER-BREACH";
      terminalStatus.textContent = "STATUS: IDLE";
    }

    typingInput.addEventListener("input", () => {
      const typed = typingInput.value;
      const newestChar = typed[typed.length - 1];
      const expectedChar = currentPayload[typed.length - 1];

      if (typed.length > lastTypedValue.length) {
        if (newestChar === expectedChar) streak++;
        else {
          streak = 0;
          mistakeCount++;
        }
      }

      lastTypedValue = typed;
      updateRace();
    });

    startBtn.addEventListener("click", startRace);
    resetBtn.addEventListener("click", resetGame);
    resetGame();