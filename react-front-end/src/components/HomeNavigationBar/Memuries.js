import react, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Memuries.scss";
import NewMemury from "./NewMemury";

export default function Memuries(props) {
  const [memuries, setMemuries] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios.get(`/api/home/memuries`).then((response) => {
      setMemuries(response.data);
      console.log("MEMURIES", response.data);
    });
  }, [render]);

  const renderMemuries = (memuries) => {
    return memuries.reverse().map((mem, index) => {
      return (
        <div key={index} className="memury-container">
          <h3>{mem.name}</h3>
          <img src={mem.photo} alt="" />
        </div>
      );
    });
  };


  return (
    <div className="memuries-component">
      <section className="memuries__top">
        <NewMemury render={render} setRender={() => setRender(!render)} />
      </section>
      <section className="memuries__bottom">
        <h1 className="mem-text">Your pups memuries!</h1>
        {renderMemuries(memuries)}
      </section>
    </div>
  );
}
