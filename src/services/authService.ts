export const loginUser = async (username: string, password: string) => {
  // In a real app, you would make an API call here
  // For demo purposes, we'll simulate a successful login
  return new Promise<{ username: string }>((resolve) => {
    setTimeout(() => {
      resolve({ username });
    }, 1000);
  });
};

export const logoutUser = async () => {
  // In a real app, you would make an API call here
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};