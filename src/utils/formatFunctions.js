const round = (num, digits = 2) => {
  const number = Number(num);
  if (Number.isNaN(number)) return num;

  return Number.parseFloat(number.toFixed(digits));
};

export const formatLength = (value, t) => {
  if (value == null) return value;

  // cm → m
  if (value >= 100 && value < 100000) {
    return `${round(value / 100)} ${t("units.m")}`;
  }

  // cm → km
  if (value >= 100000) {
    return `${round(value / 100000)} ${t("units.km")}`;
  }

  return `${round(value)} ${t("units.cm")}`;
};

export const formatWeight = (value, t) => {
  if (value == null) return value;

  // kg → ton
  if (value >= 1000) {
    return `${round(value / 1000)} ${t("units.ton")}`;
  }

  return `${round(value)} ${t("units.kg")}`;
};
