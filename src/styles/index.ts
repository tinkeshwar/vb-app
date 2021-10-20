import { StyleSheet } from "react-native"
export const app = {
    color: {
        primary: "#003AFF",
        success: "#7CFF00",
        danger: "#FF0032",
        dark: "#292828",
        light: "#E8E6E6",
        info: "#11F8D8",
        warning: "#F8EA11",
        white: "#FFFFFF",
        black: "#000000",
        grey: "#CCCCCC"
    }
}
export const styles = StyleSheet.create({
    Container:{
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Title1:{
        fontSize: 20,
        fontWeight: 'bold',
        color: app.color.black,
        alignItems: 'center'
    },
    InputView: {
        width: '80%',
        marginTop: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: app.color.grey,
        borderRadius: 5
    },
    InputBody: {
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        color: app.color.black
    },
    FloatingButtonContainer: {
        borderWidth: 1,
        borderColor: app.color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 50,
        backgroundColor: app.color.dark,
        borderRadius: 100,
        zIndex:999
    },
    ButtonContainer: {
        marginVertical:10,
        marginHorizontal: 5,
    },
    ButtonPrimary: {
        borderRadius: 5,
        padding: 10,
        color: app.color.white,
        textAlign: 'center',
        backgroundColor:app.color.primary,
        fontSize: 16
    },
    ButtonDanger: {
        borderRadius: 5,
        padding: 10,
        color: app.color.white,
        textAlign: 'center',
        backgroundColor:app.color.danger,
        fontSize: 16
    },
    ButtonSuccess: {
        borderRadius: 5,
        padding: 10,
        color: app.color.white,
        textAlign: 'center',
        backgroundColor:app.color.success,
        fontSize: 16
    },
    ButtonDark: {
        borderRadius: 5,
        padding: 10,
        color: app.color.white,
        textAlign: 'center',
        backgroundColor:app.color.dark,
        fontSize: 16
    },
    ButtonInfo: {
        borderRadius: 5,
        padding: 10,
        color: app.color.white,
        textAlign: 'center',
        backgroundColor:app.color.info,
        fontSize: 16
    },
    HeaderRight:{
        paddingHorizontal: 10
    },
    ItemContainer: {
        width: '100%',
    },
    ItemContent: {
        flexDirection: 'row',
        backgroundColor: app.color.white,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 20
    },
    ItemLeft:{
        justifyContent: 'center',
        width:'85%'
    },
    ItemRight:{
        width:'15%',
        justifyContent: 'center',
        backgroundColor:app.color.white,
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        borderColor: app.color.primary,
        borderWidth:2
    },
    ItemText: {
        color: app.color.primary,
        fontSize: 20,
    },
    ItemTaskLeft:{
        justifyContent: 'center',
        width:'85%'
    },
    ItemTaskRight:{
        width:'15%',
        justifyContent: 'center',
        backgroundColor: 'blue',
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 10
    },
    ItemTaskText: {
        color: 'blue',
        fontSize: 20,
    },
    ItemSubText: {
        paddingTop:5,
        color: '#000',
        fontSize: 12,
        width: '80%',
        textAlign: 'justify'
    },
    ShowContainer: {
        padding: 5,
    },
    ShowContent: {
        marginBottom:10
    },
    ShowLabel: {
        fontSize: 18,
        fontWeight: "700",
        backgroundColor: app.color.grey,
        paddingVertical:10,
        paddingHorizontal: 5
    },
    ShowValue: {
        fontSize: 14,
        fontWeight: "700",
        backgroundColor: app.color.grey,
        paddingVertical:10,
        paddingHorizontal: 5
    }
})