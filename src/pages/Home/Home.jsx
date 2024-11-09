import React from "react";
import MainDisplay from "./MainDisplay";
import Navbar from "./Navbar";
import setBackgroundColor from "../../utils/setBackgroundColor";
import "./styles/Home.css";

function Home() {
  const [page, setPage] = React.useState(0);

  return (
    <div className="home">
      <Navbar page={page} changePage={(index) => setPage(index)} />
      <MainDisplay page={page} />
    </div>
  );
}

export default Home;
