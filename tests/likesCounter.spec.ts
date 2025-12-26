import {test, expect, request} from '@playwright/test'

test('Like counter increase', async({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Global Feed').click()
    const fristLikeButton = page.locator('app-article-preview').first().locator('button')
    await expect(fristLikeButton).toContainText('0')
    await fristLikeButton.click()
    await expect(fristLikeButton).toContainText('1')
})
