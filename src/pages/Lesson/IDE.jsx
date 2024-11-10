import { useState, useEffect } from 'react';
import './styles/IDE.css';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function IDE({ languageID }) {
    const [width, setWidth] = useState(window.innerWidth);
    let sandpackElement = (
        <Sandpack
            template="react"
            theme="light"
            options={{
                showNavigator: true,
                showLineNumbers: true,
                showInlineErrors: true,
                autoReload: true,
                wrapContent: true,
                resizablePanels: true,
                editorHeight:
                    width > 768
                        ? 'calc(100vh - 149px)'
                        : 'calc((100vh - 149px)/2)',
            }}
        />
    );

    if (languageID === 'html/css') {
        sandpackElement = (
            <Sandpack
                template="static"
                theme="light"
                files={{
                    '/index.html': {
                        code: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>
    <body>
        <!-- Enter your code here -->
    </body>
</html>
                        `,
                    },
                    '/style.css': {
                        code: ``,
                    },
                }}
                options={{
                    showNavigator: true,
                    showLineNumbers: true,
                    showInlineErrors: true,
                    autoReload: true,
                    wrapContent: true,
                    resizablePanels: true,
                    editorHeight:
                        width > 768
                            ? 'calc(100vh - 149px)'
                            : 'calc((100vh - 149px)/2)',
                }}
            />
        );
    }

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));

        return () =>
            window.removeEventListener('resize', () =>
                setWidth(window.innerWidth)
            );
    }, []);

    return languageID === 'html/css' || languageID === 'react' ? (
        sandpackElement
    ) : (
        <div className="ide-container">
            <iframe
                src={`https://www.jdoodle.com/embed/v1/${languageID}`}
                className="ide"
                width="100%"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}
