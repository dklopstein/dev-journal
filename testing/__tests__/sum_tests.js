// storage.test.js

import { 
  saveToStorage,
  loadFromStorage,
  getJournal,
  // saveTasks,
  // getTasks,
  // loadTasks,
  // saveCompleted,
  // getCompleted,
  // loadCompleted,
  // saveWidgets,
  // loadWidgets

} from '../../source/homepage/homepage.js';

beforeEach(() => {
});

test('save and load', () => {
  let journals = [];
  let dateText = "5/30/2024";
  saveToStorage(journals, dateText, "rating", 5)
  saveToStorage(journals, dateText, "productivity", 8)
  expect(loadFromStorage(journals, dateText, "rating")).toBe(5);
  expect(loadFromStorage(journals, dateText, "productivity")).toBe(8);
});

test('getJournal', () => {
  let journals = {
    "5/30/2024": {
      rating: 5,
      productivity: 8
    }
  };
  let dateText = "5/30/2024";
  localStorage.setItem("journals", JSON.stringify(journals));
  expect(getJournal()).toStrictEqual(journals);
});

