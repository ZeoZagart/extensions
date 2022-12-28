console.log(`Started the extension`)

startModifier()
.then(result => console.error(`Started modifier result => ${JSON.stringify(result)}`))
.catch(err => console.error(`Error starting modifier => ${JSON.stringify(err)}`))

async function startModifier() {
    let video = await awaitVideo()
    let points = fetchDirtyRanges(document.URL).uglyVideoRanges
    registerSkipper(video, points)
}

function registerSkipper(video, points) {
    video.addEventListener('timeupdate', () => {
        let currtime = video.currentTime
        let nextCleanPoint = getNextCleanPoint(currtime, points)
        console.log(`currTime: ${currtime} | nextPoint: ${nextCleanPoint}`)
        if (nextCleanPoint != currtime) {
            video.currentTime = nextCleanPoint
        }
    })
}

async function awaitVideo() {
    let videos = undefined
    let video = undefined
    let counter = 0
    while (counter < 5) {
        videos = document.getElementsByTagName("video")
        video = videos[0]
        if (video == null) {
            console.error(`video not found --> ${JSON.stringify(videos)}`)
            counter += 1
            await sleep(1000)
        } else {
            console.log(`video --> ${JSON.stringify(video)}`)
            break
        }
    }
    return video
}

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
    console.log(`ranges: ${JSON.stringify(ranges)}`)
    return ranges
}

function getNextCleanPoint(currentTime, uglyRanges) {
    for (let uglyRange of uglyRanges) {
        if (currentTime >= uglyRange.start && currentTime <= uglyRange.end) {
            return uglyRange.end
        }
    }
    return currentTime
}

function sleep(timeInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeInMs));
}