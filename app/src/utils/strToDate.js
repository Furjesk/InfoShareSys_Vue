export const strToYMD = (str) => {
    let date = new Date(str)
    let month = date.getMonth() + 1
    let _date = date.getDate()
    if (month < 10)
        month = '0' + (date.getMonth() + 1)
    if (_date < 10)
        _date = '0' + (date.getDate())
    return date.getFullYear() + '-' + month + '-' + _date
}
export const strToYMDHM = (str) => {
    let date = new Date(str)
    let month = date.getMonth() + 1
    let _date = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (month < 10)
        month = '0' + (date.getMonth() + 1)
    if (_date < 10)
        _date = '0' + (date.getDate())
    if (hours < 10)
        hours = '0' + (date.getHours())
    if (minutes < 10)
        minutes = '0' + (date.getMinutes())
    return date.getFullYear() + '-' + month + '-' + _date + ' ' + hours + ":" + minutes
}
export const strToYMDHMS = (str) => {
    let date = new Date(str)
    let month = date.getMonth() + 1
    let _date = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (month < 10)
        month = '0' + (date.getMonth() + 1)
    if (_date < 10)
        _date = '0' + (date.getDate())
    if (hours < 10)
        hours = '0' + (date.getHours())
    if (minutes < 10)
        minutes = '0' + (date.getMinutes())
    if (seconds < 10)
        seconds = '0' + (date.getSeconds())
    return date.getFullYear() + '-' + month + '-' + _date + ' ' + hours + ":" + minutes + ":" + seconds
}