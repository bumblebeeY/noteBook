/**
 * @author：龚意
 * @version：v0.0.1
 * 创建日期：2017/9/20
 * 历史修订：
 */
var Service = {
    host: 'http://192.168.0.163:3000',
    login:'/user/login',
    loginByToken:'/user/login/token',
    getUser:'/user/get',
    addUser:'/user/create',
    updatePassword:'/user/password/update',
    deleteUser:'/user/delete',
    getMessage:'/message/get',
    addMessage:'/message/add'
};
module.exports=Service;