/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    AsyncStorage,
    ScrollView,
    TextInput,
    TouchableHighlight,
    AppState,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {TabNavigator} from 'react-navigation';
import Home from './views/home';
import About from './views/about';
import Manager from './views/manager';
import Message from './views/message';
import Util from './views/util';
import Service from './views/service';
import codePush from 'react-native-code-push'
let DeviceInfo = require('react-native-device-info');
// 注册tabs
const Tabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel:  '首页',
            tabBarIcon:({tintColor}) => (<Image source={require('./images/home.png')} style={[{tintColor: tintColor},styles.icon]}/>),
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            tabBarLabel:  '公告',
            tabBarIcon:({tintColor}) => (<Image source={require('./images/msg.png')} style={[{tintColor: tintColor},styles.icon]}/>),
        }
    },
    Manager: {
        screen: Manager,
        navigationOptions: {
            tabBarLabel:  '管理',
            tabBarIcon:({tintColor}) => (<Image source={require('./images/manage.png')} style={[{tintColor: tintColor},styles.icon]}/>),
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            tabBarLabel:  '关于',
            tabBarIcon:({tintColor}) => (<Image source={require('./images/about.png')} style={[{tintColor: tintColor},styles.icon]}/>),
        }
    }
}, {
    initialRouteName:'Home',
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#1296db', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            // height: 44
        },
        labelStyle: {
            fontSize: 10, // 文字大小
        },
    },
});
export default class noteBook extends Component {
    static: {
        title: '主页',
        description: '选项卡'
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            showIndex: {
                height: 0,
                opacity: 0
            },
            showLogin: {
                flex: 0,
                opacity: 0
            },
            isLoadingShow: false
        }
    }
    componentDidMount() {
        codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix:'\n\n更新内容：\n',
                title:'更新',
                mandatoryUpdateMessage:'',
                mandatoryContinueButtonLabel:'更新',
            },
            mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
            deploymentKey: '8ZKqIeNAo608tPHAByPpkgfYexE72269e9dd-1cf1-4aa5-85ec-3b59bbeb7f50',
        });
        AppState.addEventListener("change", (newState) => {
            newState === "active" && codePush.sync();
        });
        let that = this;
        AsyncStorage.getItem('token', function (err, token) {
            if (!err && token) {
                let path = Service.host + Service.loginByToken;
                Util.post(path, {token: token}, function (data) {
                    if (data.status) {
                        that.setState({
                            showLogin: {
                                height: 0,
                                width: 0,
                                flex: 0
                            },
                            showIndex: {
                                flex: 1,
                                opacity: 1
                            },
                            isLoadingShow: false
                        })
                    }
                })
            } else {
                that.setState({
                    showLogin: {
                        flex: 1,
                        opacity: 1
                    },
                    showIndex: {
                        height: 0,
                        opacity: 0
                    },
                    isLoadingShow: false
                })
            }
        });
        let path = Service.host + Service.getMessage;
        Util.post(path, {
            key: Util.key
        }, function (data) {
            that.setState({
                data: data
            })
        })
    }
    _login() {
        let email = this.state.email;
        let password = this.state.password;
        let path = Service.host + Service.login;
        let that = this;
        that.setState({
            showLogin: {
                height: 0,
                width: 0,
                flex: 0
            },
            isLoadingShow: true
        });
        Util.post(path, {
            email: email,
            password: password,
            deviceId: DeviceInfo.getUniqueID()
        }, function (data) {
            if (data.status === 1) {
                let user = data.data;
                AsyncStorage.multiSet([
                    ['username', user.username],
                    ['token', user.token],
                    ['userid', user.userid],
                    ['email', user.email],
                    ['tel', user.tel],
                    ['partment', user.partment],
                    ['tag', user.tag],
                ], function (err) {
                    console.log(err);
                    if (!err) {
                        that.setState({
                            showLogin: {
                                height: 0,
                                width: 0,
                                flex: 0
                            },
                            showIndex: {
                                flex: 1,
                                opacity: 1,
                            },
                            isLoadingShow: false
                        })
                    }
                })
            } else {
                Alert.alert('登录', '用户名或者密码错误');
                that.setState({
                    showLogin: {
                        flex: 1,
                        opacity: 1
                    },
                    showIndex: {
                        height: 0,
                        opacity: 0
                    },
                    isLoadingShow: false
                })
            }
        })
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
                {
                    this.state.isLoadingShow ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size='small' color='#268dff'>
                            </ActivityIndicator>
                        </View> : null
                }
                {
                    !this.state.isLoadingShow ?
                        <View style={this.state.showIndex}>
                            <Tabs>

                            </Tabs>
                        </View> : null
                }
                <View style={[this.state.showLogin]}>
                    <View style={styles.inputRow}>
                        <Image style={styles.logo} source={require('./images/logo.png')}>
                        </Image>
                    </View>
                    <View style={styles.inputRow}>
                        <Text>邮箱</Text>
                        <TextInput style={[styles.input,{padding:0}]}
                                   placeholder="请输入邮箱"
                                   underlineColorAndroid="transparent"
                                   onChangeText={(text) => this.setState({email: text})}>
                        </TextInput>
                    </View>
                    <View style={styles.inputRow}>
                        <Text>密码</Text>
                        <TextInput style={[styles.input,{padding:0}]}
                                   secureTextEntry={true}
                                   underlineColorAndroid="transparent"
                                   // placeholder="请输入密码"
                                   onChangeText={(text) => this.setState({password: text})}>
                        </TextInput>
                    </View>
                    <View style={styles.inputRow}>
                        <TouchableHighlight underlayColor="#fff" style={styles.btn}
                                            onPress={this._login.bind(this)}>
                            <Text style={{color: '#fff'}}>登录</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabText: {
        color: "#000000",
        fontSize: 10
    },
    selectedTabText: {
        color: "#1296db",
        fontSize: 10
    },
    icon: {
        width: 30,
        height: 30,
    },
    container: {
        marginTop: 50,
        justifyContent:'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: Image.resizeMode.contain,
        marginBottom: 30
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    input: {
        marginLeft: 10,
        width: 220,
        borderWidth: Util.pixel,
        height: 35,
        paddingLeft: 8,
        borderRadius: 5,
        borderColor: '#ccc'
    },
    btn: {
        marginTop: 10,
        width: 80,
        height: 35,
        backgroundColor: '#3BC1FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    }
});

AppRegistry.registerComponent('noteBook', () => noteBook);
