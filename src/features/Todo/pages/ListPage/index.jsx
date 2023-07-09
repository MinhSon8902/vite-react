import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import NotFound from '../../../../components/NotFound';
import DetailPage from '../DetailPage';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
import { useEffect, useMemo, useState } from 'react';
import queryString from 'query-string';

function ListPage() {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [todoList, setTodoList] = useState(initTodoList);
  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilterStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    const newTodoList = [...todoList];
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };
    setTodoList(newTodoList);
  };

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };
    const newTodoList = [...todoList, newTodo];

    setTodoList(newTodoList);
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter(
      (todo) => filterStatus === 'all' || filterStatus === todo.status
    );
  }, [todoList, filterStatus]);

  return (
    <div>
      <h3>Todo Form</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={() => navigate('/todos')}>Show All</button>
        <button onClick={() => navigate('/todos?status=completed')}>
          Show Completed
        </button>
        <button onClick={() => navigate('/todos?status=new')}>Show New</button>
      </div>
      <Outlet />
    </div>
  );
}

function TodoFeature() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/todos/:todoId" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default TodoFeature;
