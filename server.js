const http = require('http');
const { readFile } = require('fs/promises');
const React = require('react');
const { renderToString } = require('react-dom/server');

const createApp = require('./app');
const mofafegoli = require('./mofafegoli');

async function send(response, path) {
    try {
        const content = await readFile(path, 'utf8');
        response.end(content);
    } catch (exception) {
        console.error(exception);
    }
}

async function sendIndex(response) {
    try {
        let content = await readFile('index.html', 'utf8');

        var APP_HTML = renderToString(React.createElement(createApp(React), mofafegoli));

        content = content.replace('<div id="root"></div>', `<div id="root">${APP_HTML}</div>`);
        response.end(content);
    } catch (exception) {
        console.error(exception);
    }
}

function onConnect(request, response) {
    const url = request.url.slice(1);

    switch (url) {
        // Server Side Rendering.
        case 'index.html':
        case '':
            sendIndex(response);
            break;

        default:
            send(response, url);
            break;
    }
}

const server = http.createServer(onConnect);
server.listen(3000);
