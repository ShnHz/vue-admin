/*
 * @Author: sanghangning 
 * @Date: 2019-12-11 10:47:09 
 * @Last Modified by: sanghangning
 * @Last Modified time: 2022-10-09 15:28:14
 */
<template >
  <div class="login-wrap">
    <div class="bg left-wrap"></div>
    <div class="bg right-wrap"></div>

    <section>
      <div class="left-wrap">
        <div class="qrcode-btn-wrap" @click="loginType = loginType == 'password' ? 'qrcode' : 'password'">
          <SvgLoginQrcode class="svg-icon" v-if="loginType == 'password'" />
          <SvgLoginPc class="svg-icon" v-else />
        </div>
        <div class="login-form-wrap">
          <!-- 账户密码登录 -->
          <a-space direction="vertical" size="large" style="width:100%" v-if="loginType == 'password'"
            class="login-form-wrap__password">
            <h1>管理系统模板</h1>
            <a-form :model="form" layout="vertical">
              <a-form-item field="username" label="用户名">
                <a-input v-model="form.username" placeholder="请输入用户名称/手机号码" allow-clear size="large">
                  <template #prefix>
                    <IconUser />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item field="password" label="密码">
                <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear size="large">
                  <template #prefix>
                    <IconUnlock />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item field label="验证码">
                <img src="@img/common/code.png" alt style="margin-right:10px" />
                <a-input v-model="form.code" placeholder="请输入验证码" allow-clear size="large" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" size="large" long @click="login">
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
      <div class="right-wrap">
        <SvgLoginPerson class="svg-icon" />
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

import SvgLoginPerson from '@/assets/svg/login_person.svg'
import SvgLoginPc from '@/assets/svg/login_pc.svg'
import SvgLoginQrcode from '@/assets/svg/login_qrcode.svg'

export default {
  name: 'login',
  components: {
    IconArrowRight,
    IconUser,
    IconUnlock,
    SvgLoginPerson,
    SvgLoginPc,
    SvgLoginQrcode
  },
  data() {
    return {
      loginType: 'password',
      form: {
        username: '',
        password: '',
        code: '',
      },
    }
  },
  computed: {},
  mounted() {
    this.form.username = this.$cookies.get('login_username')
  },
  methods: {
    // 登录事件
    login() {
      this.$cookies.set('login_username', this.form.username)
      this.$router.push('/')
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

  >.bg {
    flex: 1;
    height: 100%;
    position: relative;

    &.left-wrap {
      background: #cbe4fe;
    }

    &.right-wrap {
      background: #1f2071;
    }
  }

  section {
    display: flex;
    align-items: center;
    width: 1200px;
    height: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    >div {
      flex: 1;
      height: 100%;
    }

    .left-wrap {
      position: relative;
      background: #fff;
      border-radius: 24px 0 0 24px;
      box-shadow: -50px 20px 50px 2px rgba(0, 0, 0, 0.05);

      .qrcode-btn-wrap {
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
          font-size: 40px;
          color: $--color-text-placeholder;
          transition: 0.2s all ease;
        }

        &::after {
          cursor: pointer;
          content: '';
          width: 0;
          height: 0;
          position: absolute;
          bottom: -8px;
          right: -8px;
          border-bottom: 80px solid #fff;
          border-left: 60px solid transparent;
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

    .right-wrap {
      flex: 1.02;
      position: relative;
      background: #e6f2ff;
      border-radius: 0 24px 24px 0;
      box-shadow: 50px 20px 50px 4px rgba(0, 0, 0, 0.2);

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 800px;
        opacity: 0.8;
      }
    }
  }
}
</style>