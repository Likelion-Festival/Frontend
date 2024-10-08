import {
  foodCourtInfo,
  lakeParkInfo,
  eventInfo,
  picnicInfo,
  promotionInfo,
  fleaMarketInfo,
  barInfo,
  medicalInfo,
  photoBoothInfo_1,
  photoBoothInfo_2,
} from "@constant/marker";
import { useMapContext } from "@context/MapContext";
import styles from "@styles/map/Content.module.css";
import { clickMarkerListType, MarkerInfoType } from "@type/map";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Content = ({ clickMarkerList }: clickMarkerListType) => {
  const { day, currMarker, currCategory, isCategoryClicked, subCategory } =
    useMapContext();
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
      ...medicalInfo,
      ...photoBoothInfo_1,
      ...photoBoothInfo_2,
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

  // 조건에 따른 카테고리 리스트 렌더링
  useEffect(() => {
    const categoryList = filterCategoryList();
    console.log(categoryList);

    if (isCategoryClicked || subCategory) {
      setRenderList(categoryList);
    }
  }, [day, currCategory, isCategoryClicked, subCategory]);

  // 조건에 따른 클릭된 마커 리스트 렌더링
  useEffect(() => {
    // if (!isCategoryClicked && clickMarkerList && clickMarkerList.length > 0) {
    //   setRenderList(clickMarkerList);
    //   console.log(clickMarkerList);
    // }

    if (!isCategoryClicked && clickMarkerList && clickMarkerList.length > 0) {
      const filteredList = clickMarkerList.map((marker) => {
        console.log(marker);
        if ("day" in marker) {
          return marker as MarkerInfoType; // MarkerInfoType인 경우 그대로 반환
        } else {
          // Store인 경우, MarkerInfoType에 맞게 변환
          return {
            id: 61, // marker.id -> 왜 Store에 없다고 뜨는거야..
            day: [], // day도 Store에는 없으므로 빈 배열 할당
            category: marker.category,
            subCategory: "", // 빈 string 할당
            name: marker.name,
            index: "",
            time: marker.time,
            location: marker.location,
            position: marker.position,
            imagePath: marker.imageUrl,
          } as MarkerInfoType;
        }
      });

      setRenderList(filteredList);
    }
  }, [clickMarkerList, currMarker, isCategoryClicked]);

  return (
    <div className={styles.wrapper}>
      {currCategory === "bar" ? (
        // 주점일 때 렌더링
        <ul className={styles.marker_list}>
          {renderList.map((markerInfo) => {
            return (
              <Link to={`/bar-detail/${markerInfo.id}`}>
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
              </Link>
            );
          })}
        </ul>
      ) : (
        <ul className={styles.marker_list}>
          {renderList.map((markerInfo) => {
            const isNavigate = markerInfo.id < 100;

            return (
              <>
                {isNavigate ? (
                  <Link to={`/detail/${markerInfo.id}`}>
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
                  </Link>
                ) : (
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
                )}
              </>
            );
          })}
        </ul>
      )}
    </div>
  );
};
