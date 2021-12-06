import { categories } from "./categories";
import { getTaskId } from "./utils";

const line = "/".repeat(80);

export function exportAnswers() {
  let content = "";

  for (const category of categories) {
    let name = `// Category: ${category.name} `;
    while (name.length < 80) name += "/";
    content += `${line}\n${name}\n${line}\n\n`;
    for (const task of category.tasks) {
      content += `//// Task: ${task.name}\n\n`;
      const storedValue = localStorage.getItem(getTaskId(category, task));
      content +=
        storedValue === task.initialCode ? "// Not started :(" : storedValue;
      content += "\n\n";
    }
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

  const file = document.createElement("a");
  file.href = URL.createObjectURL(blob);
  file.download = "hacker-dank";
  file.style.visibility = "hidden";

  document.body.appendChild(file);
  file.click();
  document.body.removeChild(file);
}
