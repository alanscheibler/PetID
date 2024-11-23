import { StyleSheet} from 'react-native'
import colors from './colors';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 64,
    },
    
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: '100%',
        paddingBottom: 16,
    },
    containerLeft: {
    alignSelf: 'flex-start', 
    marginLeft: 64
    },

    scrollContainer: {
        backgroundColor: colors.colors.background,
    },

    footerContainer: {
        position: 'absolute',
        bottom:0,
        width: '100%',
        padding:24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        margin: 10,
    },

    icon:{
        fontSize: 36,
        color: colors.colors.componentBG
    }

});
    
export {globalStyles};