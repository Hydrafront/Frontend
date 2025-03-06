import { useTimeAgo } from "@/utils/func";

const TimeAgo = ({ createdAt }: { createdAt: Date }) => {
  const timeAgo = useTimeAgo(createdAt);
  return <span>{timeAgo}</span>;
};

export default TimeAgo;
