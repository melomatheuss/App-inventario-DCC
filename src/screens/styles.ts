import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', //tem q trocar essa jaca por "center dps e criar um style  pra cada elemento ae principalmente prop botao"
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontWeight: 'bold',

    fontSize: 20,
    textAlign: 'center',
  },

});