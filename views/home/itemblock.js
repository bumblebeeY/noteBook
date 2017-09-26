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
    Navigator,
    TouchableHighlight,
} from 'react-native';
import Util from '../util';
import Service from '../service';
export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let size = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.width),
            backgroundColor: this.props.color
        };
        return (
            <TouchableHighlight underlayColor="#fff" onPress={this._loadPage.bind(this)}>
                <View style={[styles.itemBlock,size]}>
                    <View>
                        <Text style={styles.font18}>{this.props.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.font10}>{this.props.partment}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    _loadPage(){
        let that=this;
        let key=Util.key;
        let partment=this.props.partment;
        let path=Service.host+Service.getUser;
        let navigate=this.props.nav;
        Util.post(path,{
            key:key,
            partment:partment,
        },function (data) {
            navigate('Address',{
                title:that.props.title,
                data:data
            });
        })
    }
}
const styles = StyleSheet.create({
    itemBlock:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginLeft:10
    },
    font18:{
        color:'#fff',
        fontSize:18,
        fontWeight:'500'
    },
    font10:{
        color:'#fff',
        fontSize:10,
    }
});
