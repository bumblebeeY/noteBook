/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/20
 * 历史修订：
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Navigator,
} from 'react-native';
import Items from './home/items';
import Address from './home/address';
import {StackNavigator} from 'react-navigation';
const ModalStack = StackNavigator({
    Items: {
        screen: Items
    },
    Address: {
        screen: Address,
    },
});
export default class extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ModalStack>
            </ModalStack>
        );
    }
}


