import { Axis, QUESTIONS } from '../data/questions';
import { IDEOLOGIES, Ideology } from '../data/ideologies';

export const calculateUserCoordinates = (answers: Record<number, number>): Record<Axis, number> => {
  const rawScores: Record<Axis, number> = {
    economy: 0, power: 0, culture: 0, identity: 0, ecology: 0, tech: 0
  };

  QUESTIONS.forEach(q => {
    const answerValue = answers[q.id] || 0;
    rawScores[q.axis] += (answerValue * q.direction);
  });

  const normalizedCoords: Record<Axis, number> = {} as any;
  (Object.keys(rawScores) as Axis[]).forEach(axis => {
    // 每轴10题，最大原始分20 (10题 * 2分)
    normalizedCoords[axis] = (rawScores[axis] / 20) * 100;
  });

  return normalizedCoords;
};

export const findClosestIdeology = (userCoords: Record<Axis, number>) => {
  let closestMatch: Ideology = IDEOLOGIES[0];
  let minDistance = Infinity;

  const axes: Axis[] = ['economy', 'power', 'culture', 'identity', 'ecology', 'tech'];

  IDEOLOGIES.forEach(ideology => {
    const distance = Math.sqrt(
      axes.reduce((sum, axis) => {
        const diff = userCoords[axis] - ideology.coordinates[axis];
        return sum + Math.pow(diff, 2);
      }, 0)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = ideology;
    }
  });

  const maxPossibleDist = Math.sqrt(6 * Math.pow(200, 2)); // 489.89
  const matchPercentage = Math.max(0, Math.min(100, Math.round((1 - minDistance / maxPossibleDist) * 100)));

  return { ...closestMatch, matchPercentage };
};
