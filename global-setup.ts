import { request, expect, FullConfig } from "@playwright/test"
import user from '../pw-apitest-app/.auth/user.json'
import fs from 'fs'

async function globalSetup(config: FullConfig) {

    const authFile = '.auth/user.json'
    const requestContext = await request.newContext()
    
    const responseToken =  await requestContext.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data:{
            "user": {
                "email": "api_pwtest2025@test.com",
                "password": "api_pwtest2025O"
            }
        }
    })
    
    const responseBody = await responseToken.json()
    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken

    const articleReponse = await requestContext.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: {
                "article": {
                "title": "Global Test API article",
                "description": "Test API subject",
                "body": "Test description",
                "tagList": []
                }
            },
            headers: {
                Authorization: `Token ${process.env.ACCESS_TOKEN}`
            }
        })
    
        expect(articleReponse.status()).toEqual(201)
        const response = await articleReponse.json()
        const slugId = response.article.slug
        process.env['SLUGID'] = slugId
}

export default globalSetup;