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
    ScrollView
} from 'react-native';
import Util from '../util';
import Service from '../service';
export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '返回',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF'
    });

    render() {
        const {params} = this.props.navigation.state;
        return (
            <ScrollView>
                <View style={styles.content}>
                    <Text style={{lineHeight: 20}}>
                        {params.data.message}
                    </Text>
                </View>
                <View style={[styles.luokuan, {marginTop: 25}]}>
                    <View style={{flex: 1}}>
                    </View>
                    <Text style={[styles.text, {color: '#007aff'}]}>
                        {params.data.username}
                    </Text>
                </View>
                <View style={[styles.luokuan]}>
                    <View style={{flex: 1}}>
                    </View>
                    <Text style={[styles.text, {color: '#3bc1ff'}]}>
                        {params.data.time}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        opacity: 0.85
    },
    luokuan: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 20
    },
    text: {
        lineHeight: 20,
        width: 90
    }

});