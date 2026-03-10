const display = document.getElementById("display");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const inputGroup = document.getElementById("input-group");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function onTick(totalSec) {
  display.textContent = formatTime(totalSec);
  document.title = `${formatTime(totalSec)} — Countdown`;
}

function onComplete() {
  display.classList.add("expired");
  document.title = "Time's up!";
  startBtn.disabled = true;
  pauseBtn.disabled = true;
}

const timer = new Timer(onTick, onComplete);

startBtn.addEventListener("click", () => {
  if (timer.isRunning) return;

  if (timer.remainingMs > 0) {
    // Resume from pause
    timer.resume();
  } else {
    // Fresh start
    const mins = parseInt(minutesInput.value, 10) || 0;
    const secs = parseInt(secondsInput.value, 10) || 0;
    const total = mins * 60 + secs;
    if (total <= 0) return;
    timer.start(total);
    onTick(total);
  }

  inputGroup.classList.add("hidden");
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
});

pauseBtn.addEventListener("click", () => {
  timer.pause();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  timer.reset();
  display.textContent = "00:00";
  display.classList.remove("expired");
  document.title = "Countdown Timer";
  inputGroup.classList.remove("hidden");
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
});
