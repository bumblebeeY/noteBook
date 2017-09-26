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
    Image,
    TouchableOpacity,
} from 'react-native';
import Service from '../service';
import Util from '../util';
export default class extends Component {
    constructor(props) {
        super(props);
    }

    _loadPage() {
        let that = this;
        let navigate = this.props.nav;
        navigate(that.props.comonent, {
            data: that.props.data
        });
    }
    render() {
        return (
            <TouchableOpacity onPress={this._loadPage.bind(this, this.props.data)}>
                <View style={styles.item}>
                    <View style={styles.width55}>
                        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                            {this.props.name.substr(0, 1)}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column', height: 50, flex: 1}}>
                        <Text numberOfLines={2} style={styles.text}>
                            {this.props.text}
                        </Text>
                        <Text style={styles.date}>
                            {this.props.date}
                        </Text>
                    </View>
                    <View style={styles.m10}>
                        <Text numberOfLines={1} style={styles.name}>
                            {this.props.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        height: 80,
        padding: 5,
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    width55: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05c147',
        marginRight: 10
    },
    text: {
        flex: 1,
        marginBottom: 5,
        opacity: 0.7,
    },
    date: {
        flex: 1,
        color: '#ccc',
        fontSize: 11
    },
    m10: {
        marginLeft: 10
    },
    name: {
        color: "#929292",
        fontSize: 13
    }


});