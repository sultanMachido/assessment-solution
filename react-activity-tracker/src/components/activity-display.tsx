type ActivityDisplayProps = {
  index: number;
  activity: { text: string; timestamp: string };
};

const ActivityDisplay = ({ index, activity }: ActivityDisplayProps) => {
  return (
    <li
      key={index}
      className="flex justify-between py-5 bg-blue-500 rounded-md shadow-md p-2 text-white my-2"
    >
      <p>{activity.text}</p> <p className="font-bold">{activity.timestamp}</p>
    </li>
  );
};

export default ActivityDisplay;
