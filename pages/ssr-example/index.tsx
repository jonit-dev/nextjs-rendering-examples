import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { IUser } from "../../src/types/user.types";

interface IProps {
  users: IUser[];
}

const UserProfile: NextPage<IProps> = ({ users }) => {
  const onRenderUsers = () => {
    return users.map((user) => (
      <Link
        passHref
        href={`/ssr-example/${user.id}`}
        key={`${user.id}-${user.name}`}
      >
        <a>
          <p>{user.name}</p>
        </a>
      </Link>
    ));
  };

  return (
    <div>
      <h1>Users</h1>
      {onRenderUsers()}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/"
    );

    const users = response.data as IUser[];

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};

export default UserProfile;
