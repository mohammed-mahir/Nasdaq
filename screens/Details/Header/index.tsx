import { Image, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Loader } from "../../../components/Loader";
import { ThemeText } from "../../../components/ThemeText";
import { useAppState } from "../../../overmind";
import { Stock } from "../../../overmind/state";
import Logo from "./logo";

interface Props {
  stock: Stock;
}

const Container = styled.View`
  padding: 15px;
  min-height: 200;
`;
const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export function Header({ stock }: Props) {
  const loadingDetails = useAppState().isLoading;

  if (loadingDetails)
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );

  return (
    <Container>
      <View>
        <Logo url={stock.logo} name={stock.name} />
        <ThemeText style={styles.ticker}>{stock.ticker}</ThemeText>
        <ThemeText style={styles.name}>{stock.name}</ThemeText>
        <ThemeText style={styles.price}>{stock.aggregates?.close}</ThemeText>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  ticker: {
    fontSize: 30,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 40,
  },
});
