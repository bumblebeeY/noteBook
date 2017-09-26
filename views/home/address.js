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
        const {params} = this.props.navigation.state;
        let views = [];
        let items = params.data.data;
        let colors = ['#e20079', '#ffd602', '#25bffe', '#f90000', '#04e246', '#04e246', '#00afc9'];
        let color = {
            backgroundColor: colors[parseInt(Math.random()) * 7]
        };
        items.map(function (val, index) {
            views.push(
                <View style={styles.row}>
                    <View style={[styles.text, color]}>
                        <Text style={{fontSize: 25, color: '#fff', fontWeight: 'bold'}}>
                            {val.username.substr(0, 1) || '木'}
                        </Text>
                    </View>
                    <View style={styles.part}>
                        <Text>
                            {val.username}
                        </Text>
                        <Text style={styles.unColor}>
                            {(val.partment || "") + '部-' + (val.tag || "") + '人员'}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>
                            {val.tel}
                        </Text>
                        <Text>
                            {val.email}
                        </Text>
                    </View>
                </View>
            )
        });
        return (
            <ScrollView>
                {views}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        height: 80,
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#E30082'
    },
    part:{
        marginLeft:5,
        flex:1,
    },
    link:{
        color:'#1bb7ff'
    },
    unColor:{
        color:'#575656',
        marginTop:8,
        fontSize:12,
    }
});