import axios from "axios";
import puppeteer from "puppeteer";

export const getItems = async (req, res) => {
	const { url } = req.query;
	try {
		const browser = await puppeteer.launch({ headless: "new" });

		const page = await browser.newPage();
		await page.setGeolocation({ latitude: 55.822645, longitude: 49.06864 });
		await page.goto(url);

		await page.waitForSelector(".slider-color");

		const extractedLinks = await page.evaluate(() => {
			const links = [];
			const linkElements = document.querySelectorAll(
				".slider-color a.img-plug"
			);

			linkElements.forEach((element) => {
				console.log(element);
				links.push(element.href.match(/\d+/)[0]);
			});
			return links;
		});

		await browser.close();

		var config = {
			method: "get",
			url: `https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-2133463&spp=27&nm=${extractedLinks.reduce(
				(acc, item) => (acc += item + ";")
			)}`,
			headers: {},
		};

		const responseApi = await axios(config)
			.then(function (response) {
				const { products } = response.data.data;
				const newArr = [];

				products.map((item, i) => {
					const tempObg = {};
					tempObg["name"] = item.name;
					tempObg["color"] = item.colors.map((color) => color.name);
					tempObg["art"] = item.id;
					tempObg["stock"] = item.sizes.map((size) => {
						let stock =
							size.stocks.length > 0
								? size.stocks.reduce((acc, el) => acc + +el.qty, 0)
								: 0;
						return {
							[size.origName]: stock,
						};
					});
					newArr.push(tempObg);
				});
				return newArr;
			})
			.catch(function (error) {
				console.log(error);
			});
		res.status(200).json({
			responseApi,
		});
	} catch (err) {
		res.status(401).json({
			message: err.name,
		});
	}
};
