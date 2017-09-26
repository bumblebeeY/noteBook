/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/23
 * 历史修订：
 */
/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/22
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '关于我们',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF',
        headerTitleStyle:{
            alignSelf:"center"
        }
    });
    constructor(props){
        super(props);
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.avatar} source={require('../../images/home.png')}/>
                    <Text style={{fontSize: 14, marginTop: 10, color: '#ABABAB'}}>Author: Eleven</Text>
                    <Text style={{fontSize: 14, marginBottom: 20, color: '#ABABAB'}}>Version: v0.0.1</Text>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image style={styles.img} source={require('../../images/home.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={[styles.img, {width: 25, height: 25}]} source={require('../../images/home.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        alignItems:'center',
        marginTop:50,
    },
    avatar:{
        width:90,
        height:90,
        borderRadius:45,
    },
    img:{
        width:20,
        height:20,
        marginRight:5,
    }
});


