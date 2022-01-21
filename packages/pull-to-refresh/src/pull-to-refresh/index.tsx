import { useState, useEffect, useRef, useCallback } from "preact/hooks";
import { useRecoilState } from "recoil";
import { loadingState } from "../recoil";

const getData = async (data: string[]) => {
  const newData = [...data];
  for (let i = 0; i < 30; i++) {
    newData.unshift(`这是第${newData.length + 1}条Message`);
  }
  return newData;
};

const translateValue = (touchY: number, startY: number) =>
  Math.max(0, Math.min((touchY - startY) / 2, 80));

const PullToRefresh = () => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(-1);
  const attachTop = useRef<boolean>(true);
  const observeDOM = useRef<any>(null);
  const isLoadingCache = useRef<boolean>(false);
  const isTipShowWillRefresh = useRef<boolean>(false);

  const touchmoveEvent = useCallback((e: TouchEvent, list: HTMLDivElement) => {
    if (!attachTop.current) return;
    if (startY.current === -1) startY.current = e.changedTouches[0].clientY;
    const moveDistance = translateValue(
      e.changedTouches[0].clientY,
      startY.current
    );
    list.style.transform = `translateY(${moveDistance}px)`;
    // 根据滑动的幅度修改tip的文本
    if (moveDistance > 75) {
      if (tipRef.current && !isTipShowWillRefresh.current) {
        tipRef.current.innerHTML = "松开以更新内容";
        isLoadingCache.current = true;
        isTipShowWillRefresh.current = true;
      }
      if (moveDistance === 80) {
        startY.current = e.changedTouches[0].clientY - 160;
      }
    } else {
      if (tipRef.current && isTipShowWillRefresh.current) {
        tipRef.current.innerHTML = "继续向下滑动刷新页面";
        isLoadingCache.current = false;
        isTipShowWillRefresh.current = false;
      }
    }
  }, []);

  useEffect(() => {
    getData(data).then(setData);
  }, []);
  useEffect(() => {
    const list = containerRef.current;
    list?.addEventListener("touchmove", (e) => {
      touchmoveEvent(e, list);
    });
    list?.addEventListener("touchend", (e) => {
      if (!attachTop.current) return;
      if (isLoadingCache.current) {
        list.style.transform = "translateY(75px)";
        list.style.transition = "all 200ms";
        setLoading(true);
      } else {
        list.style.transform = ``;
        startY.current = -1;
        setLoading(false);
      }
    });
    if (tipRef.current) tipRef.current.innerHTML = "继续向下滑动刷新页面";
  }, []);
  useEffect(() => {
    const list = listRef.current;
    if (list !== null) {
      let options = {
        root: null,
        rootMargin: "0px",
        threshold: [1.0, 0.0],
      };
      let observer = new IntersectionObserver((e, o) => {
        e.forEach((entry) => {
          if (!attachTop.current && entry.isIntersecting) {
            startY.current = -1;
          }
          attachTop.current = entry.isIntersecting;
        });
      }, options);

      list?.children[0] && observer.observe(list?.children[0]);
      observeDOM.current = list?.children[0];
    }
  }, [data]);

  return (
    <div className="container" ref={containerRef}>
      <div className="tip" ref={tipRef}></div>
      <div className="list" ref={listRef}>
        {data.map((info) => (
          <div key={info}>{info}</div>
        ))}
      </div>
    </div>
  );
};

export default PullToRefresh;
