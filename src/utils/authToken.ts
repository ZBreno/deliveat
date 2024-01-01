import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_TOKEN_KEY = 'ue-auth-token';

export async function getAuthToken() {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
  // return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

export async function setAuthToken(token: string) {
  return AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  // return SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

export async function removeAuthToken() {
  return AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  // return SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}