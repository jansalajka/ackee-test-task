import type { AppType } from 'next/app';
import Document, { Head, Html, Main, NextScript, type DocumentContext, type DocumentProps } from 'next/document';

import type { ExtendedAppProps } from './_app';

interface MyDocumentProps extends DocumentProps {}

function MyDocument({}: MyDocumentProps) {
    return (
        <Html lang='en'>
            <Head>
                <meta name='theme-color' content='#000' />
                <link rel='icon' type='image/svg+xml' href='/ackee.svg' />
                <link rel='shortcut icon' href='/ackee.svg' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                <link
                    href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
                    rel='stylesheet'
                />
                <style>{`
                    html, body {
                        font-family: 'Roboto', sans-serif;
                    }
                `}</style>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & ExtendedAppProps>) =>
                function EnhanceApp(props) {
                    return <App {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
    };
};

export default MyDocument;
