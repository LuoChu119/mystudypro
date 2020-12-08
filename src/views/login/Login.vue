<template>
    <div id="login">
        <div class="login_inner">
            <div class="login_header">
                <div class="login_logo">
                    <img src="http://demo.itlike.com/img/lk_logo_sm.6059c196.png" alt="">
                </div>
                <!-- 登录方式选择 -->
                <div class="login_method">
                    <a href="javascript:;" @click="dealLoginMode(true)" :class="{current: loginMode}">手机登录</a>
                    <a href="javascript:;" @click="dealLoginMode(false)" :class="{current: !loginMode}">密码登录</a>
                </div>
            </div>
            <!-- 信息验证部分 -->
            <div class="formation_check">
                <div v-if="loginMode" class="iphone">   
                    <div class="iphone_in">
                        <input type="text" placeholder="手机号" v-model="phone">
                        <button class="text" @click="getVerifycode()" v-if="!conuntDown" :class="{phone_right: phoneRight}">获取验证码</button>
                        <button v-else>已发送({{conuntDown}}s)</button>
                    </div>
                    <div class="iphone_code_in">
                        <input v-model="code" type="text" placeholder="验证码">
                    </div>
                    <div class="point_out">
                        <span>温馨提示：未注册小撩买菜的手机号，登录时将自动注册，且代表已同意
                        <a href="javascript:;">服务协议与隐私政策</a>
                        </span>
                    </div>
                </div>
                <div v-else class="code_login">
                    <div class="iphone_in">
                        <input v-model="user_name" type="text" maxlength="11" placeholder="账户">
                    </div>
                    <div class="iphone_code_in">
                        <input v-if="pwdMode" v-model="pwd" type="password" placeholder="密码">
                        <input v-else type="text" v-model="pwd" maxlength="20" placeholder="密码" autocomplete="off">
                        <van-icon v-if="!pwdMode" @click="dealPassWord(true)"  name="eye-o" />
                        <van-icon v-else @click="dealPassWord(false)" name="closed-eye"/>
                    </div>
                    <div class="code_check">
                        <input v-model="captcha" type="text" placeholder="验证码">
                        <img    
                            src="http://demo.itlike.com/web/xlmc/api/captcha" 
                            alt="captcha"
                            @click="getCaptcha"
                            ref="captcha"
                            >   
                    </div>
                </div>
            </div>
            <div class="login_return">
                <button @click="login" class="login">登录</button>
                <button @click="$router.back()" class="return">返回</button>
            </div>
        </div>      
    </div>
</template>
<script>
import {getPhoneCode, phoneCodeLogin, pwdLogin} from './../../service/api/index.js'
import { Toast } from 'vant';
import {mapState, mapActions} from 'vuex'
export default {
    name: 'Login',
    data(){
        return {
            
            loginMode: true, //登录模式
            phone: null, //手机号码
            conuntDown: 0, //倒计时
            code: null, //手机验证码
            userinfo:null, //用户信息

            user_name: null,//用户名
            pwd: null,//密码
            pwdMode: true,//密文， false为明文
            captcha: null,//图形验证码
        }
    },
    computed:{
        //验证手机号码是否正确
        phoneRight(){
            return /^[1][3, 4, 5, 7, 8][0-9]{9}$/.test(this.phone)
        }
    },
    methods: {
        ...mapActions(['syncUserInfo']),
        //处理登录模式
        dealLoginMode(flag){
            this.loginMode = flag
        },
        //获取短信验证码
        async getVerifycode(){
            if(this.phoneRight){
                this.conuntDown = 60
                //倒计时
                this.intervalId = setInterval(() => {
                    this.conuntDown--;
                    if(this.conuntDown === 0){
                        clearInterval(this.intervalId)
                    }
                }, 1000)
                //获取短信验证码
                let result = await getPhoneCode(this.phone)
                console.log(this.phone);
                console.log(result.code);
            }
        },
        //登录
        async login(){
            //判断登录模式
            if(this.loginMode){//手机验证码登录
                if(!this.phone.trim()){
                    Toast(
                        {
                            message: '请输入手机号码',
                            duration: 500
                        }
                    )
                    return
                }else if(!this.phone){
                    Toast(
                        {
                            message: '请输入正确的手机号码',
                            duration: 500
                        }
                    )
                    return
                }
                if(!this.code.trim()){
                    Toast(
                        {
                            message: '请输入验证码',
                            duration: 500
                        }
                    )
                    return
                }else if(!/^\d{6}$/gi.test(this.code)){//验证码不正确
                    Toast(
                        {
                            message: '请输入正确的验证码',
                            duration: 500
                        }
                    )
                    return
                }
                //手机验证码登录
                let result = await phoneCodeLogin(this.phone, this.code)
                console.log(result);
                if(result.success_code === 200){
                    this.userinfo = result.data
                }else{
                    this.userinfo = {
                        message: '登录失败， 手机号或者验证码不正确！',
                        duration: 500
                    }
                }

            }else{//用户密码登录
                if(!this.user_name){
                    Toast({
                        message: '请输入用户名!',
                        duration: 500
                    })
                    return
                }else if(!this.pwd){
                    Toast({
                        message: '请输入密码！',
                        duration: 500
                    })
                    return
                }else if(!this.captcha){
                    Toast({
                        message: '请输入验证码！',
                        duration: 500
                    })
                    return
                }
                //发起请求
                let result = await pwdLogin(this.user_name, this.pwd, this.captcha)
                console.log(result);
                console.log(this.captcha);
                if(result.success_code === 200){
                    //保存用户信息
                    this.syncUserInfo(result.data)
                    //回到主面板
                    this.$router.back()
                }else{
                    Toast(
                        {
                        message: '登录失败， 用户名或者密码不正确！',
                        duration: 500
                    }
                    ) 
                }

                
                 
            }
            //后续处理
            if(!this.userinfo.token){
                Toast(this.userinfo.message)
            }else{//登录成功
                //保存用户信息
                this.syncUserInfo(this.userinfo)
                //回到主面板
                this.$router.back()
            }
            
        },
        //处理密码的显示
        dealPassWord(flag){
            this.pwdMode = flag
            console.log(this.pwdMode);
        },
        //获取随机图形验证码
        getCaptcha(){
            //获取验证码的标签
            let captchaEle = this.$refs.captcha
            this.$set(captchaEle, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date())

        }


    }

}
</script>

<style scoped>
    #login{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
    }
    .login_header{
        overflow: hidden;
    }
    .login_logo{
        width: 80%;
        height: 10rem;
        margin: 0 auto;
        margin-top: 6rem;
        overflow: hidden;
    }
    .login_logo img{
        width: 100%;
        display: block;
        margin-top: 1.2rem;
    }
    .login_header .login_method{
        margin: 0.8rem 0;
        font-size: 0.9rem;
        text-align: center;
    }
    .current{
        color: #2eba5a;
        font-weight: bold;
        margin: 0 0.5rem;
        display: inline-block;
        border-bottom: 0.15rem solid  #2eba5a;
        padding-bottom: 0.1rem;
    }
    .iphone .iphone_in{
        font-size: 0.85rem;
        margin: 0.5rem 0;
        position: relative;
    }
    .iphone .iphone_in button{
        background-color: #fff;
    }
    .code_login .iphone_in{
        font-size: 0.85rem;
        margin: 0.5rem 0;
        position: relative;
    }
    .code_login .code_check{
        font-size: 0.85rem;
        margin: 0.5rem 0;
        position: relative;
    }
    
    .iphone .iphone_in>input{
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 90%;
        padding: 0.8rem 0;
        margin: 0 5%;
        padding-left: 0.5rem;
    }
    .code_login .iphone_in>input{
        width: 90%;
        padding: 0.5rem 0;
        margin: 0 5%;
    }
    .code_login .code_check>input{
        width: 90%;
        padding: 0.5rem 0;
        margin: 0 5%;
    }
    .code_login .code_check>img{
        width: 35%;
        position: absolute;
        right: 0;
        top: -0.52rem;
    }
    /* 电话号码正确，验证码按钮高亮样式 */
    .iphone .iphone_in .phone_right{
        color: #75a342;
    }
    .iphone .iphone_in>button{
        position: absolute;
        top: 0.9rem;
        right: 1.3rem;
        color: rgb(209, 194, 194);
    }
    .code_login .iphone_code_in{
        font-size: 0.85rem;
        margin: 0.5rem 0;
        position: relative;
    }
    .iphone .iphone_code_in{
        font-size: 0.85rem;
        margin: 0.5rem 0;
        position: relative;
    }
    .iphone .iphone_code_in>input{
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding-left: 0.5rem;
        width: 90%;
        padding: 0.8rem 0;
        margin: 0 5%;
        padding-left: 0.5rem;

    }
    .code_login .iphone_code_in>input{
        width: 90%;
        padding: 0.5rem 0;
        margin: 0 5%;
    }
    .code_login .iphone_code_in .van-icon-eye-o{
        position: absolute;
        top: 0.75rem;
        right: 2rem;
    }
    .on{
        display: none;
    }
    .code_login .iphone_code_in .van-icon-closed-eye{
        position: absolute;
        top: 0.75rem;
        right: 2rem;
    }
    .point_out{
        font-size: 0.6rem;
        width: 90%;
        margin: 0 auto;
    }   
    .point_out>span{
        color: rgb(209, 194, 194);
    }
    .point_out span>a{
        margin-left: 0.5rem;
        color: #2eba5a;
    }
    .login_return .login{
        width: 90%;
        padding: 0.5rem 0;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        background-color: #2eba5a;
        border-radius: 0.6rem;
        margin-bottom: 0.8rem;
        margin-left: 5%;
    }
    .login_return{
        margin-top: 1rem;
    }
    .login_return .return{
        width: 90%;
        padding: 0.5rem 0;
        margin: 0 auto;
        margin-left: 5%;
        text-align: center;
        color:  #2eba5a;
        border: 0.1rem solid  #2eba5a;
        border-radius: 0.6rem;
    }

</style>