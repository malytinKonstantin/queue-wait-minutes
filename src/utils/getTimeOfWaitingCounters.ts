 export const isValidArray = <T>(arr: T[]): boolean => {
    return Array.isArray(arr) && arr.length !== 0 
 }

 export const isValidNumber = (num: number): boolean => {
    return typeof num === 'number' && num !== 0
 }

 export const getIndexOfMinElement = (arr: number[]): number => {
    const min = Math.min(...arr)
    const comparator = (el: number): boolean => el === min
    const index = arr.findIndex(comparator)
    return index
 }
 
 export type MinMaxResult = {
    min: number
    max: number
 }


/**
    подсчет минимального и максимального времени ожидания очереди на кассе
    при оптимальном распределении
 */
 export function getTimeOfWaitingCounters(
        queueWaitMinutes: number[], 
        counters: number,
    ): MinMaxResult | null {

    if (
        !isValidArray<number>(queueWaitMinutes) ||
        !isValidNumber(counters)
    ) {
        return null
    }

    let freeCounters = counters
    const countersTime = []
    let minTimeWaiting = 0
    let maxTimeWaiting = 0

    const updateWaitingTime = (): void => {
        minTimeWaiting = Math.min(...countersTime)
        maxTimeWaiting = Math.max(...countersTime)
    }

    queueWaitMinutes.forEach((minutes) => {
        if (freeCounters !== 0) {
            countersTime.push(minutes)
            freeCounters--
            updateWaitingTime()
            return
        }        

        const indexOfMinElement = getIndexOfMinElement(countersTime)
        countersTime[indexOfMinElement] += minutes
        updateWaitingTime()
    })

    return {
        min: minTimeWaiting,
        max: maxTimeWaiting,
    }
 }
