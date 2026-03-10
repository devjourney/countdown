# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla JavaScript countdown timer web app. No build tools, bundlers, or package manager — just static HTML/CSS/JS served directly.

## Development

Open `index.html` in a browser, or serve locally:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

No build step, no install step, no tests.

## Architecture

- **timer.js** — `Timer` class: core countdown logic using `requestAnimationFrame` and wall-clock time (`Date.now()`). Exposes `start(totalSeconds)`, `pause()`, `resume()`, `reset()`, and calls `onTick(totalSec)` / `onComplete()` callbacks.
- **app.js** — DOM wiring: reads user input, formats display, manages button states. Creates a single `Timer` instance.
- **style.css** — Dark theme styling with a pulsing red animation on expiry.
- **index.html** — Entry point, loads style.css then timer.js before app.js (order matters: `Timer` class must be defined before app.js runs).

Script load order is important: `timer.js` defines the `Timer` class as a global, and `app.js` depends on it.
