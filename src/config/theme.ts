const theme = {
  light: {
    theme: 'light',
    backColor: '#181818',
    headerColor: '#212121',
    bottomTabColor: '#172A46',
    cardBackground: '#212121',
    textColor: 'white',
    statusColor: '#181818',
    toggleBackColor: '#2C2C2C',
    iconColor: '#ffffff',
    themeBack: '#C5EFF9',
  },
  dark: {
    theme: 'dark',
    headerColor: '#DA3349',
    bottomTabColor: 'white',
    cardBackground: 'white',
    textColor: 'black',
    statusColor: '#AF2235',
    toggleBackColor: '#FF055D',
    iconColor: '#ffffff',
    themeBack: '#fcf8f8',
  },
};

export interface Theme {
  theme: string;
  backColor: string;
  headerColor: string;
  bottomTabColor: string;
  cardBackground: string;
  textColor: string;
  statusColor: string;
  toggleBackColor: string;
  iconColor: string;
  themeBack: string;
}

export default theme;
