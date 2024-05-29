<script setup>
import { ref, reactive, onMounted,computed } from 'vue';
import BotService from './services/BotService';

const userInput = ref('');
const messages = reactive([]);

const showTyping = ref(false);
const waitingOnResponse = ref(false);

const mockTypingAfter = 1500;
const mockResponseAfter = 3000;

const botService = new BotService();
const sendMessage = () => {
  if (waitingOnResponse.value) return;
  waitingOnResponse.value = true;

  const userMessage = userInput.value.trim();

  if (userMessage !== '') {
    messages.push(ref({
      id: messages.length,
      text: userMessage,
      sender: 'user',
      beingTyped: false
    }));

    const responseMessages = botService.getResponse(userMessage);
    
    if(checkSameMessage.value){
      responseMessages.push(`<iframe src="https://giphy.com/embed/26uf1EUQzKKGcIhJS" width="480" height="331" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hulu-fox-family-guy-26uf1EUQzKKGcIhJS">via GIPHY</a></p>`);
      responseMessages.push('heyy.. Why are you send me same quaction ??');
    }

    setTimeout(() => {
      showTyping.value = true;
    }, mockTypingAfter);

    responseMessages.map((message, index) =>
      new Promise(resolve => setTimeout(() => {
        typeOutResponse(message);
        resolve();
      }, mockResponseAfter * (index + 1)))

    );
    showTyping.value = false;
    userInput.value = '';
  }
};

const mockResponse = () => {
  setTimeout(() => {
    showTyping.value = true;
  }, mockTypingAfter);

  setTimeout(() => {
    showTyping.value = false;

    const responseMessage = 'Hello there. I am Chatbot.';
    typeOutResponse(responseMessage);
  }, mockResponseAfter);
};

const typeOutResponse = (message) => {
  showTyping.value = false;
  let responseMessage = ref({ id: messages.length, sender: 'bot', text: '', beingTyped: true });
  messages.push(responseMessage);
  let i = 0;
  const interval = setInterval(() => {
    responseMessage.value.text += message.charAt(i);
    i++;
    if (i > message.length - 1) {
      waitingOnResponse.value = false;
      responseMessage.value.beingTyped = false;
      clearInterval(interval);
    }
  }, 30);
};

const checkSameMessage = computed(() => {
  const userMessages = messages.filter(message => message.value.sender === 'user');
  const _message = userInput.value.trim();

  if (userMessages.length > 2) {
    const lastTwoMessages = [userMessages[userMessages.length - 2], userMessages[userMessages.length - 1]];

    if (lastTwoMessages.every(msg => msg.value.text === _message)) {
      return true;
    }
  }
  return false
});

onMounted(() => {
  mockResponse();
});
</script>

<template>
  <div class="w-screen h-screen bg-gray-50 flex flex-col" x-data="chat">

    <div class="bg-gray-800 flex justify-center p-4">
      <span class="text-white text-bold">Chatbot</span>
    </div>

    <div class="w-full max-w-screen-lg flex-1 m-auto p-8 my-4 pb-20">
      <div class="flex flex-col">

        <template v-for="message in messages">
          <div class="message rounded-lg py-2 px-6 mb-4"
            :class="message.value.sender === 'bot' ? 'assistant bg-blue-100 border-blue-100 self-start' : 'user bg-green-200 border-green-200 self-end'">
            <span v-html="message.value.text"></span>
            <template v-if="message.value.beingTyped">
              <span class="w-2.5 bg-gray-600 h-4 inline-block -mb-0.5 align-baseline blink"></span>
            </template>
          </div>
        </template>

        <template v-if="showTyping">
          <div class="message assistant rounded-lg py-2.5 px-6 mb-4 bg-blue-100 border-blue-100 self-start">
            <div class="type-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        </template>

      </div>

    </div>
    <div class="fixed inset-x-0 bottom-0 bg-gray-200">
      <form class="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center"
        @submit.prevent="sendMessage">
        <input id="message" type="text" autocomplete="off" class="border rounded-md p-2 flex-1 border-gray-300"
          v-model="userInput" @keyup.enter="sendMessage" placeholder="Your message..." />
        <button class="bg-gray-800 text-white px-4 py-2 rounded-md"
          :class="{ 'opacity-50': waitingOnResponse }">Send</button>
      </form>
    </div>
  </div>
</template>