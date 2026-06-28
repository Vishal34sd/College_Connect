import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTaskById } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await fetchTaskById(id);
        setTask(data.data);
      } catch (error) {
        toast.error("Failed to load task details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    getTask();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TaskForm initialData={task} />
    </div>
  );
};

export default EditTaskPage;
