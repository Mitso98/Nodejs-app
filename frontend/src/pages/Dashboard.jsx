import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { goals, message, isError, isLoading } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    // restrain the access to dashboard for users only
    if (!user) {
      navigate("/login");
      toast.error("Please login or register new account");
    } else {
      //fetch goals from backend
      dispatch(getGoals());
    }

    // when component unmount (when we leave the page)
    return () => {
      dispatch(reset());
    };
  }, [navigate, user, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem goal={goal} key={goal._id} />
            ))}
          </div>
        ) : (
          <h3>You have not set goals!</h3>
        )}
      </section>
    </>
  );
};
export default Dashboard;
