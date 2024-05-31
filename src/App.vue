<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import BotService from "./services/BotService";
import SpeechRecognitionService from "./services/SpeechRecognitionService";

const isRecording = ref(false);

const userInput = ref("");
const messages = reactive([]);

const showTyping = ref(false);
const waitingOnResponse = ref(false);

const mockTypingAfter = 1500;
const mockResponseAfter = 3000;

const botService = new BotService();
const speechRecognitionService = new SpeechRecognitionService();

const sendMessage = () => {
  if (waitingOnResponse.value) return;
  waitingOnResponse.value = true;

  const userMessage = userInput.value.trim();

  if (userMessage == "") {
    waitingOnResponse.value = false;
    return;
  }
  messages.push(
    ref({
      id: messages.length,
      text: userMessage,
      sender: "user",
      beingTyped: false,
    })
  );

  const responseMessages = botService.getResponse(userMessage);

  if (checkSameMessage.value) {
    responseMessages.push(
      `<iframe src="https://giphy.com/embed/26uf1EUQzKKGcIhJS" width="480" height="331" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hulu-fox-family-guy-26uf1EUQzKKGcIhJS">via GIPHY</a></p>`
    );
    responseMessages.push("heyy.. Why are you send me same quaction ??");
  }

  setTimeout(() => {
    showTyping.value = true;
  }, mockTypingAfter);

  responseMessages.map(
    (message, index) =>
      new Promise((resolve) =>
        setTimeout(() => {
          typeOutResponse(message);
          resolve();
        }, mockResponseAfter * (index + 1))
      )
  );
  showTyping.value = false;
  userInput.value = "";
};

const mockResponse = () => {
  setTimeout(() => {
    showTyping.value = true;
  }, mockTypingAfter);

  setTimeout(() => {
    showTyping.value = false;

    const responseMessage = "Hello there. I am Chatbot.";
    typeOutResponse(responseMessage);
  }, mockResponseAfter);
};

const typeOutResponse = (message) => {
  showTyping.value = false;
  let responseMessage = ref({
    id: messages.length,
    sender: "bot",
    text: "",
    beingTyped: true,
  });
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
  const userMessages = messages.filter(
    (message) => message.value.sender === "user"
  );
  const _message = userInput.value.trim();

  if (userMessages.length > 2) {
    const lastTwoMessages = [
      userMessages[userMessages.length - 2],
      userMessages[userMessages.length - 1],
    ];

    if (lastTwoMessages.every((msg) => msg.value.text === _message)) {
      return true;
    }
  }
  return false;
});

onMounted(() => {
  mockResponse();
  speechRecognitionService.initRecognition(isRecording, userInput);
});

const ToggleMic = () => {
  speechRecognitionService.toggleMic(isRecording);
};
</script>

<template>
  <div class="w-screen h-screen bg-gray-50 flex flex-col" x-data="chat">
    <div class="bg-gray-800 flex justify-center p-4">
      <span class="text-white text-bold">Chatbot</span>
    </div>

    <div class="w-full max-w-screen-lg flex-1 m-auto p-8 my-4 pb-20">
      <div class="flex flex-col">
        <template v-for="message in messages">
          <div
            class="message rounded-lg py-2 px-6 mb-4"
            :class="
              message.value.sender === 'bot'
                ? 'assistant bg-blue-100 border-blue-100 self-start'
                : 'user bg-green-200 border-green-200 self-end'
            "
          >
            <span v-html="message.value.text"></span>
            <template v-if="message.value.beingTyped">
              <span
                class="w-2.5 bg-gray-600 h-4 inline-block -mb-0.5 align-baseline blink"
              ></span>
            </template>
          </div>
        </template>

        <template v-if="showTyping">
          <div
            class="message assistant rounded-lg py-2.5 px-6 mb-4 bg-blue-100 border-blue-100 self-start"
          >
            <div class="type-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="fixed inset-x-0 bottom-0 bg-gray-200">
      <form
        class="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center"
        @submit.prevent="sendMessage"
      >
        <input
          id="message"
          type="text"
          autocomplete="off"
          class="border rounded-md p-2 flex-1 border-gray-300"
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Your message..."
        />
        <button
          class="bg-transparent px-4 py-2 rounded-md"
          type="button"
          @click="ToggleMic"
        >
          <svg
            class="w-6 fill-current"
            :class="{
              'text-black': isRecording == false,
              'text-red-600': isRecording,
            }"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            enable-background="new 0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"
                />
                <path
                  d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"
                />
              </g>
            </g>
          </svg>
        </button>
        <button
          class="bg-gray-800 text-white px-4 py-2 rounded-md"
          :class="{ 'opacity-50': waitingOnResponse }"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>
