const {test, expect} = require("@playwright/test");
const { request } = require("node:http");
const { title } = require("node:process");
const testData = require('../test-data/postData.json');

test ('GET /posts/1 returns a valid post', async ({request}) => {
    const response = await request.get(
        '/posts/1'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');


})

test ('POST /posts/ adds a post', async({request}) => {
    const payload = testData.newPost;

    const response = await request.post('/posts', {
        data: payload,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8 ',
        }
    })

    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log(body);

    // expect(body).toMatchObject({
    //     title: 'API test',
    //     body: 'This is an api test with playwright',
    //     userId: '1',
    //     id: 101
    // })

    expect(body.title).toBe(payload.title);


    })

test ('POST invalid data should fail', async({request}) => {
    const payload = testData.invalidPost;

    const response = await request.post('/posts', {
        data: payload,
        headers: {
            'Content-Type': 'application/json; charset=UTR-8',
        }
    })

    expect(response.status()).not.toBe(201)

    // const body = await response.json();

    // expect(body.title).toMatch(payload.title);
})