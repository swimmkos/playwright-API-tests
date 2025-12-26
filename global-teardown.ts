import { request, expect } from "@playwright/test"

async function globalTeardown() {

    const requestContext = await request.newContext()

    const deleteArticleResponse = await requestContext.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`, {
        headers: {
                Authorization: `Token ${process.env.ACCESS_TOKEN}`
            }
    })
    expect(deleteArticleResponse.status()).toEqual(204)
}

export default globalTeardown;