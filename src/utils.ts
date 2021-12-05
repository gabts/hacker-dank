import { Category, CategoryTask } from "./categories";

export function getTaskId(category: Category, task: CategoryTask) {
  return (
    category.name.toLowerCase().replace(/\s+/g, "-") +
    "__" +
    task.name.toLowerCase().replace(/\s+/g, "-")
  );
}
