import { getTimeOfWaitingCounters } from './index'

it('test getTimeOfWaitingCounters', () => {

    expect(getTimeOfWaitingCounters())
    expect(getTimeOfWaitingCounters([], 0)).toBeNull()
    expect(getTimeOfWaitingCounters([1,2])).toBeNull()

    expect(getTimeOfWaitingCounters([1,2,3,4,5], 5)).toEqual({ min: 1, max: 5 })

    expect(getTimeOfWaitingCounters([1,2,3,4,5,6,7,8,9,10], 5)).toEqual({ min: 7, max: 15 })

    expect(getTimeOfWaitingCounters([1,1,1,1,1,1,1,1,1,1,1], 3)).toEqual({ min: 3, max: 4 })
})