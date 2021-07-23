import fs from "fs/promises";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import path from "path";

interface IProps {
  title: string;
  description: string;
}

const IndividualProduct: NextPage<IProps> = ({ title, description }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData as unknown as string);

  const paths = data.products.map((product) => {
    return {
      params: {
        pid: product.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData as unknown as string);

  const { pid } = ctx.params;

  const product = data.products.find((product) => product.id === pid);

  if (!product) {
    return { notFound: true }; // this page will return 404 if not found
  }

  return {
    props: {
      title: product.title,
      description: product.description,
    },
    revalidate: 60,
  };
};

export default IndividualProduct;
