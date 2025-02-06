import { useEffect, useReducer, useState } from "react";
import MOCK_WS_URL from "../../mock-websocket-server";
import { useWebSocket } from "../hooks/webSocket";
import TextInput from "../components/form-inputs/text-input";
import ActivityDisplay from "../components/activity-display";
import Button from "../components/button";

type Activity = {
  text: string;
  timestamp: string;
};

const activityReducer = (
  state: Activity[],
  action: { type: string; payload?: Activity }
) => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return action.payload ? [action.payload, ...state] : state;
    default:
      return state;
  }
};

const ActivityTracker = () => {
  const [activities, dispatch] = useReducer(activityReducer, []);
  const [search, setSearch] = useState("");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const [paginationLimit, setPaginationLimit] = useState(15);
  const { connectionError } = useWebSocket(MOCK_WS_URL, dispatch, retryCount);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredActivities(
        activities.filter((a) =>
          a.text.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, activities]);

  const handleRetry = () => {
    setRetryCount((prevRetry) => prevRetry + 1);
  };

  const handlePagination = () => {
    setPaginationLimit(
      (prevPaginationLimit) => prevPaginationLimit + paginationLimit
    );
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl pt-2">
        User Activity Tracker
      </h2>
      <input type="text" />
      <div className="w-9/12 md:w-5/12 mx-auto">
        <TextInput
          type="search"
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {connectionError && (
        <div>
          <p className="text-red-500 text-center">{connectionError}</p>
          <div className="w-4/12 mx-auto">
            <Button
              customStyle="w-full bg-blue-500 rounded-md text-white p-5 mt-2"
              click={handleRetry}
            >
              Retry
            </Button>
          </div>
        </div>
      )}
      <ul className="w-10/12 md:w-5/12 mx-auto">
        {!connectionError && filteredActivities.length
          ? filteredActivities
              .slice(0, paginationLimit)
              .map((activity, index) => (
                <>
                  <ActivityDisplay index={index} activity={activity} />
                </>
              ))
          : null}
      </ul>
      <p onClick={handlePagination} className="text-center font-bold">
        Show Older Activities
      </p>
    </div>
  );
};

export default ActivityTracker;
