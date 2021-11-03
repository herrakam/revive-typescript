import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GithubProfileInfo from "../components/GithubProfileInfo";
import GithubUsernameForm from "../components/GithubUsernameForm";
import { RootState } from "../modules";
import { getUserProfileAsync } from "../modules/post";

function GithubProfileLoader() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.post.userProfile
  );
  const dispatch = useDispatch();

  const onSubmitUsername = (username: string) => {
    dispatch(getUserProfileAsync(username));
  };

  return (
    <>
      <GithubUsernameForm
        onSubmitUsername={onSubmitUsername}
      ></GithubUsernameForm>
      {loading && <p style={{ textAlign: "center" }}>로딩중</p>}
      {error && <p style={{ textAlign: "center" }}>에러</p>}
      {data && (
        <GithubProfileInfo
          bio={data.bio}
          name={data.name}
          blog={data.blog}
          thumbnail={data.avatar_url}
        ></GithubProfileInfo>
      )}
    </>
  );
}

export default GithubProfileLoader;
