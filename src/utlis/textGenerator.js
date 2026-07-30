import { WORDS } from "../data/words";
import { NUMBERS } from "../data/numbers";
import { SYMBOLS } from "../data/symbols";

export const STORY_SMALL = [
  "The quick brown fox jumps over the lazy dog near the river bank.",
  "Pack my box with five dozen liquor jugs.",
];
export const STORY_MEDIUM = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Life is what happens when you're busy making other plans.",
];
export const STORY_LARGE = [
  "The future belongs to those who believe in the beauty of their dreams. Entrepreneurship is living a few years of your life like most people won't, so that you can spend the rest of your life like most people can't. The only way to do great work is to love what you do. In the middle of difficulty lies opportunity.",
];

export const QUOTES = [
  "I think, therefore I am.",
  "To be, or not to be, that is the question.",
  "That which does not kill us makes us stronger.",
  "The only thing we have to fear is fear itself.",
  "In three words I can sum up everything I've learned about life: it goes on.",
];

export function generateText({
  testType,
  wordCount,
  storyLength,
  difficulty,
  hasNumbers,
  hasSymbols,
  hasPunctuation,
  countOverride = null,
}) {
  if (testType === "stories") {
    let bank = STORY_MEDIUM;
    if (storyLength === "small") bank = STORY_SMALL;
    else if (storyLength === "medium") bank = STORY_MEDIUM;
    else if (storyLength === "large") bank = STORY_LARGE;
    return bank[Math.floor(Math.random() * bank.length)];
  }

  if (testType === "quotes") {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }

  let pool = [];
  let wordPool = WORDS;
  if (difficulty === "easy") {
    wordPool = WORDS.filter((w) => w.length <= 5);
    if (wordPool.length === 0) wordPool = WORDS;
  } else if (difficulty === "hard") {
    wordPool = WORDS.filter((w) => w.length > 5 && w.length <= 8);
    if (wordPool.length === 0) wordPool = WORDS;
  } else if (difficulty === "extra_hard") {
    wordPool = WORDS.filter((w) => w.length > 8);
    if (wordPool.length === 0) wordPool = WORDS;
  }

  pool.push(...wordPool);
  if (hasNumbers) pool.push(...NUMBERS);
  if (hasSymbols) pool.push(...SYMBOLS);
  if (pool.length === 0) pool = WORDS;

  let totalWords = countOverride !== null ? countOverride : 35;
  if (testType === "words") totalWords = wordCount;
  else if (testType === "infinite") totalWords = 250;

  let generated = [];
  for (let i = 0; i < totalWords; i++) {
    generated.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  let textString = generated.join(" ");
  if (hasPunctuation) {
    textString = textString.charAt(0).toUpperCase() + textString.slice(1) + ".";
  }
  return textString;
}
