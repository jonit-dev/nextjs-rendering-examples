import { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { IPost } from "../../src/types/post.types";

const Posts: NextPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const { data, error } = useSWR("https://jsonplaceholder.typicode.com/posts");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  if (!posts) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const onRenderPosts = () =>
    posts.map((post) => <li key={`${post.id}`}>{post.title}</li>);

  return (
    <>
      <h1>Posts</h1>
      {onRenderPosts()}
    </>
  );
};

export default Posts;
