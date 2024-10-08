import {
  foodCourtInfo,
  lakeParkInfo,
  eventInfo,
  picnicInfo,
  promotionInfo,
  barInfo,
  photoBoothInfo_1,
  photoBoothInfo_2,
} from "@constant/marker";
import { MarkerInfoType } from "@type/map";
import { useMapContext } from "@context/MapContext";
import { Store, stores } from "@assets/bar/bar-types";

export const getClickMarkerList = () => {
  // 사용자가 클릭한 마커 위치 정보
  const { day, currMarker } = useMapContext();

  // 사용자가 클릭한 마커 정보 담는 배열
  const clickMarkerList: (MarkerInfoType | Store)[] = [];

  // 클릭시 항목이 여러개 나타나는 마커들
  // 호수공원 마커 클릭 시
  if (
    lakeParkInfo[0].position.getLat() === currMarker?.getLat() &&
    lakeParkInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    // 해당 day에 진행하는 이벤트 필터링
    const filterdMarkers = lakeParkInfo.filter((v) => v.day.includes(day));
    filterdMarkers.map((v) => clickMarkerList.push(v));
  } else if (
    // 피크닉 마커 클릭 시
    picnicInfo[0].position.getLat() === currMarker?.getLat() &&
    picnicInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    picnicInfo.map((v) => clickMarkerList.push(v));
  } else if (
    // 프로모션 마커 클릭 시
    promotionInfo[0].position.getLat() === currMarker?.getLat() &&
    promotionInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    promotionInfo.map((v) => clickMarkerList.push(v));
  } else if (
    // 주점 마커 클릭 시
    barInfo[0].position.getLat() === currMarker?.getLat() &&
    barInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    barInfo.map((v) => clickMarkerList.push(v));
  } else if (
    // 먹거리 마커 클릭 시
    foodCourtInfo[0].position.getLat() === currMarker?.getLat() &&
    foodCourtInfo[0].position.getLng() === currMarker?.getLng()
  ) {
    foodCourtInfo.map((v) => clickMarkerList.push(v));
  }

  // 주점 -> 지도 페이지 마커 1개 예외처리
  const bar = stores.find((v) => {
    const newLatLng = v.position;
    return (
      newLatLng.getLat() === currMarker?.getLat() &&
      newLatLng.getLng() === currMarker?.getLng()
    );
  });
  if (bar) clickMarkerList.push(bar);

  // 마커 1개 필터링 로직
  const findSingleMarker = (markerArray: MarkerInfoType[]) => {
    return markerArray.find((marker) => {
      return (
        marker.day.includes(day) &&
        marker.position.getLat() === currMarker?.getLat() &&
        marker.position.getLng() === currMarker?.getLng()
      );
    });
  };

  const singleMarker =
    findSingleMarker(photoBoothInfo_1) ||
    findSingleMarker(photoBoothInfo_2) ||
    findSingleMarker(eventInfo);
  if (singleMarker) clickMarkerList.push(singleMarker);

  return clickMarkerList;
};
