import KumbhSansBold from "../../assets/fonts/Kumbh_Sans/KumbhSans-Bold.ttf";
import KumbhSansRegular from "../../assets/fonts/Kumbh_Sans/KumbhSans-Regular.ttf";

const styleOverrides = `
    @font-face {
        font-family: 'Kumbh Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Kumbh_Sans'), local('KumbhSans-Regular'), url(${KumbhSansRegular}) format('ttf');
    }
    
    @font-face {
        font-family: 'Kumbh Sans';
        font-style: normal;
        font-weight: 700;
        src: local('Kumbh_Sans'), local('KumbhSans-Bold'), url(${KumbhSansBold}) format('ttf');
    }
`;
export default styleOverrides;
