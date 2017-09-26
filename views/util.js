/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/20
 * 历史修订：
 */
import React from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';

var Util = {
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    //post请求
    post: function (url, data, callback) {
        var fetchOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        fetch(url, fetchOption)
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    },
    key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'
};
module.exports = Util;