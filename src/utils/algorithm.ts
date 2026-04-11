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
    normalizedCoords[axis] = (rawScores[axis] / 20) * 100;
  });

  return normalizedCoords;
};

export const findClosestIdeology = (userCoords: Record<Axis, number>) => {
  let closestMatch: Ideology = IDEOLOGIES[0];
  let minWeightedDistance = Infinity;

  const axes: Axis[] = ['economy', 'power', 'culture', 'identity', 'ecology', 'tech'];

  IDEOLOGIES.forEach(ideology => {
    // 加权欧几里得距离计算
    const weightedDistance = Math.sqrt(
      axes.reduce((sum, axis) => {
        const diff = userCoords[axis] - ideology.coordinates[axis];
        const weight = ideology.axisWeights[axis] || 1.0;
        return sum + weight * Math.pow(diff, 2);
      }, 0)
    );

    if (weightedDistance < minWeightedDistance) {
      minWeightedDistance = weightedDistance;
      closestMatch = ideology;
    }
  });

  // 简化的匹配百分比计算
  return { ...closestMatch, matchPercentage: 100 };
};
