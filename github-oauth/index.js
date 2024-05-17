const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = 3000;

const clientID = 'Ov23liDmlYykrWIWsdFO';
const clientSecret = '4b5abb962e916ca7af8ab3eddbd0cbd4e8d50c22';
const redirectURI = 'https://lango-assign1.onrender.com/github/callback';

app.get('/', (req, res) => {
    res.send('<a href="/login/github">Login with GitHub</a>');
});

app.get('/login/github', (req, res) => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    res.redirect(githubAuthURL);
});

app.get('/github/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', querystring.stringify({
            client_id: clientID,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectURI
        }), {
            headers: {
                'Accept': 'application/json'
            }
        });

        const accessToken = response.data.access_token;
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${accessToken}`
            }
        });

        res.send(`<h1>Hello, ${userResponse.data.login}!</h1>`);
    } catch (error) {
        res.send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
