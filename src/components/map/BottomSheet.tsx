import { motion } from "framer-motion";
import styles from "@styles/map/BottomSheet.module.css";
import { BOTTOM_SHEET_HEIGHT } from "@constant/bottomSheetOption";
import { BottomSheetHeader } from "./BottomSheetHeader";
import { Content } from "./Content";
import { useBottomSheet } from "@hooks/useBottomSheet";
import { foodCourtInfo, lakeParkInfo, eventInfo } from "@constant/marker";
import { MarkerInfoType } from "@type/map";
import { useMapContext } from "@context/MapContext";
import { CategoryDetailFilter } from "./CategoryDetailFilter";

export const Bottomsheet = () => {
  const { sheet, content } = useBottomSheet();

  // 사용자가 클릭한 마커 위치 정보
  const { currMarker } = useMapContext();

  // 사용자가 클릭한 마커 정보 담는 배열
  const clickMarkerList: MarkerInfoType[] = [];

  // 호수공원 이벤트 예외처리
  if (
    lakeParkInfo[0].position.getLat() === currMarker?.getLat() &&
    lakeParkInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    lakeParkInfo.map((v) => clickMarkerList.push(v));
  }

  // 먹거리 예외처리
  if (
    foodCourtInfo[0].position.getLat() === currMarker?.getLat() &&
    foodCourtInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    foodCourtInfo.map((v) => clickMarkerList.push(v));
  }

  // 사용자 클릭 위치 정보와 일치하는 것 찾아내기
  const info = eventInfo.find((marker) => {
    const newLatLng = marker.position;
    return (
      newLatLng.getLat() === currMarker?.getLat() &&
      newLatLng.getLng() === currMarker?.getLng()
    );
  });
  if (info) clickMarkerList.push(info);

  return (
    <>
      <motion.div
        ref={sheet}
        className={styles.wrapper}
        style={{ height: `${BOTTOM_SHEET_HEIGHT}` }}
      >
        <BottomSheetHeader />
        {/* 선택된 마커가 없을 때만 2차 필터링 렌더링 */}
        {currMarker === null && <CategoryDetailFilter />}
        <div className={styles.bottomsheet_wrapper} ref={content}>
          <Content clickMarkerList={clickMarkerList} />
        </div>
      </motion.div>
    </>
  );
};
