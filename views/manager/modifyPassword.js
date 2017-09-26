/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/22
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native';
import Util from '../util';
import Server from '../service';

export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '返回',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF'
    });

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={{height: 35, marginTop: 30,}}>
                    <TextInput style={[styles.input,{padding:0}]} password={true} placeholder="原始密码"
                               underlineColorAndroid="transparent"
                               secureTextEntry={true}
                               onChangeText={(value)=>{
                                   this._getOldPassword(value);
                               }}>
                    </TextInput>
                </View>
                <View style={{height: 35, marginTop: 5,}}>
                    <TextInput style={[styles.input,{padding:0}]} password={true} placeholder="新密码"
                               secureTextEntry={true}
                               underlineColorAndroid="transparent"
                               onChangeText={(value)=>{this._getNewPassword(value)}}>
                    </TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={this._resetPassword.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff'}}>
                                修改密码
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    _getOldPassword(val) {
        this.setState({
            oldPassword: val
        })
    }

    _getNewPassword(val) {
        this.setState({
            password: val
        })
    }

    _resetPassword() {
        let that = this;
        let path = Server.host + Server.updatePassword;
        AsyncStorage.getItem('token', function (err, data) {
            if (!err) {
                Util.post(path, {
                    password: that.state.password,
                    oldPassword: that.state.oldPassword,
                    token: data
                }, function (data) {
                    if (data.status === 1) {
                        Alert.alert('成功', data.data)
                    } else {
                        Alert.alert('失败', data.data)
                    }
                })
            } else {
                Alert.alert('失败', data.data)
            }
        })
    }
}
const styles = StyleSheet.create({
    input: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        height: 35,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingLeft: 5,
        fontSize: 13
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#1db8ff',
        height: 38,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4
    }

});