export interface Archetype {
  title: string;
  description: string;
  self: string;
  systemVerdict: string;
}

export const archetypes = {
  kafka: {
    repressedPerformer: {
      title: "The Repressed Performer",
      description: "You learned the rules to survive. You dress your instincts in etiquette. Your smile is fluent, your pain is fluent — but is any of it truly yours?",
      self: "Obedient. Efficient. Alien to itself.",
      systemVerdict: "Model citizen. Operates within parameters."
    },
    mimicWhoForgot: {
      title: "The Mimic Who Forgot",
      description: "You've been performing for so long, you no longer remember what you were before. Freedom isn't a dream — it's an unfamiliar language.",
      self: "Empty. Adaptive. Ghost-like.",
      systemVerdict: "Untraceable origin. Assimilated successfully."
    },
    escapedStillCaged: {
      title: "The Escaped, Still Caged",
      description: "You escaped one trap, only to step into another with better lighting. You call this freedom — because you must.",
      self: "Cynical. Resigned. Sharpened by past pain.",
      systemVerdict: "Emotionally erratic. Surveillance required."
    }
  },
  dostoevsky: {
    ridiculousBeliever: {
      title: "The Ridiculous Believer",
      description: "You saw truth — radiant, full of love — and now you carry it like a wound. They laugh at you. Still, you speak.",
      self: "Transformed. Loving. Alone.",
      systemVerdict: "Unstable input. Hope detected."
    },
    woundedProphet: {
      title: "The Wounded Prophet",
      description: "You begged the world to change. It didn't. But something in you already had.",
      self: "Awakened. Fragile. Burning with silent faith.",
      systemVerdict: "Malfunction risk. Data rejected."
    },
    dreamerWhoReturned: {
      title: "The Dreamer Who Returned",
      description: "You returned from paradise with a message — not to convert, but to love. You know they won't understand. You stay anyway.",
      self: "Grounded. Brave. Quietly revolutionary.",
      systemVerdict: "Error 404: Individual not found in dataset."
    }
  }
};

export function calculateResult(sessionData: any): Archetype {
  let kafkaScore = sessionData.answers.reduce((sum: number, answer: any) => sum + answer.kafkaWeight, 0);
  let dostoevskyScore = sessionData.answers.reduce((sum: number, answer: any) => sum + answer.dostoevskyWeight, 0);
  
  // Add initial choice weight
  if (sessionData.initialChoice === 'suppress') {
    kafkaScore += 1;
  } else if (sessionData.initialChoice === 'speak') {
    dostoevskyScore += 1;
  }

  const responseTimes = sessionData.answers.map((answer: any) => answer.responseTime);
  const averageResponseTime = responseTimes.reduce((a: number, b: number) => a + b, 0) / responseTimes.length;
  
  const isKafkaPath = kafkaScore > dostoevskyScore;
  
  // Additional factors for archetype selection
  const hasQuickResponses = averageResponseTime < 3000; // Less than 3 seconds average
  const hasSlowResponses = averageResponseTime > 8000; // More than 8 seconds average
  const scoreMargin = Math.abs(kafkaScore - dostoevskyScore);
  const isCloseScore = scoreMargin <= 3;

  if (isKafkaPath) {
    if (hasQuickResponses || kafkaScore >= 15) {
      return archetypes.kafka.repressedPerformer;
    } else if (isCloseScore || hasSlowResponses) {
      return archetypes.kafka.escapedStillCaged;
    } else {
      return archetypes.kafka.mimicWhoForgot;
    }
  } else {
    if (dostoevskyScore >= 15 && !hasQuickResponses) {
      return archetypes.dostoevsky.dreamerWhoReturned;
    } else if (isCloseScore || hasSlowResponses) {
      return archetypes.dostoevsky.woundedProphet;
    } else {
      return archetypes.dostoevsky.ridiculousBeliever;
    }
  }
}
