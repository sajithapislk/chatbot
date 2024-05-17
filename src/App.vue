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

    userInput.value = ''; // Clear input after sending message
  }
};

const findIntent = (userMessage) => {
  const allIntents = [...intentsData1.intents, ...intentsData2.intents];
  return allIntents.find((intent) =>
    intent.patterns.some((pattern) => pattern.toLowerCase() === userMessage.toLowerCase())
  );
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