

console.log(`Started the extension`)
let points = fetchDirtyRanges(document.URL)["uglyVideoRanges"]
//let vids = document.getElementsByTagName("video")[0]
let vids = document.querySelector("video")
console.log(`vids --> ${JSON.stringify(vids)}`)
let video = vids[0]

video.addEventListener('timeupdate', () => {
    let currtime = video.currentTime
    let nextCleanPoint = getNextCleanPoint(currtime, points)
    if (nextCleanPoint != currtime) {
        video.currentTime = nextCleanPoint
    }
})

function fetchDirtyRanges(videoUrl) {
    console.log(`fetching ranges for url: ${videoUrl}`)
    let ranges = {
        uglyVideoRanges: [
            {start: 15, end: 30},
            {start: 55, end: 80},
            {start: 115, end: 170},
            ],
        uglyAudioRanges: [
            {start: 15, end: 30},
            {start: 55, end: 80},
            {start: 115, end: 170},
            ],
        adRanges: [
            {start: 15, end: 30},
            {start: 55, end: 80},
            {start: 115, end: 170},
            ]
    }
    console.log(`ranges: ${ranges}`)
    return ranges
}

function getNextCleanPoint(currentTime, uglyRanges) {
    for (let uglyRange in uglyRanges) {
        if (currentTime >= uglyRange.start && currentTime <= uglyRange.end) {
            return uglyRange.end
        }
    }
    return currentTime
}

