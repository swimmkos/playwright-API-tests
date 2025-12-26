import {test as setup, expect} from '@playwright/test'

setup('create new article', async ({request}) => {
    const articleReponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": {
            "title": "Test new API article",
            "description": "Test new API subject",
            "body": "Test description",
            "tagList": []
            }
        }
    })

    expect(articleReponse.status()).toEqual(201)
    const response = await articleReponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
})