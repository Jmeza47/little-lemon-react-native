import {StyleSheet} from 'react-native';

// color constants
export const primaryColor1 = '#495E57';
export const primaryColor2 = '#F4CE14';

export const secondaryColor1 = '#EE9972';
export const secondaryColor2 = '#FBDABB';
export const secondaryColor3 = '#EDEFEE';
export const secondaryColor4 = '#333333';

//style constants for titles, forms and others
export const identityStyle = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  displayTitle: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 60,
    color: primaryColor2,
    includeFontPadding: false,
  },
  subTitle: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 50,
    color: secondaryColor3,
  },
  sectionTitle: {
    fontFamily: 'Karla-Regular',
    fontSize: 20,
    fontWeight: '800',
  },
  sectionDisplayTitle: {
    fontFamily: 'Karla-Regular',
    fontSize: 60,
    fontWeight: '800',
    color: primaryColor2,
  },
  leadText: {
    fontFamily: 'Karla-Regular',
    fontSize: 20,
    color: secondaryColor3,
  },
  cardTitle: {
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphText: {
    fontFamily: 'Karla-Regular',
    fontSize: 14,
    marginVertical: 5,
  },
  HighlightText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryTitle: {
    marginBottom: 20,
    fontFamily: 'Karla-Regular',
    fontWeight: '600',
    fontSize: 20,
    color: secondaryColor3,
  },
});
