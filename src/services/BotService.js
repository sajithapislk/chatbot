// BotService.js
import intents1 from './../datasets/intents.json';
import intents2 from './../datasets/intents1.json';
class BotService {
    constructor() {
      this.intents = [...intents1.intents, ...intents2.intents];
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
            }
          });
        });
  
        return closestIntent;
      }
    }
  
    getResponse(userMessage) {
      const intent = this.findIntent(userMessage);
      if (intent) {
        const resLen = intent.responses.length;
        const randomIndex = Math.floor(Math.random() * resLen);
        return intent.responses[randomIndex];
      } else {
        return "I'm sorry, I couldn't understand.";
      }
    }
  }
  
  export default BotService;
  