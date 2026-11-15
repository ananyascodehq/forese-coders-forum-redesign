// The four topics the mentorship programme covers. `snippet` is decorative flavour, not course content.
export const TOPICS = [
  {
    key: "ds",
    short: "DS",
    name: "Data Structures",
    body: "Arrays, linked lists, stacks, trees, graphs, and fundamental data-structure concepts.",
    tags: ["Arrays", "Linked lists", "Stacks", "Trees", "Graphs"],
    snippet: ["stack.push(node);", "while (!stack.isEmpty()) {", "  visit(stack.pop());", "}"],
  },
  {
    key: "algo",
    short: "ALGO",
    name: "Algorithms",
    body: "Searching, sorting, recursion, complexity analysis, and problem-solving techniques.",
    tags: ["Searching", "Sorting", "Recursion", "Complexity", "Problem solving"],
    snippet: ["int mid = (lo + hi) / 2;", "if (a[mid] < key) lo = mid + 1;", "else hi = mid;", "// O(log n)"],
  },
  {
    key: "java",
    short: "JAVA",
    name: "Java",
    body: "Programming fundamentals, OOP concepts, syntax, implementation, and structuring code.",
    tags: ["Fundamentals", "OOP", "Syntax", "Implementation", "Code structure"],
    snippet: ["class Mentor extends Student {", "  @Override", "  void learn() { teach(); }", "}"],
  },
  {
    key: "ml",
    short: "ML",
    name: "Machine Learning",
    body: "Data preprocessing, model training, evaluation, and building predictive AI models.",
    tags: ["Preprocessing", "Training", "Evaluation", "Predictive models"],
    snippet: ["X = clean(raw_data)", "model.fit(X_train, y_train)", "score = model.evaluate(X_test)", "# iterate"],
  },
] as const;

export type TopicKey = (typeof TOPICS)[number]["key"];
