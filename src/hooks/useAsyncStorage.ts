import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorage<T>(
  key: string,
  initialValue?: T
): [T, (value: T | ((value: T) => T)) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(syncValue, []);

  function syncValue() {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value === null) {
          return initialValue;
        }
        return JSON.parse(value) satisfies T as T;
      })
      .then(setStoredValue);
  }

  async function setValue(value: T | ((value: T) => T)) {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    return AsyncStorage.setItem(key, JSON.stringify(valueToStore)).finally(
      () => {
        syncValue();
      }
    );
  }

  return [storedValue, setValue];
}
