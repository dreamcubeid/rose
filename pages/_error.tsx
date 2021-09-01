import { NextPage } from "next";
import Error from "next/error";
interface Props {
  statusCode?: any;
}
const Page: NextPage<Props> = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};
Page.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default Page;