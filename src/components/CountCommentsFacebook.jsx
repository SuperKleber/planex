import React, { useEffect, useRef, useState } from "react";
import { FacebookProvider, CommentsCount } from "react-facebook";

const CountCommentsFacebook = ({ url }) => {
  const [count, setCount] = useState("");

  const countDiv = useRef(null);
  useEffect(() => {
    const handleCount = intentos => {
      if (intentos > 0) {
        setTimeout(() => {
          try {
            let htmlCount = countDiv.current.querySelector(".fb_comments_count")
              .textContent;
            setCount(`${htmlCount} `);
            console.log("Conteo de comentarios correcto");
          } catch (error) {
            console.warn("intento de conteo de comentarios fallido");
            handleCount(intentos - 1);
          }
        }, 1000);
      } else {
        setCount("");
      }
    };
    handleCount(5);
  }, []);
  return (
    <>
      <div ref={countDiv} hidden style={{ display: "none" }}>
        <FacebookProvider language="es_LA" appId="2503959843259543">
          <CommentsCount href={url} />
        </FacebookProvider>
      </div>
      {count} Condolencias
    </>
  );
};

export default CountCommentsFacebook;
