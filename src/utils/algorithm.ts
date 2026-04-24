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
    // 1. 权力/自由维度红线
    if ((['totalitarianism', 'authoritarianism', 'fascism'].includes(ideology.id)) && userCoords.power > 10) {
      return; // 偏向自由的人绝对不可能是法西斯或极权
    }
    if ((['libertarianism', 'ancap', 'anarchism', 'anarchoegoism'].includes(ideology.id)) && userCoords.power < -10) {
      return; // 偏向权威的人绝对不可能是无政府或自由意志主义
    }

    // 2. 经济/阶级维度红线
    if ((['ml', 'trotskyism', 'ancom'].includes(ideology.id)) && userCoords.economy > 20) {
      return; // 支持纯市场的人绝对不可能是托派或马列
    }
    if ((['objectivism', 'ancap'].includes(ideology.id)) && userCoords.economy < -20) {
      return; // 支持公有制的人绝对不可能是客观主义者
    }

    // 3. 认同/民族维度红线
    if ((['ethnonationalism', 'fascism'].includes(ideology.id)) && userCoords.identity < -30) {
      return; // 世界主义者绝对不可能是种族民族主义或法西斯
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
