import {
  foodCourtInfo,
  lakeParkInfo,
  eventInfo,
  picnicInfo,
  promotionInfo,
  fleaMarketInfo,
  barInfo,
} from "@constant/marker";
import { useMapContext } from "@context/MapContext";
import styles from "@styles/map/Content.module.css";
import { clickMarkerListType, MarkerInfoType } from "@type/map";
import { useEffect, useState } from "react";

export const Content = ({ clickMarkerList }: clickMarkerListType) => {
  const { day, currCategory, isCategoryClicked, subCategory } = useMapContext();
  const [renderList, setRenderList] = useState<MarkerInfoType[]>([]);

  // 현재 선택된 카테고리에 해당되는 리스트 필터링
  const filterCategoryList = () => {
    return [
      ...eventInfo,
      ...promotionInfo,
      ...picnicInfo,
      ...fleaMarketInfo,
      ...barInfo,
      ...foodCourtInfo,
      ...lakeParkInfo,
    ].filter((marker) => {
      if (!subCategory) {
        // 2차 필터링 없을 때 (축제 일자에 맞는 것들 필터링)
        return marker.day.includes(day) && marker.category === currCategory;
      } else {
        // 2차 필터링 있을 때
        return (
          marker.day.includes(day) &&
          marker.category === currCategory &&
          marker.subCategory === subCategory
        );
      }
    });
  };

  // 조건에 따른 리스트 렌더링
  useEffect(() => {
    const categoryList = filterCategoryList();

    if (isCategoryClicked || subCategory) {
      setRenderList(categoryList);
    } else if (clickMarkerList && clickMarkerList.length > 0) {
      setRenderList(clickMarkerList);
    }

    console.log(categoryList);
  }, [day, currCategory, isCategoryClicked, subCategory]);

  return (
    <div className={styles.wrapper}>
      {currCategory !== "bar" ? (
        <ul className={styles.marker_list}>
          {renderList.map((markerInfo) => {
            return (
              <li className={styles.content} key={markerInfo.id}>
                <div className={styles.content_info}>
                  <div className={styles.title}>
                    <h3>{markerInfo?.name}</h3>
                    <span>{markerInfo?.index}</span>
                  </div>
                  <div className={styles.detail}>
                    <strong className={styles.time}>
                      {day === "전체" && currCategory === "food"
                        ? markerInfo?.total || markerInfo.time
                        : (day === "2일차" || day === "3일차") &&
                          currCategory === "food"
                        ? "10월 1~2일 11:00~23:30"
                        : markerInfo?.time}
                    </strong>
                    <strong className={styles.location}>
                      {markerInfo?.location}
                    </strong>
                  </div>
                </div>
                <div className={styles.image}>
                  <img src={markerInfo?.imagePath} alt="marker-image" />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        // 주점일 때 렌더링
        <ul className={styles.marker_list}>
          {renderList.map((markerInfo) => {
            return (
              <li className={styles.bar_content} key={markerInfo.id}>
                <div className={styles.bar_title}>
                  <h3>{markerInfo?.name}</h3>
                  <span>{markerInfo?.index}</span>
                </div>
                <div className={styles.bar_detail}>
                  <strong className={styles.time}>{markerInfo?.time}</strong>
                  <strong className={styles.location}>
                    {markerInfo?.location}
                  </strong>
                </div>
                <div className={styles.bar_image}>
                  <img src={markerInfo?.imagePath} alt="marker-image" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
