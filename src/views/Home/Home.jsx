import "./styles.scss";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { DefaultLayout } from "../../layouts";
import { CardPost } from "../../components";
import Api from "../../utils/Api";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setpost] = useState([]);
  const handleSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await Api.get("post");
      setpost(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <DefaultLayout>
      <div className="home-view">
        <div className="post-container">
          {isLoading
            ? handleSkeleton.map((_, key) => {
                return (
                  <Skeleton
                    key={`${key}-skeleton-card`}
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                );
              })
            : posts.map((data) => {
                return <CardPost data={data} key={data.id} />;
              })}
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Home;
