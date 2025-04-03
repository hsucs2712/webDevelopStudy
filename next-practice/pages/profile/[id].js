export async function getStaticPaths() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();

  // 這裡的paths一定要符合Next.js要求的格式
  // getStaticPaths()一定要return 一個有paths屬性的物件
  // paths一定需要是一個array of objects
  // 內部每個object都需要有id的屬性
  // 每個id都會被用來製作相對應的頁面
  const paths = data.map((d) => {
    return {
      params: {
        id: d.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:8080/students/${params.id}`);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

// export async function getServerSideProps({ params }) {
//   const response = await fetch(`http://localhost:8080/students/${params.id}`);
//   const data = await response.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function StudentProfile({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.age}</h1>
      <h1>{data.id}</h1>
      <h1>{data.scholarship.merit}</h1>
      <h1>{data.scholarship.other}</h1>
    </div>
  );
}
