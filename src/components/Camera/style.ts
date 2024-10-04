import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf:'flex-end',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    gap:50,
    margin: 50,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
