import { StyleSheet} from 'react-native'
import colors from './colors';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    
    rowContainer: {
        flexDirection: 'row',
        alignItems: ' center',
        justifyContent:'space-between',
        width: '100%',
        paddingHorizontal: 64,
        paddingBottom: 16,
    },
    containerLeft: {
    alignSelf: 'flex-start', 
    marginLeft: 64
    },
    scrollContainer: {
    backgroundColor: colors.colors.background,
    paddingVertical: 80
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

});
    
export {globalStyles};


