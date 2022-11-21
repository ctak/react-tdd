import { NavLink, Outlet } from "react-router-dom"

const Articles = () => {
  return (
    <div>
      <Outlet />
      <ul>
        <ActiveItem id={1} />
        <ActiveItem id={2} />
        <ActiveItem id={3} />
      </ul>
    </div>
  );
};

const ActiveItem = ({ id }) => {
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };
  return (
    <li>
      <NavLink 
        to={`/articles/${id}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        게시글 {id}
      </NavLink>
    </li>    
  );
};

export default Articles;
