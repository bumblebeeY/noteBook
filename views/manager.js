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
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
    AsyncStorage
} from 'react-native';

import Util from './util';
import {StackNavigator} from 'react-navigation';
import addUser from './manager/addUser';
import deleteUser from './manager/deleteUser';
import modifyPassword from './manager/modifyPassword';
import postMessage from './manager/postMessage';
class managerTab extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '管理',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            alignSelf: "center"
        }
    });
    componentDidMount(){
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {navigate} = this.props.navigation;
        const tabNavigate = this.props.screenProps.tabNavigate;
        const dispatch = this.props.screenProps.dispatch;
        let that = this;
        let colors = ['#f4000b', '#17b4ff', '#ffd900', '#f00000'];
        let tag = ['U', 'A', 'D', 'M'];
        let items = ['修改密码', '增加联系人', '删除联系人', '发布公告'];
        let component = ['modifyPassword', 'addUser', 'deleteUser', 'postMessage'];
        let JSXDOM = [];
        items.map(function (val, index) {
            JSXDOM.push(
                <TouchableOpacity onPress={() => navigate(component[index], {
                    title: val
                })} key={index}>
                    <View style={[styles.item, {flexDirection: 'row'}]}>
                        <Text style={[styles.tags, {color: colors[index]}]}>
                            {tag[index]}
                        </Text>
                        <Text style={[styles.font, {flex: 1}]}>
                            {val}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        });
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    {JSXDOM}
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={() =>{
                        tabNavigate('Home');
                        setTimeout(function () {
                            AsyncStorage.clear();
                        },1000);
                    }}>
                        <View style={[styles.item, {flexDirection: 'row'}]}>
                            <Text style={[styles.tags, {color: colors[1]}]}>
                                Q
                            </Text>
                            <Text style={[styles.font, {flex: 1}]}>
                                退出登录
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity>
                        <View style={[styles.item, {flexDirection: 'row'}]}>
                            <Text style={[styles.tags, {color: colors[1]}]}>
                                C
                            </Text>
                            <Text style={[styles.font, {flex: 1}]}>
                                点击这里检查更新版本二
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const ModalStack = StackNavigator({
    managerTab: {
        screen: managerTab
    },
    addUser: {
        screen: addUser,
    },
    deleteUser: {
        screen: deleteUser,
    },
    modifyPassword: {
        screen: modifyPassword,
    },
    postMessage: {
        screen: postMessage,
    },
}, {
    initialRouteName: 'managerTab',
});
export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {navigate} = this.props.navigation;
        const {dispatch} = this.props.navigation;
        return (
            <ModalStack screenProps={{
                tabNavigate: navigate,
                dispatch:dispatch
            }}>
            </ModalStack>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    item: {
        height: 40,
        justifyContent: 'center',
        borderTopWidth: Util.pixel,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    font: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 10
    },
    wrapper: {
        marginTop: 30,
    },
    tags: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold'
    }
});


