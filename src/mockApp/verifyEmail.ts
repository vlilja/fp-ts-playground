export const sendVerifyEmail = (email: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(new Date().getSeconds(), `Sending verify email to ${email}`);
      resolve('sent email');
    }, 500);
  });
};
