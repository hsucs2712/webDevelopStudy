// import { useEffect, useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

// export async function getStaticProps() {
//   const response = await fetch("http://localhost:8080/students");
//   const data = await response.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function Profile({ data }) {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const myFunction = async () => {
  //     let response = await fetch("http://localhost:8080/students");
  //     let data = await response.json();
  //     setData(data);
  //   };
  //   myFunction();
  // }, []);

  return (
    <div>
      {/* {data &&
        data.map((d) => {
          return <p>{d.name + " " + d.id}</p>;
        })} */}
      {data &&
        data.map((d) => {
          return (
            <Link style={{ padding: "2rem" }} href={`/profile/${d.id}`}>
              {d.name}
            </Link>
          );
        })}
    </div>
  );
}
