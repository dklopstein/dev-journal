// storage.test.js

import { 
  saveToStorage,
  loadFromStorage,
  // saveJournal,
  getJournal,
  // loadJournal,
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
  let journal = [];
  let dateText = "5/30/2024";
  saveToStorage(journal, dateText, "rating", 5)
  saveToStorage(journal, dateText, "productivity", 8)
  expect(loadFromStorage(journal, dateText, "rating")).toBe(5);
  expect(loadFromStorage(journal, dateText, "productivity")).toBe(8);
  localStorage.setItem("journals", JSON.stringify(journal));
  
});

test('getJournal', () => {
  let journal = JSON.parse(localStorage.getItem("journals"));
  let dateText = "5/30/2024";
  expect(getJournal(journal, dateText)).toStrictEqual({rating: 5, productivity: 8});
});

