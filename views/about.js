/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/20
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import about from './about/about'
const ModalStack = StackNavigator({
    about: {
        screen: about
    },
});
export default class extends Component{
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
    render(){
        return (
            <ModalStack>
            </ModalStack>
        )
    }
}


