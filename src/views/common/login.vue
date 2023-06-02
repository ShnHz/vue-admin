/*
 * @Author: sanghangning 
 * @Date: 2022-10-01 16:09:53 
 * @Last Modified by: sanghangning
 * @Last Modified time: 2022-10-17 16:16:22
 */
<template >
  <div class="login-wrap">
    <div class="login-wrap-bg"></div>
    <section>
      <div class="login-carousel">
        <a-carousel :style="{
          width: '553px',
          height: '553px',
        }" :auto-play="{interval:4000}" show-arrow="hover">
          <a-carousel-item v-for="image in imagesList">
            <img :src="image" :style="{
              width: '100%',
            }" />
          </a-carousel-item>
        </a-carousel>
      </div>
      <div class="login-account">
        <div class="bg-img-box">
          <img v-for="(item,index) in bgImagesList" :key="`bg-img-item-${index}`" :src="item" alt=""
            :class="`bg-img-item-${randomList[index]}`">
        </div>

        <div class="login-wrap">
          <div class="qrcode-btn-wrap" @click="loginType = loginType == 'password' ? 'qrcode' : 'password'">
            <SvgLoginQrcode class="svg-icon" v-if="loginType == 'password'" />
            <SvgLoginPc class="svg-icon" v-else />
          </div>
          <div class="login-form-wrap">
            <!-- 账户密码登录 -->
            <a-space direction="vertical" size="large" style="width:100%" v-if="loginType == 'password'"
              class="login-form-wrap__password">
              <h1>管理系统模板</h1>
              <a-form :model="form" layout="vertical" ref="form">
                <a-form-item field="username" label="用户名"
                  :rules="[{required:true,message:'请输入用户名'},{minLength:5,message:'用户名不能少于5个字符'}]" hide-asterisk>
                  <a-input v-model="form.username" placeholder="请输入用户名称/手机号码" allow-clear size="large">
                    <template #prefix>
                      <IconUser />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item field="password" label="密码" :rules="[{required:true,message:'请输入密码'}]" hide-asterisk>
                  <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear size="large">
                    <template #prefix>
                      <IconUnlock />
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-form-item field="code" label="验证码"
                  :rules="[{required:true,message:'请输入验证码'},{length:4,message:'验证码长度为4'}]" hide-asterisk>
                  <img src="@img/common/code.png" alt style="margin-right:10px" />
                  <a-input v-model="form.code" placeholder="请输入验证码" allow-clear size="large" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" size="large" long @click="login" html-type="submit">
                    登 录
                    <template #icon>
                      <IconArrowRight />
                    </template>
                  </a-button>
                </a-form-item>
                <a-divider />
                <p class="tip">
                  您是否忘记了账号/密码？
                  <a @click="mixins_contactAdministrator">请联系管理员</a>
                </p>
              </a-form>
            </a-space>
            <!-- 扫码登陆 -->
            <a-space direction="vertical" size="large" style="width:100%" v-if="loginType == 'qrcode'"
              class="login-form-wrap__qrcode">
              <h1>扫码登录管理系统模板</h1>
              <img src="@img/common/qrcode.png" alt />
              <a-divider />
              <p class="tip">
                如有问题，
                <a @click="mixins_contactAdministrator">请联系管理员</a>
              </p>
            </a-space>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {
  IconArrowRight,
  IconUser,
  IconUnlock,
} from '@arco-design/web-vue/es/icon'

import SvgLoginPc from '@/assets/svg/login_pc.svg'
import SvgLoginQrcode from '@/assets/svg/login_qrcode.svg'

import useCommonState from '@pinia/modules/common.js'


export default {
  name: 'login',
  components: {
    IconArrowRight,
    IconUser,
    IconUnlock,
    SvgLoginPc,
    SvgLoginQrcode
  },
  data() {
    return {
      commonState:useCommonState(),

      loginType: 'password',
      form: {
        username: null,
        password: null,
        code: null,
      },

      imagesList: [
        new URL('../../assets/img/common/login/one.png', import.meta.url),
        new URL('../../assets/img/common/login/two.png', import.meta.url),
        new URL('../../assets/img/common/login/three.png', import.meta.url),
      ],

      bgImagesList: [
        new URL('../../assets/img/common/login/1.png', import.meta.url),
        new URL('../../assets/img/common/login/2.png', import.meta.url),
        new URL('../../assets/img/common/login/3.png', import.meta.url),
        new URL('../../assets/img/common/login/4.png', import.meta.url),
        new URL('../../assets/img/common/login/5.png', import.meta.url),
        new URL('../../assets/img/common/login/6.png', import.meta.url),
        new URL('../../assets/img/common/login/7.png', import.meta.url),
        new URL('../../assets/img/common/login/8.png', import.meta.url),
        new URL('../../assets/img/common/login/9.png', import.meta.url),
      ],
      randomList: new Array(9).fill(0).map((item, index) => index + 1),
      radomBgImgListTime: null
    }
  },
  computed: {},
  mounted() {
    this.form.username = localStorage.getItem('login_username')

    this.radomBgImgListTime = setInterval(() => {
      let list = [...this.randomList]
      let newList = []
      while (list.length > 0) {
        let index = list.length == 1 ? 0 : Math.floor(Math.random() * (list.length));;
        newList.push(list[index])
        list.splice(index, 1)
      }

      this.randomList = newList
    }, 4000);
  },
  beforeUnmount() {
    clearInterval(this.radomBgImgListTime)
  },
  methods: {
    // 登录事件
    login() {
      if (this.form.username) localStorage.setItem('login_username', this.form.username)

      this.$refs.form.validate((error) => {
        if (!error) {
          this.commonState.login().then(() => { })
        }
      })
    },
  },
}
</script>
<style scoped lang="scss">
.login-wrap {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;

  .login-wrap-bg {
    z-index: 0;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url('/static/img/bg/login-bg.png') no-repeat 0 -60px;
  }

  section {
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -20px;
    height: 100vh;
    width: 100vw;

    .login-carousel {
      display: flex;
      flex-direction: column;
      margin: 0 160px;
      padding-top: 80px;

      ::v-deep(.arco-carousel) {
        .arco-carousel-indicator-wrapper {
          display: none;
        }

        .arco-carousel-arrow {
          display: none;
        }

        .arco-carousel-item-slide-out {
          opacity: 0;
        }
      }
    }

    .login-account {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 770px;
      margin: 0 160px;

      .bg-img-box {
        position: relative;

        img {
          width: 230px;
          position: absolute;
          top: -82px;
          left: -115px;
          border-radius: 8px;
          opacity: .9;
          transition: all 1s;

          &.bg-img-item-1 {
            transform: translate(-258px, -188px);
          }

          &.bg-img-item-2 {
            transform: translate(0, -188px);
          }

          &.bg-img-item-3 {
            transform: translate(258px, -188px);
          }

          &.bg-img-item-4 {
            transform: translate(-258px, 0);
          }

          &.bg-img-item-5 {
            transform: translate(0, 0);
          }

          &.bg-img-item-6 {
            transform: translate(258px, 0);
          }

          &.bg-img-item-7 {
            transform: translate(-258px, 188px);
          }

          &.bg-img-item-8 {
            transform: translate(0, 188px);
          }

          &.bg-img-item-9 {
            transform: translate(258px, 188px);
          }
        }
      }

      .login-wrap {
        width: 450px;
        height: 660px;
        position: absolute;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 24px;
        box-shadow: -50px 20px 50px 2px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(34px);

        .qrcode-btn-wrap {
          cursor: pointer;
          position: absolute;
          top: 24px;
          left: 24px;
          width: 53px;
          height: 53px;

          &:hover {
            svg {
              color: #000;
              transform: scale(1.1);
            }
          }

          svg {
            position: absolute;
            font-size: 30px;
            color: $--color-text-placeholder;
            transition: 0.2s all ease;
          }
        }

        .login-form-wrap {
          width: 340px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          h1 {
            text-align: center;
            font-size: 24px;
            font-weight: 400;
          }

          .tip {
            text-align: center;
            color: $--color-text-placeholder;

            a {
              color: $--color-primary;
            }
          }

          .login-form-wrap__password {
            ::v-deep(.arco-btn) {
              .arco-btn-icon {
                position: absolute;
                right: 8px;
                opacity: 0.3;
              }
            }
          }

          .login-form-wrap__qrcode {
            text-align: center;

            img {
              width: 200px;
              height: 200px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .login-carousel {
    display: none !important;
  }

  .login-account {
    .bg-img-box {
      display: none !important;
    }
  }
}
</style>