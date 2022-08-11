const Storage = {
  get: function (key) {
    let val = localStorage.getItem(key)
    val = val && JSON.parse(val)
    return val
  },
  set: function (key, value) {
    value && localStorage.setItem(key, JSON.stringify(value))
  },
  remove: function (key) {
    localStorage.removeItem(key)
  },
  clear: function () {
    localStorage.clear()
  },
}
export default Storage

export const Session = {
  get: function (key) {
    let val = sessionStorage.getItem(key)
    val = val && JSON.parse(val)
    return val
  },
  set: function (key, value) {
    value && sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove: function (key) {
    sessionStorage.removeItem(key)
  },
  clear: function () {
    sessionStorage.clear()
  },
}
