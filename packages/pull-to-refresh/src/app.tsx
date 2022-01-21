import Header from "./header";
import PullToRefresh from "./pull-to-refresh";
import { useRecoilValue } from "recoil";
import { loadingState } from "./recoil";

export function App() {
  const isLoading = useRecoilValue(loadingState);
  return (
    <>
      <div className={isLoading ? 'rotate' : ''}>
        <Header />
        <PullToRefresh />
      </div>
    </>
  );
}
