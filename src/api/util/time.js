// eslint-disable-next-line import/prefer-default-export
export const getCurWeek = firstWeekDate => {
  return Math.floor((Date.now() - firstWeekDate) / 1000 / 60 / 60 / 24 / 7);
};

