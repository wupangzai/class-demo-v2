/**
 * 传入一个对象数组，按照指定的property，排序，有相同的property则放到第一次出现该property的位置
 */
export function sortByPropertyOrder(
  arr: Record<string, any>[],
  property: string
) {
  const groups = arr.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] = acc[key] || [];
    acc[key].push(obj);
    return acc;
  }, {});

  return Object.keys(groups).reduce((acc, key) => {
    return acc.concat(groups[key]);
  }, []);
}
