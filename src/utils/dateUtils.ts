export const dateYearsFromNow = (years: number = 0) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date;
  };