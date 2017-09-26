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
import ItemBlock from './itemblock';
export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '主页',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
            alignSelf: "center"
        }
    });

    constructor(props) {
        super(props);
        let width = Math.floor(((Util.size.width - 20) - 50) / 4);
        let items = [
            {
                title: '研发',
                partment: '框架开发',
                color: '#126aff'
            },
            {
                title: '研发',
                partment: 'BU开发',
                color: '#ffd600'
            },
            {
                title: '产品',
                partment: '公共产品',
                color: '#f80728'
            },
            {
                title: '产品',
                partment: 'BU产品',
                color: '#05c147'
            },
            {
                title: '产品',
                partment: '启明星',
                color: '#ff4eb9'
            },
            {
                title: '项目',
                partment: '项目管理',
                color: '#ee810d'
            },
        ];
        this.state = {
            items: items,
            width: width
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        let Items1 = [];
        let Items2 = [];
        let items = this.state.items;
        for (let i = 0; i < 4; i++) {
            Items1.push(
                <ItemBlock
                    key={i}
                    title={items[i].title}
                    partment={items[i].partment}
                    width={this.state.width}
                    color={items[i].color}
                    nav={navigate}
                >
                </ItemBlock>
            )
        }
        for (let i = 4; i < items.length; i++) {
            Items2.push(
                <ItemBlock
                    key={i}
                    title={items[i].title}
                    partment={items[i].partment}
                    width={this.state.width}
                    color={items[i].color}
                    nav={navigate}
                >
                </ItemBlock>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.itemRow}>
                    {Items1}
                </View>
                <View style={styles.itemRow}>
                    {Items2}
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 20,
    }
});


