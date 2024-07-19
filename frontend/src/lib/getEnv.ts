const getEnv = (key: string) => {
  const value = process.env[key];
  if(value === undefined) {
    throw new Error(`Env ${key} is required`);
  }
  return value;
};

export default getEnv;
