import { CategoryTask } from "./categories";

export function exec(task: CategoryTask, code: string) {
  let functionContent = code;

  functionContent += `
(function() {
  document.getElementById("results").innerHTML = "";
  function addResult(index, passed) {
    const li = document.createElement("li");
    li.innerText = (passed ? "✅" : "❌") + " Case " + index;
    document.getElementById("results").append(li);
  }`;

  for (let i = 0; i < task.check.length; i++) {
    functionContent += `
  (function() {
    addResult(${i}, ${task.check[i].exec} === ${task.check[i].expectedOutput});
  })();`;
  }

  functionContent += "\n})();";

  new Function(functionContent)();
}
