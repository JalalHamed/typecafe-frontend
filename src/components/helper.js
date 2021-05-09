let typecafe_commission = 5;

export const emailOverFlow = props => {
  const email = props.email;

  if (email.length > 33) {
    return email.slice(0, 30) + "...";
  } else {
    return email;
  }
};

export const fileNameFilter = name => {
  if (name.length > 20) {
    return name.slice(0, 20) + "...";
  } else {
    return name;
  }
};

export const priceFormat = price => {
  return farsiNumber(Number(price).toLocaleString() + " تومان");
};

export const farsiNumber = n => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, x => farsiDigits[x]);
};

export const addCommission = price => {
  return Math.round(price + price * 0.01 * typecafe_commission);
};

export const extractCommission = price => {
  return Math.round(price - price * 0.01 * typecafe_commission);
};
