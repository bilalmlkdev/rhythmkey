import { WORDS as WORDS_EN } from "../data/words";
import { WORDS_ES } from "../data/words_es";
import { WORDS_FR } from "../data/words_fr";
import { WORDS_DE } from "../data/words_de";
import { NUMBERS } from "../data/numbers";
import { SYMBOLS } from "../data/symbols";
import { STORY_SMALL, STORY_MEDIUM, STORY_LARGE } from "../data/stories";
import { QUOTES } from "../data/quotes";

const WORD_BANKS = {
  en: WORDS_EN,
  es: WORDS_ES,
  fr: WORDS_FR,
  de: WORDS_DE,
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateText({
  testType,
  wordCount,
  storyLength,
  difficulty,
  hasNumbers,
  hasSymbols,
  hasPunctuation,
  countOverride = null,
  language = "en",
}) {
  if (testType === "custom") return "";

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

  let wordPool = WORD_BANKS[language] || WORD_BANKS.en;
  let pool = [];

  if (difficulty === "easy") {
    wordPool = wordPool.filter((w) => w.length <= 5);
    if (wordPool.length < 20) wordPool = WORD_BANKS[language] || WORD_BANKS.en;
  } else if (difficulty === "hard") {
    wordPool = wordPool.filter((w) => w.length > 5 && w.length <= 8);
    if (wordPool.length < 20) wordPool = WORD_BANKS[language] || WORD_BANKS.en;
  } else if (difficulty === "extra_hard") {
    wordPool = wordPool.filter((w) => w.length > 8);
    if (wordPool.length < 20) wordPool = WORD_BANKS[language] || WORD_BANKS.en;
  }

  pool.push(...wordPool);
  if (hasNumbers) pool.push(...NUMBERS);
  if (hasSymbols) pool.push(...SYMBOLS);
  if (pool.length === 0) pool = WORD_BANKS.en;

  shuffle(pool);

  let totalWords = countOverride !== null ? countOverride : 35;
  if (testType === "words") totalWords = wordCount;
  else if (testType === "infinite") totalWords = 250;
  else if (testType === "time") totalWords = 100; // ensure enough text

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
