<script setup>
import { reactive, ref } from 'vue';
import intentsData1 from './datasets/intents.json';
import intentsData2 from './datasets/intents1.json';

const userInput = ref('');
const messages = reactive([]);

const sendMessage = () => {
  const userMessage = userInput.value.trim();

  if (userMessage !== '') {
    messages.push({ id: messages.length, text: `User: ${userMessage}`, sender: 'user' });

    const intent = findIntent(userMessage);
    if (intent) {
    const resLen = intent.responses.length;
    const randomIndex = Math.floor(Math.random() * resLen);
      const response = intent.responses[randomIndex];
      messages.push({ id: messages.length, text: `Bot: ${response}`, sender: 'bot' });
    } else {
      messages.push({ id: messages.length, text: `Bot: I'm sorry, I couldn't understand.`, sender: 'bot' });
    }

    userInput.value = '';
  }
};

function levenshteinDistance(s, t) {
  var d = [];
  var m = s.length;
  var n = t.length;

  for (var i = 0; i <= m; i++) {
    d[i] = [];
    d[i][0] = i;
  }
  for (var j = 0; j <= n; j++) {
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
console.log(s);
console.log(t);
console.log(d[m][n]);
  return d[m][n];
}

const findIntent = (userMessage) => {
  const allIntents = [...intentsData1.intents, ...intentsData2.intents];
  const exactMatch = allIntents.find((intent) =>
    intent.patterns.some((pattern) => pattern.toLowerCase() === userMessage.toLowerCase())
  );
  if (exactMatch) {
    return exactMatch;
  } else {
    // use fuzzy logic
    let closestIntent = null;
    let minDistance = Infinity;
    allIntents.forEach((intent) => {
      intent.patterns.forEach((pattern) => {
        const distance = levenshteinDistance(userMessage.toLowerCase(), pattern.toLowerCase());
        if (distance < minDistance) {
          minDistance = distance;
          closestIntent = intent;
        }
      });
    });
    return closestIntent;
  }
};

</script>

<template>
  <div class="fixed bottom-0 right-0 mb-4 mr-4">
    <button id="open-chat"
      class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      Chat with Admin Bot
    </button>
  </div>
  <div id="chat-container" class="fixed bottom-16 right-4 w-96">
    <div class="bg-white shadow-md rounded-lg max-w-lg w-full">
      <div class="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
        <p class="text-lg font-semibold">Admin Bot</p>
        <button id="close-chat" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div id="chatbox" class="p-4 h-80 overflow-y-auto">
        <!-- Chat messages will be displayed here -->
       <template v-for="(row, index) in messages">
        <div class="mb-2 text-right" v-if="row.sender == 'user'">
          <p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{{row.text}}</p>
        </div>
        <div class="mb-2" v-else>
          <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{{row.text}}
          </p>
        </div>
       </template>
      </div>
      <div class="p-4 border-t flex">
        <input v-model="userInput" @keyup.enter="sendMessage" type="text" placeholder="Type a message"
          class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button @click="sendMessage"
          class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
      </div>
    </div>
  </div>
</template>