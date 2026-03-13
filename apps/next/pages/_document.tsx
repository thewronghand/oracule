import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { Children } from 'react'
import { AppRegistry } from 'react-native'

import Tamagui from '../tamagui.config'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    AppRegistry.registerComponent('Main', () => Main)
    const page = await ctx.renderPage()

    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')

    /**
     * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
     * So Tamagui styles can override the react-native-web styles.
     */
    const styles = [
      getStyleElement(),
      <style
        key='tamagui-css'
        dangerouslySetInnerHTML={{
          __html: Tamagui.getCSS({
            exclude: process.env.NODE_ENV === 'development' ? null : 'design-system',
          }),
        }}
      />,
    ]

    return { ...page, styles: Children.toArray(styles) }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          {/* 모던 미니멀 폰트: Inter (헤딩 + 본문 통합) */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
