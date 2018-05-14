export function pageTemplate({css, js, data = '', content = ''}) {
    return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">
                    <link rel="stylesheet" href="/assets/${css}"/>
                
                    <title>Server side rendering</title>
                </head>
                <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">${content}</div>
                
                <script type="application/json" id="data">${data.replace(/</g, '&lt;')}</script>
                <script src="/assets/${js}"></script>
                </body>
            </html>`;
}
