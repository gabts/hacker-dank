import { categories } from "./categories";
import { exec } from "./exec";
import { exportAnswers } from "./export-answers";
import { getTaskId } from "./utils";

// live reload https://esbuild.github.io/api/#live-reload
new EventSource("/esbuild").addEventListener("change", () => location.reload());

const state = {
  category: categories[0],
  task: categories[0].tasks[0],
};

const elements = {
  categories: document.getElementById("categories")!,
  codeEditor: document.getElementById("code-editor") as HTMLInputElement,
  reset: document.getElementById("code-reset")!,
  submit: document.getElementById("code-submit")!,
  taskDescription: document.getElementById("task-description")!,
  taskTitle: document.getElementById("task-title")!,
  tasks: document.getElementById("tasks")!,
  exportAnswers: document.getElementById("export")!,
};

function storeCodeEditorValue() {
  localStorage.setItem(
    getTaskId(state.category, state.task),
    elements.codeEditor.value
  );
}

function onSelectTask() {
  const { task } = state;
  elements.taskTitle.innerText = task.name;
  elements.taskDescription.innerText = task.description;
  elements.codeEditor.value =
    localStorage.getItem(getTaskId(state.category, state.task)) ||
    task.initialCode;
}

onSelectTask();

function onSelectCategory() {
  const { category } = state;
  elements.tasks.innerHTML = "";
  for (const task of category.tasks) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = task.name;
    button.addEventListener("click", function () {
      state.task = task;
      onSelectTask();
    });
    li.append(button);
    elements.tasks.append(li);
  }
}

onSelectCategory();

for (const category of categories) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.innerText = category.name;
  button.addEventListener("click", function () {
    state.category = category;
    state.task = category.tasks[0];
    onSelectCategory();
    onSelectTask();
  });

  li.append(button);
  elements.categories.append(li);
}

elements.reset.addEventListener("click", function (e) {
  e.preventDefault();
  elements.codeEditor.value = state.task.initialCode;
  localStorage.removeItem(getTaskId(state.category, state.task));
});

elements.submit.addEventListener("click", function (e) {
  e.preventDefault();
  storeCodeEditorValue();
  const code = elements.codeEditor.value;
  exec(state.task, code);
});

elements.codeEditor.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "Tab": {
      e.preventDefault();
      const position = elements.codeEditor.selectionStart;
      if (position) {
        elements.codeEditor.value =
          elements.codeEditor.value.substr(0, position) +
          "  " +
          elements.codeEditor.value.substr(position);
        elements.codeEditor.setSelectionRange(position + 2, position + 2);
      }
    }
    case "Enter": {
      if (e.metaKey) {
        elements.submit.click();
      }
    }
  }
});

elements.codeEditor.addEventListener("blur", storeCodeEditorValue);

elements.exportAnswers.addEventListener("click", exportAnswers);
