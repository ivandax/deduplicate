const input = [
  {
    id: 123,
    content: "Test content",
    createTimestamp: 123213,
    answers: [
      {
        id: 142,
        rating: 10,
        content: "Test answer",
      },
      {
        id: 242,
        rating: 2,
        content: "Test answer 2",
      },
    ],
  },
  {
    id: 1024,
    content: "Test content",
    createTimestamp: 54343,
    answers: [
      {
        id: 342,
        rating: 4,
        content: "Test answer 3",
      },
      {
        id: 454,
        rating: 10,
        content: "Test answer 2",
      },
    ],
  },
  {
    id: 250,
    content: "Different test content",
    createTimestamp: 543431,
    answers: [
      {
        id: 854,
        rating: 10,
        content: "Test answer 4",
      },
      {
        id: 346,
        rating: 3,
        content: "Test answer 5",
      },
    ],
  },
];

const output = [
  {
    id: 123,
    content: "Test content",
    createTimestamp: 123213,
    answers: [
      {
        id: 142,
        rating: 10,
        content: "Test answer",
      },
      {
        id: 242,
        rating: 2,
        content: "Test answer 2",
      },
    ],
  },
  {
    id: 250,
    content: "Different test content",
    createTimestamp: 543431,
    answers: [
      {
        id: 854,
        rating: 10,
        content: "Test answer 4",
      },
      {
        id: 346,
        rating: 3,
        content: "Test answer 5",
      },
    ],
  },
];

const deduplicate = (questions) => {
  // To choose a single answer with the highest rating
  const getHighestAnswer = (arrayOfAnswers) => {
    return arrayOfAnswers.reduce((prev, current) => {
      return current.rating > prev.rating ? current : prev;
    });
  };

  // To use in case 2 questions have the same rating
  const getOlderQuestion = (arrayOfQuestions) => {
    return arrayOfQuestions.reduce((prev, current) => {
      return current.createTimestamp < prev.createTimestamp ? current : prev;
    });
  };

  // Uses the two functions above to select our definition of "better" question
  // Always returns a question
  const selectBetterQuestion = (questionA, questionB) => {
    const highestAnswerInA = getHighestAnswer(questionA.answers);
    const highestAnswerInB = getHighestAnswer(questionB.answers);
    if (highestAnswerInA.rating > highestAnswerInB.rating) {
      return questionA;
    } else if (highestAnswerInA.rating < highestAnswerInB.rating) {
      return questionB;
    } else {
      return getOlderQuestion([questionA, questionB]);
    }
  };

  // Go through the array and reduce it into the best questions
  const deduplicated = questions.reduce((acc, eachQuestion) => {
    if (acc.hasOwnProperty(eachQuestion.content)) {
      const existingQuestion = acc[eachQuestion.content];
      return {
        ...acc,
        [eachQuestion.content]: selectBetterQuestion(
          existingQuestion,
          eachQuestion
        ),
      };
    }
    return { ...acc, [eachQuestion.content]: eachQuestion };
  }, {});

  return Object.values(deduplicated);
};

console.log(deduplicate(input));
