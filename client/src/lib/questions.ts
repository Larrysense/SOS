export interface Question {
  id: number;
  text: string;
  optionA: {
    text: string;
    kafkaWeight: number;
    dostoevskyWeight: number;
  };
  optionB: {
    text: string;
    kafkaWeight: number;
    dostoevskyWeight: number;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Would you change your language, even your gestures, to be understood by others?",
    optionA: { text: "Yes, adaptation is survival.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No, I must remain true to myself.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 2,
    text: "Have you ever felt more like a performance than a person?",
    optionA: { text: "Yes, I'm always performing.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Only when I hide what I believe.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 3,
    text: "Is survival always more important than honesty?",
    optionA: { text: "Yes, I need to live first.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No, truth matters more than survival.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 4,
    text: "If no one understood your pain, would you still try to express it?",
    optionA: { text: "No, it's pointless if it's ignored.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes, it still needs to be said.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 5,
    text: "Would you rather be seen as civil or true?",
    optionA: { text: "Civil — it's safer.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "True — even if it's harder.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 6,
    text: "Have you ever been praised for a version of yourself you didn't recognize?",
    optionA: { text: "Yes — and I accepted it.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes — and it unsettled me.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 7,
    text: "Does becoming part of the system mean you're free from danger—or just watched more closely?",
    optionA: { text: "It means safety through obedience.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "It means I'm being quietly controlled.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 8,
    text: "If being caged guarantees comfort, would you lock the door yourself?",
    optionA: { text: "Yes — comfort is enough.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No — I need to be free, even if it hurts.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 9,
    text: "Have you ever shaped your post or comment just to be understood by the algorithm?",
    optionA: { text: "Yes — to remain visible.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No — I try to be sincere.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 10,
    text: "Do you ever feel more legible online than in real life—but less real?",
    optionA: { text: "Yes — online I'm a product.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No — I'm more myself offline.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 11,
    text: "If you uncovered a truth that exposed society's deepest illusions, would you risk being cast out to share it?",
    optionA: { text: "No — it's not worth the exile.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes — even if I'm cast out.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 12,
    text: "Can you live in a world you know is false without becoming false yourself?",
    optionA: { text: "Yes — I'll protect myself.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No — I'll live and die by truth.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 13,
    text: "Would you break a system built on lies, even if everyone inside it was happy?",
    optionA: { text: "No — comfort is better than conflict.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes — comfort doesn't justify a lie.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 14,
    text: "Do you feel more ridiculous when you share what you really believe—or when you stay silent?",
    optionA: { text: "Sharing — it exposes too much.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Silence — it feels like betrayal.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 15,
    text: "If your inner transformation made you incomprehensible to others, would you still live by it?",
    optionA: { text: "No — I want to belong.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes — even if no one understands.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 16,
    text: "Which frightens you more: being misunderstood, or being erased entirely?",
    optionA: { text: "Being erased — I need to exist somewhere.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Being misunderstood — I want to be seen for who I am.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 17,
    text: "Is truth still worth living for if no one else will live it with you?",
    optionA: { text: "No — what's the point if I'm alone?", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes — truth is still worth it.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 18,
    text: "Have you ever performed outrage or irony online just to be heard?",
    optionA: { text: "Yes — sincerity doesn't work.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "No — I try to stay honest.", kafkaWeight: 0, dostoevskyWeight: 1 }
  },
  {
    id: 19,
    text: "Would you still believe in your dream if no one ever liked, shared, or followed it?",
    optionA: { text: "No — silence means failure.", kafkaWeight: 1, dostoevskyWeight: 0 },
    optionB: { text: "Yes — belief isn't about validation.", kafkaWeight: 0, dostoevskyWeight: 1 }
  }
];
