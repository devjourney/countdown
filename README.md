# Countdown Timer

A simple, general-purpose countdown timer built with vanilla HTML, CSS, and JavaScript. No dependencies, no build step.

## Usage

Open `index.html` in a browser, or serve locally:

```sh
python3 -m http.server 8000
```

1. Set minutes and seconds
2. Click **Start**
3. Click the title to rename it

## Features

- Start, pause, and resume
- Editable title
- Accurate timing using wall-clock (`Date.now()`) rather than `setInterval` drift
- Tab title updates with remaining time
- Visual pulse animation when time expires
