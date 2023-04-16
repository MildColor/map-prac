import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { rangeTextsArray } from "../../../constants/buttonTexts";
import RangeButton from "../../common/button/RangeButton";
import { LocationContext } from "../../../contexts/Location/LocationContext";

function RangeButtonsOverlay({ setRadius, setFocusedRegion }) {
  const { location } = useContext(LocationContext);

  const [selectedId, setSelectedId] = useState();

  const onPressItem = (item) => {
    setSelectedId(item.id);
    setRadius(item.range);
    setFocusedRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const renderItem = ({ item }) => {
    const borderColor = item.id === selectedId ? "#F9AC38" : "white";
    const color = item.id === selectedId ? "#F9AC38" : "black";

    return (
      <RangeButton
        item={item}
        onPress={() => onPressItem(item)}
        color={color}
        borderColor={borderColor}
      >
        {item.text}
      </RangeButton>
    );
  };

  return (
    <Container>
      <ButtonsFlatList
        horizontal={true}
        data={rangeTextsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
}

export default RangeButtonsOverlay;

const Container = styled(View)`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 30px;
  top: 85px;
  padding-left: 13%;
  padding-right: 13%;
  margin-top: 10px;
`;

const ButtonsFlatList = styled(FlatList)`
  width: 100%;
`;
