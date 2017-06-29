const util = require('util'),
    fs = require('fs'),
    writeFile = util.promisify(fs.writeFile),
    request = require('superagent'),
    stat = util.promisify(fs.stat),
    sorts = require('sorts'),
    log = console.log;

const getPhotosAndSaveThem = async function(){
    const response = await request.get('https://jsonplaceholder.typicode.com/photos');
    const photos = response.body.sort(sorts.byKey('albumId').toString())
    await writeFile('photos.json', JSON.stringify(photos, null, 2))
    const status = await stat('photos.json');
    log(`I got some data from an API and saved the responses at ${status.birthtime}`)
}

const start = async function(){
    try {
        await getPhotosAndSaveThem();
    } catch (error) {
        log(`Oh no, something went wrong!`, error);
    }
}

start();
