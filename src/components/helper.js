let typecafe_commission = 10;

export const emailOverFlow = props => {
  const email = props.email;

  if (email.length > 33) {
    return email.slice(0, 30) + "...";
  } else {
    return email;
  }
};

export const fileNameFilter = (name, length) => {
  if (name.length > length) {
    return "..." + name.slice(0, length);
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

export const getUserTimeStatus = (onlineUsers, id, is_online) => {
  if (
    !onlineUsers.disconnects.includes(id) &&
    (is_online || onlineUsers.ids.includes(id))
  ) {
    return true;
  } else {
    return false;
  }
};

export const lastSeen = (onlineUsers, id) => {
  if (!onlineUsers.disconnects.includes(id)) {
    return true;
  } else {
    return false;
  }
};

export const remainingTime = (_issued_at, _deadline) => {
  let now = Date.parse(new Date());
  let issued_at = Date.parse(_issued_at);
  let deadline = _deadline * 1000;
  return Math.round((deadline - (now - issued_at)) / 1000);
};
