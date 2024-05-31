import BotService from '../src/services/BotService';

describe('BotService', () => {
  let botService;

  beforeEach(() => {
    botService = new BotService();
  });

  it('returns one of the possible responses for an exact match', () => {

    const expectedResponses = [
      "Hi there, how can I help?",
      "Hello!",
      "Good to see you again!"
    ];

    const response = botService.getResponse('Hello');
    expect(expectedResponses).toContain(response[0]);
  });

  it('returns a default response for an unknown input', () => {
    const response = botService.getResponse('this is unknown input.');
    expect(response).toEqual(["I'm sorry, I couldn't understand."]);
  });

  it('returns one of the possible responses for a fuzzy match', () => {
    const expectedResponses = [
      ["Showing results for: Hello", "Hi there, how can I help?"],
      ["Showing results for: Hello", "Hello!"],
      ["Showing results for: Hello", "Good to see you again!"]
    ];

    const response = botService.getResponse('helloo');
    expect(expectedResponses).toContainEqual(response);
  });
  
  it('extracts name correctly and stores it', () => {
    const response = botService.getResponse('My name is John');
    const name = localStorage.getItem('name');
    expect(name).toBe('John');
    expect(response).toEqual([expect.stringContaining('John')]);
  });

  it('replaces {name} in response with stored name', () => {
    localStorage.setItem('name', 'John');
    const response = botService.getResponse('What is my name?');
    expect(response).toEqual([expect.stringContaining('John')]);
  });
});
