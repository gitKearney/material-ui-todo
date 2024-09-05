import {AnalyticsModule} from "../../analytics/analytics-modules.ts";

function useAnalytics() {
  const client = (event:string, label:string, priority:number) => {
    // event will be something like: todo_created, todo_marked, todo_unmarked, todo_deleted, todo_edit
    AnalyticsModule.capture(event, {todo_name: label, priority});
  };

  return { client };
}

export { useAnalytics }