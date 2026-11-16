// Every line comes from what the club does. No member counts, dates or results are claimed.

/** Each pair morphs from the old way of learning to what the club offers. */
export const BEFORE_AFTER = [
  { before: "learning alone", after: "students teaching students" },
  { before: "tutorials you never finish", after: "hackathons and real projects" },
  { before: "theory with nowhere to go", after: "mentors a few steps ahead" },
] as const;

/** Four reasons that do not repeat the before/after pairs above. `cmd` is decorative terminal flavour. */
export type ReasonVisual = "compete" | "placement" | "explore" | "belong";

export const REASONS: readonly { title: string; cmd: string; visual: ReasonVisual; body: string }[] = [
  {
    title: "Compete",
    cmd: "$ compete --live",
    visual: "compete",
    body: "Technical competitions that put your problem solving on the line, and sharpen it.",
  },
  {
    title: "Be placement-ready",
    cmd: "$ placement --ready",
    visual: "placement",
    body: "Skills for academics, personal projects, competitive programming and upcoming placements.",
  },
  {
    title: "Explore new tech",
    cmd: "$ explore --emerging",
    visual: "explore",
    body: "Software and emerging technology, explored together with people who are curious about the same things.",
  },
  {
    title: "Belong",
    cmd: "$ belong --team",
    visual: "belong",
    body: "Run by students, for students, at Sri Venkateswara College of Engineering. Build skills together.",
  },
];

export const JOIN_IF = [
  "You want to understand it, not just memorise it.",
  "You would rather build the thing than watch a video about it.",
  "You want someone a few steps ahead to ask.",
  "You work better with a team and a deadline.",
  "You are curious about emerging technology.",
];

/** How many lines must be ticked before the checklist says "you're one of us". */
export const JOIN_IF_THRESHOLD = 3;
