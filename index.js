const puppeteer = require('puppeteer')
const fs = require('fs')
//  check push

const writeStream = fs.createWriteStream('image-link.txt', 'utf-8')
const baseUrl = 'https://jadinikah.co/'

puppeteer.launch().then(async (browser) => {
    const page = await browser.newPage()
    await page.goto(baseUrl)

    console.log("page has been loaded!")

    const imgSource = await page.evaluate(() => {
        const srcs = Array.from(document.querySelectorAll("img")).map((image) => {
            const baseUrl = 'https://jadinikah.co/'

            const src = image.getAttribute('src')
            const newBaseUrl = baseUrl.replace(/\/$/, '')

            let link = ''

            if (src.startsWith('https://')) {
                link = src
            } else {
                link = `${newBaseUrl}${src}`
            }

            return link
        })

        return srcs
    })

    writeStream.write(imgSource.join('\n'))

    await browser.close()
}).catch((err) => {
    console.log(err)
})