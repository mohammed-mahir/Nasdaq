import { Icon, Text } from "@rneui/base";
import { Modal, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ThemeText } from "../../components/ThemeText";
import { theme } from "../../constants";
import useHttpErrorHandler from "../../hooks/http-error-handler";

interface Props {
  children?: React.ReactNode;
}

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.primary};
`;

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  margin: 30px;
  align-self: stretch;
  background-color: #f8f8ff;
  border-radius: 20px;
  padding-bottom: 30px;
  align-items: center;
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
  z-index: 10;
`;

const HeaderContainer = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${theme.colors.error};
  padding: 15px;
`;

const MessageText = styled.Text`
  color: black;
  font-size: 20px;
  margin: 35px;
  text-align: center;
`;

const ModalButton = styled.Pressable`
  border-radius: 20px;
  padding: 10px;
  padding-left: 35px;
  padding-right: 35px;
  elevation: 2;
  background-color: ${theme.colors.primaryDark};
`;

export default function withErrorHandler<Props>(
  WrappedComponent: React.ComponentType<Props>
) {
  return (props: Props) => {
    const [error, clearError] = useHttpErrorHandler();

    const closeHandler = () => {
      if (clearError) clearError();
    };

    return (
      <>
          <Modal
            animationType="slide"
            transparent={false}
            visible={!!error}
            onRequestClose={closeHandler}
          >
        <Container>
            <ModalBackground>
              <ModalContainer>
                <HeaderContainer>
                  <Icon name="error" color={theme.colors.secondary} size={50} />
                  <ThemeText style={styles.title}>Error</ThemeText>
                </HeaderContainer>
                <MessageText>{error}</MessageText>
                <ModalButton onPress={closeHandler}>
                  <ThemeText style={styles.buttonText}>Try Again</ThemeText>
                </ModalButton>
              </ModalContainer>
            </ModalBackground>
        </Container>
          </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
