import React from "react";
import "./GithubProfileInfo.css";

type GithubProfileInfoProps = {
  name: string;
  thumbnail: string;
  bio: string; // 자기소개 text
  blog: string;
};

function GithubProfileInfo({
  name,
  thumbnail,
  bio,
  blog,
}: GithubProfileInfoProps) {
  return (
    <div className="GithubProfileInfo">
      <div className="profile-head">
        <img src={thumbnail} alt="user Thumbnail"></img>
        <div className="name">{name}</div>
      </div>
      <p>{bio}</p>
      <div>{blog !== "" && <a href={blog}>블로그</a>}</div>
    </div>
  );
}
export default GithubProfileInfo;
