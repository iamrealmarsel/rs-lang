/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GameOptions,
  StatisticsOption,
  UrlPath,
  UserWordOptions,
} from 'src/helpers/constRequestsAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { getNumberOfLearnedWords, getNumberOfNewWords } from 'src/helpers/utils';
import { addDis, clearWords, updateAnswers, updateQuestion } from 'src/store/audioSlice';
import { useAppDispatch } from 'src/store/hooks';
import { removeWords } from 'src/store/sprintSlice';
import { fetchGetUserStatistics } from 'src/store/statisticsSlice';
import { IWord } from 'src/store/types';
import { fetchCreateUserWord } from 'src/store/userWordsSlice';
import styles from './Result.module.scss';

interface IResultProps {
  rightAnswers: IWord[];
  wrongAnswers: IWord[];
  strike: number;
  gameType: StatisticsOption;
  onPlayAgain: () => void;
}

const Result: React.FC<IResultProps> = ({
  rightAnswers,
  wrongAnswers,
  strike,
  gameType,
  onPlayAgain,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const audio = new Audio();

  useEffect(() => {
    let option: UserWordOptions;

    switch (gameType) {
      case StatisticsOption.SPRINT:
        option = UserWordOptions.SPRINT;
        break;

      case StatisticsOption.AUDIO:
        option = UserWordOptions.AUDIO;
        break;

      default:
        break;
    }

    const stata = {
      right: rightAnswers.length,
      wrong: wrongAnswers.length,
      strike,
      new: getNumberOfNewWords(rightAnswers) + getNumberOfNewWords(wrongAnswers),
      learned: getNumberOfLearnedWords(rightAnswers),
    };

    dispatch(fetchGetUserStatistics(getUserId(), getUserToken(), gameType, stata));

    rightAnswers.forEach((word) => {
      dispatch(
        fetchCreateUserWord(
          getUserId(),
          word?._id,
          getUserToken(),
          `${word?.group}`,
          option,
          GameOptions.CORRECT
        )
      );
    });

    wrongAnswers.forEach((word) => {
      dispatch(
        fetchCreateUserWord(
          getUserId(),
          word?._id,
          getUserToken(),
          `${word?.group}`,
          option,
          GameOptions.WRONG
        )
      );
    });
  }, [dispatch, gameType, rightAnswers, strike, wrongAnswers]);

  const handlePlayClick = (src: string) => {
    audio.src = `${UrlPath.BASE}/${src}`;
    audio.play().catch((error) => error);
  };

  const handleLinkToTextbook = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => err);
    }
    dispatch(removeWords());
    dispatch(clearWords());
    dispatch(updateQuestion(0));
    dispatch(updateAnswers([]));
    dispatch(addDis(false));
    navigate('/textbook');
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Результаты</h2>
      <div className={styles.result}>
        <span className={styles.strike}>Подряд угаданных слов: {strike}</span>
        <div className={styles.right}>
          <h3 className={styles.caption}>
            Я знаю <span className={styles.amountRight}>{rightAnswers.length}</span>
          </h3>
          {rightAnswers.map((word) => (
            <div className={styles.wordRow} key={word.id || word._id}>
              <button
                className={styles.btnSound}
                type='button'
                onClick={() => handlePlayClick(word.audio)}
              >
                <svg viewBox='0 0 24 24' fill='gray'>
                  <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
                </svg>
              </button>
              <span className={styles.word}>{word.word}&nbsp;-&nbsp;</span>
              <span className={styles.wordTranslate}>{word.wordTranslate}</span>
            </div>
          ))}
        </div>
        <div className={styles.wrong}>
          <h3 className={styles.caption}>
            Я не знаю <span className={styles.amountWrong}>{wrongAnswers.length}</span>
          </h3>
          {wrongAnswers.map((word) => (
            <div className={styles.wordRow} key={word.id || word._id}>
              <button
                className={styles.btnSound}
                type='button'
                onClick={() => handlePlayClick(word.audio)}
              >
                <svg viewBox='0 0 24 24' fill='gray'>
                  <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
                </svg>
              </button>
              <span className={styles.word}>{word.word}&nbsp;-&nbsp;</span>
              <span className={styles.wordTranslate}>{word.wordTranslate}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <button type='button' className={styles.btn} onClick={onPlayAgain}>
          Сыграть еще раз
        </button>
        <button type='button' className={styles.btn} onClick={handleLinkToTextbook}>
          Перейти в учебник
        </button>
      </div>
    </div>
  );
};

export default Result;
