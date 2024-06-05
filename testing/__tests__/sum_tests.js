// storage.test.js

import { 
  saveToStorage,
  loadFromStorage,
  getJournal

} from '../../source/homepage/homepage.js';

beforeEach(() => {
});

test('Single saveToStorage and loadFromStorage', () => {
  let journals = [];
  let dateText = "5/30/2024";
  saveToStorage(journals, dateText, "rating", 5)
  expect(loadFromStorage(journals, dateText, "rating")).toBe(5);
});

test('Multiple saveToStorage and loadFromStorage', () => {
  let journals = [];
  let dateText = "5/30/2024";
  saveToStorage(journals, dateText, "rating", 5)
  saveToStorage(journals, dateText, "productivity", 8)
  let dateText2 = "5/31/2024";
  saveToStorage(journals, dateText2, "rating", 3)
  saveToStorage(journals, dateText2, "productivity", 7)
  expect(loadFromStorage(journals, dateText, "rating")).toBe(5);
  expect(loadFromStorage(journals, dateText, "productivity")).toBe(8);
  expect(loadFromStorage(journals, dateText2, "rating")).toBe(3);
  expect(loadFromStorage(journals, dateText2, "productivity")).toBe(7);
});

test('loadFromStorage null check', () => {
  let journals = [];
  let dateText = "4/1/2024";
  expect(loadFromStorage(journals, dateText, "rating")).toBe(null);
});

test('getJournal null check', () => {
  expect(getJournal()).toStrictEqual({});

  
});

test('getJournal', () => {
  let journals = {
    "5/30/2024": {
      rating: 5,
      productivity: 8
    }
  };
  localStorage.setItem("journals", JSON.stringify(journals));
  expect(getJournal()).toStrictEqual(journals);
});