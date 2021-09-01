import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
	Article,
	ArticleCategories,
	useI18n
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import SEO from "components/SEO";
import Placeholder from "components/Placeholder";
import { useBrand } from "lib/useBrand";
import styles from "public/scss/pages/Article.module.scss";

const classesPlaceholderArticle = {
	placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_article}`,
}

const classesArticleCategories = {
	articleCategoriesContainerClass: styles.article_categories,
	categoryTitleClass: styles.article_categories_title,
	articleCategoriesUlClass: styles.article_categoriesOrder,
	articleCategoriesLiClass: styles.article_categoriesOrder_list,
}

const ArticleDetail: FC<any> = ({
	lng,
	lngDict,
	slug,
	brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const i18n: any = useI18n();

	const [title, setTitle] = useState<string>("");

	return (
		<Layout
			i18n={i18n}
			lng={lng}
			lngDict={lngDict}
			brand={brand}
		>
			<SEO title={title} />
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-9">
							<h3 className={styles.article_title}>{title}</h3>
							<Article
								containerClassName={styles.article}
								slug={slug as string}
								getTitle={setTitle}
								loadingComponent={
									<Placeholder classes={classesPlaceholderArticle} withImage />
								}
							/>
						</div>
						<div className="col-12 col-md-3">
							<ArticleCategories
								classes={classesArticleCategories}
							/>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
	const { default: lngDict = {} } = await import(
		`locales/${params.lng}.json`
	);

	const brand = await useBrand(req);

	return {
		props: {
			lng: params.lng,
			lngDict,
			slug: params.slug,
			brand: brand || ""
		}
	};
}

export default ArticleDetail;
