<script setup>
import { ref } from 'vue';
import intentsData from './datasets/intents.json';

const userInput = ref('');
const messages = ref([]);

function handleSubmit() {
  const userMessage = {
    id: messages.value.length,
    sender: 'User',
    content: userInput.value
  };
  messages.value.push(userMessage);
  generateResponse(userInput.value);
  userInput.value = '';
}

function generateResponse(input) {
  let bestMatch = null;
  let maxScore = 0;  // Keep track of the highest score found.

  // Convert user input to lower case and split into words
  const inputWords = input.toLowerCase().split(/\s+/);

  for (const intent of intentsData.intents) {
    let score = 0;
    for (const pattern of intent.patterns) {
      const words = pattern.toLowerCase().split(/\s+/);
      // Increment score for each word in the pattern that matches any word in the input
      words.forEach(word => {
        if (inputWords.includes(word)) {
          score++;
        }
      });
    }
    // Update bestMatch if this intent's score is higher than the current maxScore
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch) {
    const botMessage = {
      id: messages.value.length,
      sender: 'Bot',
      content: bestMatch.responses[0]  // Assuming one response per intent
    };
    messages.value.push(botMessage);
  } else {
    messages.value.push({
      id: messages.value.length,
      sender: 'Bot',
      content: "Sorry, I'm not sure how to respond to that."
    });
  }
  console.log(messages.value[messages.value.length - 1]);
}
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
        <div class="mb-2 text-right" v-if="row.sender == 'User'">
          <p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{{row.content}}</p>
        </div>
        <div class="mb-2" v-else>
          <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{{row.content}}
          </p>
        </div>
       </template>
      </div>
      <div class="p-4 border-t flex">
        <input v-model="userInput" @keyup.enter="handleSubmit" type="text" placeholder="Type a message"
          class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button @click="handleSubmit"
          class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
      </div>
    </div>
  </div>
</template>