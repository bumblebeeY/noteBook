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
                <View>
                    <TextInput
                        multiline={true}
                        style={styles.textinput}
                        onChangeText={(value) => {
                            this._onChange(value)
                        }}
                        placeholder="请输入公告的内容"
                    >
                    </TextInput>
                </View>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={this._postMessage.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={{color: '#fff'}}>
                                发布公告
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    _onChange(val) {
        if (val) {
            this.setState({
                message: val
            });
        }
    }
    _postMessage() {
        let that = this;
        AsyncStorage.getItem('token', function (err, token) {
            if (err) {
                Alert.alert('权限失效，请退出APP，重新登录');
            } else {
                Util.post(Server.host + Server.addMessage, {
                    token: token,
                    message: that.state.message
                }, function (data) {
                    if (data.status===1) {
                        alert('添加成功！');
                    } else {
                        alert('添加失败！');
                    }
                });
            }

        });
    }


}
const styles = StyleSheet.create({
    textinput: {
        flex: 1,
        textAlignVertical:'top',
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 8,
        fontSize: 13,
        borderRadius: 4
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1DB8FF',
        height: 38,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4,
    }
});
