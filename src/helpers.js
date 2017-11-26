import Immutable, { OrderedMap, Map } from 'immutable';

export function arrToMap(arr, DataRecord = Map) {
  return arr.reduce((acc, item) =>
    acc.set(item.id, new DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
  if (obj !== null) {
    return obj.valueSeq().toArray();
  }
  return null;
}

export function fromJSOrdered(js) {
  return typeof js !== 'object' || js === null ? js :
    Array.isArray(js) ?
      Immutable.Seq(js).map(fromJSOrdered).toList() :
      Immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
}
