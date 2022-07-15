import hongan4d from '@/utils/hongan4d'

export function getToken() {
  return hongan4d.storageGet('token')
}

export function setToken(token) {
  return hongan4d.storageSet({ token })
}

export function removeToken() {
  return hongan4d.storageRemove('token')
}

export function getLock() {
  return hongan4d.storageGet('lock')
}

export function setLock(lock) {
  return hongan4d.storageSet({ lock })
}
export function removeLock() {
  return hongan4d.storageRemove('lock')
}