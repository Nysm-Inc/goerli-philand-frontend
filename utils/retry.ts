export const retry = async (f: () => Promise<any>, retries: number): Promise<any> => {
  try {
    const data = await f();
    return data;
  } catch (error) {
    if (retries === 0) {
      return Promise.reject(error);
    }
    return retry(f, retries - 1);
  }
};
