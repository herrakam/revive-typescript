import React from "react";
import CounterConatiner from "./containers/CounterContainer";
import GithubProfileLoader from "./containers/GithubProfileLoader";

function App() {
  return (
    <>
      <CounterConatiner></CounterConatiner>;
      <GithubProfileLoader></GithubProfileLoader>
    </>
  );
}

export default App;
