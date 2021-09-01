import { NextPage } from "next";
import { useI18n } from "@sirclo/nexus";
import { parseCookies } from 'lib/parseCookies';
import Error from 'components/Error';

interface Props {
  statusCode?: any
}

const Index: NextPage<Props> = ({
  statusCode
}) => {
  const i18n: any = useI18n();

  if (statusCode) {
    return <Error i18n={i18n} />
  }

  return <></>
}

export const getServerSideProps = async ({
  req,
  res,
  params
}: any) => {
  const allowedUri: Array<string> = [
    'en',
    'id',
    'graphql',
    'favicon.ico',
    'manifest',
    'sitemap.xml'
  ];

  const cookies = parseCookies(req);
  const lng = cookies.ACTIVE_LNG || "id";
  const location = `/${lng}` + req.url;

  if (allowedUri.indexOf(params.param) == -1) {
    if (
      res &&
      typeof res.writeHead === "function" &&
      typeof res.end === "function"
    ) {
      if (
        params.param &&
        ( params.param.includes("id") || params.param.includes("en") )
      ) {
        const statusCode = '404';
        return {
          props: { statusCode }
        }
      }

      res.writeHead(307, {
        Location: location
      });
    }

    res.end();
  }

  return {
    props: { }
  }
}

export default Index;