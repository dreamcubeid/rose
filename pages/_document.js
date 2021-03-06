/* library package */
import 
  Document, 
  { Html, Main } 
from 'next/document'
/* library template */
import { DeferredNextScript } from 'lib/DeferredNextScript'
/* components */
import { CriticalCssHead } from 'components/CriticalCssHead'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const language = ctx.query.lng
    return { ...initialProps, language }
  }

	render() {
		return (
			<Html lang={this.props.language}>
        <CriticalCssHead />
				<body>
					<Main />
          <DeferredNextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument