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
    Alert,
    AsyncStorage,
    ScrollView
} from 'react-native';
import Util from '../util';
import Server from '../service';
import DeviceInfo from 'react-native-device-info';
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
                <View style={{height: 30, marginTop: 30}}>
                    <TextInput style={styles.input}
                               placeholder="请输入用户的邮箱"
                               onChangeText={(value) => {
                                   this._getEmail(value)
                               }}
                    >
                    </TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={this._deleteUser.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff'}}>删除用户</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    _getEmail(val) {
        this.setState({
            email: val
        })
    }

    _deleteUser() {
        let that = this;
        Alert.alert('提示', '确认删除改用户？', [
            {
                text: '删除',
                onPress: function () {
                    let path = Server.host + Server.deleteUser;
                    AsyncStorage.getItem('token', function (err,token) {
                        if (!err) {
                            Util.post(path, {
                                token: token,
                                email: that.state.email
                            }, function (data) {
                                if (data.status === 1) {
                                    Alert.alert('成功', '删除成功')
                                } else {
                                    Alert.alert('失败', '删除失败')
                                }
                            })
                        } else {
                            Alert.alert('提示', '没有权限')
                        }
                    })
                }
            }, {
                text: '取消',
                onPress: () => null
            }
        ])
    }
}
const styles = StyleSheet.create({
    input:{
        flex:1,
        marginLeft:20,
        marginRight:20,
        height:35,
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:4,
        paddingLeft:5,
        paddingTop:0,
        paddingBottom:0,
        fontSize:13,
    },
    btn:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        backgroundColor:'#1DB8FF',
        height:38,
        marginLeft:20,
        marginRight:20,
        borderRadius:4,
    }
});
