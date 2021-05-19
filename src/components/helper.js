let typecafe_commission = 10;

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

export const scrollToRef = ref => {
  const scroll = ref.current.scrollHeight - ref.current.clientHeight;
  ref.current.scrollTo(0, scroll);
};

export const getUserTimeStatus = (onlineUsers, user) => {
  if (
    !onlineUsers.disconnects.includes(user.id) &&
    (user.is_online || onlineUsers.ids.includes(user.id))
  ) {
    return true;
  } else {
    return false;
  }
};
