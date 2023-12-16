import React, { useState } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification.jsx';


export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onUpdated = (item) => {
    switch (item) {
      case 'good':
        setGood((prev) => prev + 1);
        break;
      case 'neutral':
        setNeutral((prev) => prev + 1);
        break;
      case 'bad':
        setBad((prev) => prev + 1);
        break;
      default:
        break;
    }
  };
  
  const getCountTotalFeedback = () => {
    return good + neutral + bad;
  };

  const feedbackPercentage = () => {
    const total = getCountTotalFeedback();
    return total > 0 ? (good / total) * 100 : 0;
  };


  const total = getCountTotalFeedback();
  const percent = feedbackPercentage();

  return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys({ good, neutral, bad })}
            onLeaveFeedback={onUpdated}
          />
        </Section>
        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={percent}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
}