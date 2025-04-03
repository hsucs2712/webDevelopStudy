// 名稱一定是getStaticProps()
export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();

  // getStaticProps()一定要return一個物件
  // 物件內的屬性一定需要叫做props
  // props屬性會自動被Next.js使用
  //  props屬性會變成下面function的參數
  return {
    props: {
      data,
    },
  };
}

export default function StaticGenerationPage({ data }) {
  return (
    <div>
      {data.map((d) => {
        return <h1>{d.name}</h1>;
      })}
    </div>
  );
}
