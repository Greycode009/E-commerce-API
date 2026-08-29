import crypto from "crypto";

export const generateOtp = () => {
  const remaining = crypto.randomInt(1000, 10000);

  return `29${remaining}`;
};
