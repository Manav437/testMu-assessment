const { test, expect } = require("@playwright/test");

test("TC1: search iPhone -> add to cart -> print price", async ({ page }) => {
    console.log("TEST CASE 1: iPhone");

    console.log("Navigating to amazon.com\n");
    await page.goto("https://www.amazon.com", {
        waitUntil: "domcontentloaded",
    });

    console.log("searching for iPhone\n");
    const searchBox = page.locator("#twotabsearchtextbox");
    await searchBox.fill("iPhone");
    await searchBox.press("Enter");
    await page.waitForLoadState("domcontentloaded");

    console.log("clicking first iPhone result\n");
    const firstResult = page
        .locator('[data-component-type="s-search-result"] a.a-link-normal')
        .filter({ hasText: /\w+/ })
        .first();
    await firstResult.waitFor({ state: "visible" });

    const productTitle = await firstResult.innerText();
    console.log(`Product : ${productTitle.trim()}\n`);

    await firstResult.click();
    await page.waitForLoadState("domcontentloaded");

    console.log("Extracting price...\n");
    let price = null;

    const priceSelectors = [
        ".a-price .a-offscreen",
        "#priceblock_ourprice",
        "#priceblock_dealprice",
        ".a-price-whole",
        "#corePrice_feature_div .a-offscreen",
        ".priceToPay .a-offscreen",
    ];

    for (const selector of priceSelectors) {
        try {
            const el = page.locator(selector).first();
            const visible = await el.isVisible({ timeout: 2000 });
            if (visible) {
                price = await el.innerText();
                if (price) break;
            }
        } catch {
            continue;
        }
    }

    if (!price) {
        console.warn("Could not detect exact price\n");
        price = "N/A";
    }

    console.log(`iPhone price : ${price}\n`);

    console.log("adding to cart\n");
    const addToCartBtn = page
        .locator("#add-to-cart-button, #buy-now-button")
        .first();

    try {
        await addToCartBtn.waitFor({ state: "visible", timeout: 10000 });
        await addToCartBtn.click();
        await page.waitForTimeout(2000);
        console.log("added iPhone to cart!\n");
    } catch {
        console.warn("Add to Cart button not found");
    }
});
