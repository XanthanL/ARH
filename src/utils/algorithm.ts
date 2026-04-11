import { Axis, QUESTIONS } from '../data/questions';
import { IDEOLOGIES, Ideology } from '../data/ideologies';

export const calculateUserCoordinates = (answers: Record<number, number>): Record<Axis, number> => {
  const rawScores: Record<Axis, number> = {
    economy: 0, power: 0, culture: 0, identity: 0, ecology: 0, tech: 0
  };

  QUESTIONS.forEach(q => {
    const answerValue = answers[q.id] || 0;
    // 基础逻辑：answerValue (-2 ~ 2) * q.direction
    let score = answerValue * q.direction;
    
    // 极性修正：确保 -100 对应 AXIS_CONFIG 的 LeftLabel，100 对应 RightLabel
    // Power: +1 为权威。在 AXIS_CONFIG 中 Left 是权威。
    // 所以权威应该是负分。我们需要对 Power, Culture, Identity, Ecology, Tech 进行取反。
    if (['power', 'culture', 'identity', 'ecology', 'tech'].includes(q.axis)) {
      score = -score;
    }

    rawScores[q.axis] += score;
  });

  const normalizedCoords: Record<Axis, number> = {} as any;
  (Object.keys(rawScores) as Axis[]).forEach(axis => {
    // 每轴10题，最大原始分 20，映射到 -100 ~ 100
    normalizedCoords[axis] = (rawScores[axis] / 20) * 100;
  });

  return normalizedCoords;
};

export const findClosestIdeology = (userCoords: Record<Axis, number>) => {
  let closestMatch: Ideology = IDEOLOGIES[0];
  let minWeightedDistance = Infinity;

  const axes: Axis[] = ['economy', 'power', 'culture', 'identity', 'ecology', 'tech'];

  IDEOLOGIES.forEach(ideology => {
    // --- VETO SYSTEM (一票否决机制) ---
    // 如果用户极其偏向自由 (power > 10)，严禁匹配极权/威权主义 (其 power 坐标通常为 -70 ~ -100)
    if ((ideology.id === 'totalitarianism' || ideology.id === 'authoritarianism') && userCoords.power > 10) {
      return; // 强制排除
    }
    
    // 反之：如果用户极其偏向权威 (power < -10)，严禁匹配自由意志主义相关
    if ((ideology.id === 'libertarianism' || ideology.id === 'ancap' || ideology.id === 'anarchism') && userCoords.power < -10) {
      return; // 强制排除
    }

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

  return { ...closestMatch, matchPercentage: 100 };
};
