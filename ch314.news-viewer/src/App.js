import NewsList from "./components/NewsList"

const App = () => {
  return <NewsList />;
};

export default App;

// const App = () => {
//   const [data, setData] = useState(null);
//   // const onClick = () => {
//   //   axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
//   //     setData(response.data);
//   //   });
//   // };

//   const onClick = async () => {
//     try {
//       // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//       const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&apiKey=abfba8f2d88e46b7916e5c5685c9bd34');
//       setData(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       {data && (
//         <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />
//       )}
//     </div>
//   );
// };

// export default App;
