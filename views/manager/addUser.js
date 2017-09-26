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
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert
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

    constructor(props) {
        super(props);
        this.state = {
            items: ['A', 'B', 'C', 'D', 'E', 'F'],
            tags: ['框架开发', 'BU产品', 'BU研发', '启明星', '项目管理', '公共产品'],
            selectA: {
                backgroundColor: '#3bc1ff',
                borderColor: '#3bc1ff'
            },
            select_A: {
                color: '#fff'
            },
            yan: {
                backgroundColor: '#3bc1ff',
                borderColor: '#3bc1ff'
            },
            yan_text: {
                color: '#fff'
            },
            tag: '研发',
            partment: '框架开发'
        }
    }

    render() {
        let tagOne = [];
        for (let i = 0; i < 3; i++) {
            tagOne.push(
                <TouchableOpacity onPress={this._select.bind(this, this.state.items[i])}>
                    <View style={[styles.part, this.state['select' + this.state.items[i]]]}>
                        <Text style={this.state['select_' + this.state.items[i]]}>
                            {this.state.tags[i]}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        let tagTwo = [];
        for (let i = 3; i < 6; i++) {
            tagTwo.push(
                <TouchableOpacity onPress={this._select.bind(this, this.state.items[i])}>
                    <View style={[styles.part,this.state['select' + this.state.items[i]]]}>
                        <Text style={this.state['select_' + this.state.items[i]]}>
                            {this.state.tags[i]}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <ScrollView style={{padding: 30}}>
                <View style={styles.row}>
                    <Text style={styles.label}>用户名</Text>
                    <TextInput style={[styles.input]}
                               underlineColorAndroid="transparent"
                               placeholder="请输入用户名"
                               onChangeText={(value) => {
                                   this._setUserName(value)
                               }}>
                    </TextInput>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>密码</Text>
                    <TextInput style={[styles.input]}
                               underlineColorAndroid="transparent"
                               secureTextEntry={true}
                               placeholder="请输入初始密码"
                               onChangeText={(value) => {
                                   this._setPassword(value)
                               }}>
                    </TextInput>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>邮箱</Text>
                    <TextInput style={[styles.input]}
                               underlineColorAndroid="transparent"
                               placeholder="请输入邮箱"
                               onChangeText={(value) => {
                                   this._setEmail(value)
                               }}>
                    </TextInput>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>电话</Text>
                    <TextInput style={[styles.input]}
                               underlineColorAndroid="transparent"
                               placeholder="请输入电话"
                               onChangeText={(value) => {
                                   this._setTel(value)
                               }}>
                    </TextInput>
                </View>
                <View style={styles.partment}>
                    {tagOne}
                </View>
                <View style={styles.partment}>
                    {tagTwo}
                </View>
                <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this._selectType.bind(this, 'yan')}>
                        <View style={[styles.part, this.state.yan]}>
                            <Text style={this.state.yan_text}>
                                研发
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._selectType.bind(this, 'chan')}>
                        <View style={[styles.part, this.state.chan]}>
                            <Text style={this.state.chan_text}>
                                产品
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._selectType.bind(this, 'project')}>
                        <View style={[styles.part, this.state.project]}>
                            <Text style={this.state.project_text}>
                                研发
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this._addUser.bind(this)}>
                        <View style={styles.btn}>
                            <Text>创建用户</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    _select(id) {
        let obj = {};
        let color = {};
        let items = {
            A: {},
            B: {},
            C: {},
            D: {},
            E: {},
            F: {}
        };
        obj['select' + id] = {
            backgroundColor: '#3bc1ff',
            borderColor: '#3bc1ff'
        };
        color['select_' + id] = {
            color: '#fff'
        };
        this.setState(obj);
        this.setState(color);
        delete items[id];
        for (let val in items) {
            let newObj = {};
            newObj['select' + val] = {
                backgroundColor: '#fff',
                borderColor: '#ddd'
            };
            let newColor = {};
            newColor['select_' + val] = {
                // color: '#333'
            };
            this.setState(newObj);
            this.setState(newColor);
        }
        let partment = '框架开发';
        switch (id) {
            case 'A':
                partment = this.state.tags[0];
                break;
            case 'B':
                partment = this.state.tags[1];
                break;
            case 'C':
                partment = this.state.tags[2];
                break;
            case 'D':
                partment = this.state.tags[3];
                break;
            case 'E':
                partment = this.state.tags[4];
                break;
            case 'F':
                partment = this.state.tags[5];
                break;
        }
        this.setState({
            partment: partment
        })
    }

    _selectType(id) {
        let obj = {};
        let color = {};
        let items = {
            yan: {},
            chan: {},
            project: {},
        };
        obj[id] = {
            backgroundColor: '#3bc1ff',
            borderColor: '#3bc1ff'
        };
        color[id + '_text'] = {
            color: '#fff'
        };
        this.setState(obj);
        this.setState(color);
        delete items[id];
        for (let val in items) {
            let newObj = {};
            newObj[val] = {
                backgroundColor: '#fff',
                borderColor: '#ddd'
            };
            let newColor = {};
            newColor[val + '_text'] = {
                // color: '#333'
            };
            this.setState(newObj);
            this.setState(newColor);
        }
        let tag = '研发';
        switch (id) {
            case 'yan':
                tag = '研发';
                break;
            case 'chan':
                tag = '产品';
                break;
            case 'project':
                tag = '项目';
                break;
            default:
                break;
        }
        this.setState({
            tag: tag
        })
    }

    _setUserName(val) {
        this.setState({
            username: val
        })
    }

    _setPassword(val) {
        this.setState({
            password: val
        })
    }

    _setEmail(val) {
        this.setState({
            email: val
        })
    }

    _setTel(val) {
        this.setState({
            tel: val
        })
    }

    _addUser() {
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        let tel = this.state.tel;
        let tag = this.state.tag;
        let partment = this.state.partment;
        if (!username || !email || !password || !tel) {
            return Alert.alert('提示', '用户名、初始密码、邮箱、电话、必填，请确认')
        }
        let obj = {
            username: username,
            password: password,
            email: email,
            tag: tag,
            tel: tel,
            partment: partment,
        }
        let path = Service.host + Service.addUser;
        Util.post(path, obj, function (data) {
            if (data.status === 1) {
                Alert.alert('成功', '创建用户成功,请告知用户初始密码')
            } else {
                Alert.alert('失败', '创建用户失败！')
            }
        })
    }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },
    label: {
        width: 50,
        marginLeft: 10,
    },
    input: {
        borderWidth: Util.pixel,
        padding: 0,
        height: 35,
        flex: 1,
        marginRight: 20,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingLeft: 5,
        fontSize: 14,
    },
    partment: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    part: {
        width: 65,
        height: 30,
        borderWidth: Util.pixel,
        borderColor: '#ddd',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    btn: {
        borderColor: '#268DFF',
        height: 35,
        width: 200,
        borderRadius: 5,
        borderWidth: Util.pixel,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
