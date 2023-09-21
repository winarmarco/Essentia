export const dotPropGet = (obj: Record<string, any>, path: string): any => {
  const keys = path.split(".");
  let value: any = obj;

  for (const key of keys) {
    if (value[key] !== undefined && value[key] !== null) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}
