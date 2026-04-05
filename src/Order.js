let orderCount = 0;

export function handleInput(sInput) {
  const lower = sInput.toLowerCase();
  let aReturn = [];

  const isOrdering = lower.match(
    /order|want|would like|have|get|give me|burger|pizza|pasta|salad|drink|fries|sandwich|chicken|soda|water|coffee|tea/
  );

  if (isOrdering) {
    orderCount += 1;
    if (orderCount % 10 === 0) {
      aReturn.push(`🎉 Congratulations! This is your ${orderCount}th order — it's FREE!`);
    } else {
      aReturn.push(`Got it! Order placed. You have ${orderCount} order${orderCount === 1 ? '' : 's'}.`);
      aReturn.push(`${10 - (orderCount % 10)} more until a free meal! 🍕`);
    }
  } else if (lower.match(/menu|options|what.*have/)) {
    aReturn.push("We have pizza, burgers, pasta, salads, and drinks!");
    aReturn.push("What would you like to order?");
  } else if (lower.match(/hi|hello|hey/)) {
    aReturn.push("Hey there! 👋 What would you like to order today?");
  } else if (lower.match(/points|loyalty|reward|free|how many/)) {
    aReturn.push(`You've placed ${orderCount} orders so far.`);
    aReturn.push("Every 10th order is free! 🎁");
  } else if (lower.match(/thank|thanks/)) {
    aReturn.push("You're welcome! Enjoy your meal! 😊");
  } else {
    aReturn.push("I can help you order food!");
    aReturn.push("Try saying 'I want a pizza' or type 'menu' to see options.");
  }

  return aReturn;
}

export function clearInput() {
  orderCount = 0;
}