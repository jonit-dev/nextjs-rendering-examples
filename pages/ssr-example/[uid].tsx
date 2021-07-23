import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

import { IUser } from "../../src/types/user.types";

interface IProps {
  user: IUser;
}

const IndividualUser: NextPage<IProps> = ({ user }) => {
  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.address.street}</p>
      <p>{user.company.name}</p>
    </>
  );
};

export default IndividualUser;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { uid } = ctx.params;

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${uid}`
    );

    const user = response.data as IUser;

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
