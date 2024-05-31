class SpeechRecognitionService {
  constructor() {
    const recognitionSvc =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new recognitionSvc();
  }

  initRecognition(isRecording, userInput) {
    this.recognition.continuous = true;
    this.recognition.onstart = () => {
      isRecording.value = true;
    };
    this.recognition.onend = () => {
      isRecording.value = false;
    };
    this.recognition.onresult = (event) => {
      for (const result of event.results) {
        userInput.value = result[0].transcript;
      }
    };
  }

  toggleMic(isRecording) {
    if (isRecording.value) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }
}

export default SpeechRecognitionService;
