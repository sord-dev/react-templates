import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    if (req.method != 'GET') return res.status(404).json({ error: 'not found' });
    const { componentId } = req.query;
    const componentURL = `http://localhost:3000/preview/ss/${componentId}`;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(componentURL);

        setTimeout(async () => {
            const screenshot = await page.screenshot({ fullPage: true, type: 'png' });

            await browser.close();

            res.setHeader('Content-Type', 'image/png');
            res.status(200).send(screenshot);
        }, 1000)
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        res.status(500).json({ error: 'Error capturing screenshot' });
    }
}
