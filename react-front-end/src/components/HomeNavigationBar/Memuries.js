import react, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Memuries.scss";
import NewMemury from "./NewMemury";

export default function Memuries(props) {
  const [memuries, setMemuries] = useState([]);
  const [render, setRender] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  useEffect(() => {
    axios.get(`/api/home/memuries`).then((response) => {
      setMemuries(response.data);
      console.log("MEMURIES", response.data);
    });
  }, [render]);

  const renderMemuries = (memuries) => {
    return memuries.reverse().map((mem, index) => {
      return (
        <div key={index} className="memury-unit" onClick={() => setFullScreenImage(index)}>
          <img name={mem.name} src={mem.photo} alt={index} />
        </div>
      );
    });
  };


  return (
    <div className="memuries-component">
      <section className="memuries__top">
        <NewMemury render={render} setRender={() => setRender(!render)} />
        <h1 className="mem-text"> Keep going!</h1>
      </section>
      {fullScreenImage !== null && <img className="full-screen-image" src={memuries[fullScreenImage].photo} onClick={() => setFullScreenImage(null)} />}
      <section className="memuries__bottom">
        {renderMemuries(memuries)}
      </section>
      <br />
      <h3 className="mem-text">You've dug to the bottom. Woof.</h3>
    </div>
  );
}
