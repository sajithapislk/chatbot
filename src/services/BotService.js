// BotService.js
import intents1 from './../datasets/intents.json';
import intents2 from './../datasets/intents1.json';

class BotService {
  constructor() {
    this.intents = [...intents1.intents, ...intents2.intents];
    this._bestPattern;
  }

  levenshteinDistance(s, t) {
    const d = [];
    const m = s.length;
    const n = t.length;

    for (let i = 0; i <= m; i++) {
      d[i] = [];
      d[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }

    for (var j = 1; j <= n; j++) {
      for (var i = 1; i <= m; i++) {
        if (s.charAt(i - 1) == t.charAt(j - 1)) {
          d[i][j] = d[i - 1][j - 1];
        } else {
          d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + 1);
        }
      }
    }

    return d[m][n];
  }

  findIntent(userMessage) {
    const exactMatch = this.intents.find((intent) =>
      intent.patterns.some(
        (pattern) => pattern.toLowerCase() === userMessage.toLowerCase()
      )
    );

    if (exactMatch) {
      return exactMatch;
    } else {
      // use fuzzy logic
      let closestIntent = null;
      let minDistance = Infinity;

      this.intents.forEach((intent) => {
        intent.patterns.forEach((pattern) => {
          const distance = this.levenshteinDistance(
            userMessage.toLowerCase(),
            pattern.toLowerCase()
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestIntent = intent;
            this._bestPattern = pattern;
          }
        });
      });
      if (minDistance > 10) {
        closestIntent = null;
      }

      return closestIntent;
    }
  }

  getResponse(userMessage) {
    this._bestPattern = null;
    const intent = this.findIntent(userMessage);
    if (intent) {
      const resLen = intent.responses.length;
      const randomIndex = window.crypto ? window.crypto.getRandomValues(new Uint32Array(1))[0] % resLen : Math.floor(Math.random() * resLen);

      if (intent.tag == 'capture_name') {
        const name = this.extractName(userMessage);
        localStorage.setItem('name', name);
        return [intent.responses[randomIndex].replace("{name}", name)]
      } else if (intent.tag == 'ask_name') {
        const name = localStorage.getItem('name');
        return [intent.responses[randomIndex].replace("{name}", name)]
      }

      return this._bestPattern ? [`Showing results for: ${this._bestPattern}`, `${intent.responses[randomIndex]}`] : [`${intent.responses[randomIndex]}`];
    } else {
      return ["I'm sorry, I couldn't understand."];
    }
  }

  extractName(userMessage) {
    const namePatterns = [
      /my name is (\w+)/i,
      /i am (\w+)/i,
      /you can call me (\w+)/i,
      /it's (\w+)/i
    ];

    for (let pattern of namePatterns) {
      const match = userMessage.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }
}

export default BotService;
