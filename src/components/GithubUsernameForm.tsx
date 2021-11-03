import React, { useState } from "react";
import "./GithubUsernameForm.css";

type GithubUsernameProps = {
  onSubmitUsername: (username: string) => void;
};

function GithubUsernameForm({ onSubmitUsername }: GithubUsernameProps) {
  const [input, setInput] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitUsername(input);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="GithubUsernameForm">
      <input
        onChange={onChange}
        value={input}
        placeholder="깃헙 계정 명 입력"
      ></input>
      <button type="submit">조회</button>
    </form>
  );
}

export default GithubUsernameForm;
