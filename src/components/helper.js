export const EmailOverFlow = props => {
  const email = props.email;

  if (email.length > 33) {
    return email.slice(0, 30) + "...";
  } else {
    return email;
  }
};

export const PriceFormat = price => {
  return Number(price).toLocaleString() + " تومان";
};
