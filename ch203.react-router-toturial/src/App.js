import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
// import ErrorPage from "./pages/ErrrorPage";
import NotFound from "./pages/NotFound";
import Root from "./pages/Root";

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Root />}
        // errorElement={<ErrorPage />} // 결론은 이렇게 tutorial 처럼 나올 수 없다는 것.
      >
      </Route>
      <Route path="/contacts/:contactId" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
