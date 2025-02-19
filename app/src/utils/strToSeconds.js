export const strToSeconds = (watchLocation) => {
    let arr = watchLocation.split(':')
    let seconds = 0
    if(arr[0] != 0) 
        seconds += parseInt(arr[0])*60*60
    if(arr[1] != 0) 
        seconds += parseInt(arr[1])*60
    if(arr[2] != 0) 
        seconds += parseInt(arr[2])
    return seconds
}