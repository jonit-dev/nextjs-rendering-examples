import fs from "fs/promises";
import { NextPage } from "next";
import path from "path";

export interface IProduct {
  id: string;
  title: string;
}

interface IProps {
  products: IProduct[];
}

const HomePage: NextPage<IProps> = ({ products }) => {
  const onRenderProductList = () =>
    products.map((product) => <li key={product.id}>{product.title}</li>);

  return (
    <div>
      <ul>{onRenderProductList()}</ul>
    </div>
  );
};
export default HomePage;

export const getStaticProps = async (ctx) => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData as unknown as string);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data", // just example, this route does not exist!
      },
    };
  }

  if (!data.products.length) {
    return { notFound: true }; // this page will return 404 if not found
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 60, // revalidate every 60 seconds
  };
};
