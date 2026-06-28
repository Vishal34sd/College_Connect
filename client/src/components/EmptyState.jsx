import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const EmptyState = ({ message = "No tasks found", suggestion = "Create a new task to get started!" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center mb-4">
        <HiOutlineClipboardDocumentList className="w-10 h-10 text-primary-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {message}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion}</p>
    </div>
  );
};

export default EmptyState;
