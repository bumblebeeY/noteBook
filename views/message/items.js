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
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Util from '../util';
import ItemBlock from './itemblock';
import Service from '../service';
export default class extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '公告列表',
        headerStyle: {
            backgroundColor: '#1296db',
        },
        headerTintColor: '#FFF',
        headerTitleStyle:{
            alignSelf:"center"
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            contents: []
        }
    }

    componentDidMount() {
        let that = this;
        let path = Service.host + Service.getMessage;
        let key = Util.key;
        Util.post(path, {
            key: key,
        }, function (data) {
            that.setState({
                contents: data
            })
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        let contents = [];
        let items = [];
        if (this.state.contents.status) {
            contents = this.state.contents.data;
        }
        contents.map(function (val, index) {
            items.push(
                <ItemBlock key={index}
                    data={val}
                    comonent="Detail"
                    nav={navigate}
                    text={val.message}
                    name={val.username}
                    date={val.time}>
                </ItemBlock>
            )
        });
        return (
            <ScrollView style={styles.container}>
                <View style={{height: 50, padding: 7}}>
                    <TextInput style={styles.search} placeholder="搜索">
                    </TextInput>
                </View>
                <View style={{backgroundColor: '#fff', borderWidth: 1, borderTopColor: '#DDD'}}>
                    {items}
                    <View style={{height: 35}}>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5',
        flexDirection:'column'
    },
    search:{
      height:35,
        borderWidth:Util.pixel,
        borderColor:'#ccc',
        paddingLeft:10,
        borderRadius:6,
        backgroundColor:'#fff'
    }
});