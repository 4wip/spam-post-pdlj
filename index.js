const puppeteer = require('puppeteer');
const { randomBytes } = require('crypto');

(async () => {
    const proc = await puppeteer.launch({ headless: false });
    const page = await proc.newPage();
    await page.goto('https://pays-de-la-justice.ovh/post', { waitUntil: 'networkidle2' });

    await page.waitForSelector('input[name="title"]');
    await page.waitForSelector('textarea[name="content"]');

    while (true) {
        const titre = randomBytes(5).toString('hex');
        const contenue = randomBytes(1).toString('hex');

        await page.type('input[name="title"]', titre);
        await page.type('textarea[name="content"]', contenue);

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);

        await page.goto('https://pays-de-la-justice.ovh/post', { waitUntil: 'networkidle2' });
    }
})();
