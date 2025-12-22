'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Question } from '@/types';

interface QuizComponentProps {
    questions: Question[];
    onComplete: (score: number, passed: boolean) => void;
    passingScore?: number;
}

export default function QuizComponent({
    questions,
    onComplete,
    passingScore = 70
}: QuizComponentProps) {
    const { language } = useLanguage();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const translations = {
        uz: {
            question: "Savol",
            of: "dan",
            next: "Keyingi",
            previous: "Oldingi",
            finish: "Tugatish",
            results: "Natijalar",
            score: "Ball",
            passed: "O'tdingiz!",
            failed: "O'tmadingiz",
            correct: "To'g'ri",
            incorrect: "Noto'g'ri",
            yourAnswer: "Sizning javobingiz",
            correctAnswer: "To'g'ri javob",
            explanation: "Tushuntirish",
            tryAgain: "Qaytadan urinish",
            continue: "Davom etish"
        },
        ru: {
            question: "Вопрос",
            of: "из",
            next: "Далее",
            previous: "Назад",
            finish: "Завершить",
            results: "Результаты",
            score: "Баллы",
            passed: "Вы прошли!",
            failed: "Не прошли",
            correct: "Правильно",
            incorrect: "Неправильно",
            yourAnswer: "Ваш ответ",
            correctAnswer: "Правильный ответ",
            explanation: "Объяснение",
            tryAgain: "Попробовать снова",
            continue: "Продолжить"
        },
        en: {
            question: "Question",
            of: "of",
            next: "Next",
            previous: "Previous",
            finish: "Finish",
            results: "Results",
            score: "Score",
            passed: "You passed!",
            failed: "You didn't pass",
            correct: "Correct",
            incorrect: "Incorrect",
            yourAnswer: "Your answer",
            correctAnswer: "Correct answer",
            explanation: "Explanation",
            tryAgain: "Try Again",
            continue: "Continue"
        }
    };

    const t = translations[language as keyof typeof translations] || translations.uz;

    const currentQ = questions[currentQuestion];

    const handleSelectAnswer = (answerIndex: number) => {
        if (!showResults) {
            setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answerIndex });
        }
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                correct++;
            }
        });
        return Math.round((correct / questions.length) * 100);
    };

    const handleFinish = () => {
        setShowResults(true);
        setShowExplanation(true);
        const score = calculateScore();
        onComplete(score, score >= passingScore);
    };

    const handleTryAgain = () => {
        setSelectedAnswers({});
        setCurrentQuestion(0);
        setShowResults(false);
        setShowExplanation(false);
    };

    if (showResults) {
        const score = calculateScore();
        const passed = score >= passingScore;

        return (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                {/* Results Header */}
                <div className="text-center mb-8">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${passed ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                        {passed ? (
                            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <h2 className={`text-2xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                        {passed ? t.passed : t.failed}
                    </h2>
                    <p className="text-4xl font-bold text-white mt-2">{score}%</p>
                    <p className="text-gray-400">{t.score}</p>
                </div>

                {/* Questions Review */}
                <div className="space-y-4 mb-6">
                    {questions.map((q, idx) => {
                        const userAnswer = selectedAnswers[idx];
                        const isCorrect = userAnswer === q.correctAnswer;

                        return (
                            <div
                                key={q.id}
                                className={`p-4 rounded-xl border ${isCorrect
                                        ? 'bg-green-500/10 border-green-500/30'
                                        : 'bg-red-500/10 border-red-500/30'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                        }`}>
                                        {idx + 1}
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-white text-sm mb-2">{q.question}</p>
                                        <p className="text-xs text-gray-400">
                                            {t.yourAnswer}: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                                {q.options[userAnswer]}
                                            </span>
                                        </p>
                                        {!isCorrect && (
                                            <p className="text-xs text-gray-400">
                                                {t.correctAnswer}: <span className="text-green-400">{q.options[q.correctAnswer]}</span>
                                            </p>
                                        )}
                                        {q.explanation && (
                                            <p className="text-xs text-gray-500 mt-2 italic">{q.explanation}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    {!passed && (
                        <button
                            onClick={handleTryAgain}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                        >
                            {t.tryAgain}
                        </button>
                    )}
                    <button
                        onClick={() => onComplete(score, passed)}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all"
                    >
                        {t.continue}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-400">
                    {t.question} {currentQuestion + 1} {t.of} {questions.length}
                </span>
                <div className="flex gap-1">
                    {questions.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-colors ${idx === currentQuestion
                                    ? 'bg-yellow-500'
                                    : selectedAnswers[idx] !== undefined
                                        ? 'bg-green-500'
                                        : 'bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Question */}
            <h3 className="text-xl font-semibold text-white mb-6">{currentQ.question}</h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
                {currentQ.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 ${selectedAnswers[currentQuestion] === idx
                                ? 'bg-yellow-500/20 border-2 border-yellow-500 text-white'
                                : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-gray-600'
                            }`}
                    >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${selectedAnswers[currentQuestion] === idx
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                            {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                    </button>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
                {currentQuestion > 0 && (
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                    >
                        {t.previous}
                    </button>
                )}

                {currentQuestion < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={selectedAnswers[currentQuestion] === undefined}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.next}
                    </button>
                ) : (
                    <button
                        onClick={handleFinish}
                        disabled={Object.keys(selectedAnswers).length < questions.length}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.finish}
                    </button>
                )}
            </div>
        </div>
    );
}
