<template>
  <div class="login">
    <div class="login_left">
      <img src="@/assets/images/login/background.webp" alt="" />
    </div>
    <div class="login_right">
      <template v-if="mode === 'login'">
        <a-typography-title :level="2" class="mb-60">{{ global.LOGIN_TITLE }}</a-typography-title>
        <a-form
          ref="formStateRef"
          :model="formState"
          name="formState"
          autocomplete="off"
          class="w-100"
        >
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="账号密码登录">
              <a-form-item name="username" :rules="[{ required: true, message: '请输入用户账号' }]">
                <a-input v-model:value="formState.username" placeholder="请输入用户账号">
                  <template #prefix>
                    <user-outlined type="user" class="primary" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password" :rules="[{ required: true, message: '请输入用户密码' }]">
                <a-input-password v-model:value="formState.password" placeholder="请输入用户密码">
                  <template #prefix>
                    <lock-outlined class="primary" />
                  </template>
                </a-input-password>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="2" tab="手机号登录">
              <a-form-item
                name="phone"
                :rules="[{ required: true, message: '请输入绑定的手机号' }]"
              >
                <a-input v-model:value="formState.phone" placeholder="请输入绑定的手机号">
                  <template #prefix>
                    <mobile-outlined class="primary" />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="code" :rules="[{ required: true, message: '请输入验证码' }]">
                <a-input v-model:value="formState.code" placeholder="请输入验证码">
                  <template #prefix>
                    <lock-outlined class="primary" />
                  </template>
                  <template #suffix>
                    <a href="javascript:;">获取验证码</a>
                  </template>
                </a-input>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div class="login_right_forget">
            <a href="javascript:;" @click="forgetPassword">忘记密码</a>
          </div>
          <a-form-item>
            <a-button type="primary" block class="mt-24" @click="onConfirm">登录</a-button>
          </a-form-item>
        </a-form>
      </template>
      <template v-else-if="mode === 'forget'">
        <a-typography-title :level="2" class="mb-60">忘记密码</a-typography-title>
        <a-form
          ref="forgetStateRef"
          :model="forgetState"
          name="forgetState"
          autocomplete="off"
          class="w-100"
        >
          <a-form-item name="phone" :rules="[{ required: true, message: '请输入绑定的手机号' }]">
            <a-input v-model:value="forgetState.phone" placeholder="请输入绑定的手机号">
              <template #prefix>
                <mobile-outlined class="primary" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="imgCode" :rules="[{ required: true, message: '请输入图形验证码' }]">
            <a-input v-model:value="forgetState.imgCode" placeholder="请输入图形验证码">
              <template #prefix>
                <safety-certificate-outlined class="primary" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="code" :rules="[{ required: true, message: '请输入验证码' }]">
            <a-input v-model:value="formState.code" placeholder="请输入验证码">
              <template #prefix>
                <lock-outlined class="primary" />
              </template>
              <template #suffix>
                <a href="javascript:;">获取验证码</a>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" :rules="[{ required: true, message: '请输入新密码' }]">
            <a-input-password v-model:value="formState.password" placeholder="请输入新密码">
              <template #prefix>
                <lock-outlined class="primary" />
              </template>
            </a-input-password>
          </a-form-item>
          <p class="login_right_tip">
            <info-circle-outlined
              class="primary mr-6 fs-12"
            />密码长度为8-12位，区分大小写字母，需要英文、数字混合
          </p>
          <a-form-item
            name="passwordAgain"
            :rules="[{ required: true, message: '请再次确认密码' }]"
          >
            <a-input-password v-model:value="formState.passwordAgain" placeholder="请再次确认密码">
              <template #prefix>
                <lock-outlined class="primary" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block @click="onConfirmForget">确认</a-button>
          </a-form-item>
          <a-form-item>
            <a-button block @click="back">返回</a-button>
          </a-form-item>
        </a-form>
      </template>
      <template v-else-if="mode === 'first'">
        <a-typography-title :level="2">登录成功</a-typography-title>
        <p class="mb-12">首次登录请先设置密码</p>
        <a-form
          ref="forgetStateRef"
          :model="forgetState"
          name="forgetState"
          autocomplete="off"
          class="w-100"
        >
          <a-form-item name="password" :rules="[{ required: true, message: '请输入新密码' }]">
            <a-input-password v-model:value="formState.password" placeholder="请输入新密码">
              <template #prefix>
                <lock-outlined class="primary" />
              </template>
            </a-input-password>
          </a-form-item>
          <p class="login_right_tip">
            <info-circle-outlined
              class="primary mr-6 fs-12"
            />密码长度为8-12位，区分大小写字母，需要英文、数字混合
          </p>
          <a-form-item>
            <a-button type="primary" block @click="onConfirm">完成</a-button>
          </a-form-item>
        </a-form>
      </template>
    </div>
  </div>
</template>

<script setup>
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue'
import global from '@/enums/global'
const activeKey = ref('1')
const mode = ref('first') //login forget first
const formStateRef = ref()
const forgetStateRef = ref()
const formState = reactive({
  username: '',
  password: '',
  phone: '',
  code: '',
})
const forgetState = reactive({
  phone: '',
  imgCode: '',
  code: '',
  password: '',
  passwordAgain: '',
})
const forgetPassword = () => {
  mode.value = 'forget'
}

//登录
const onConfirm = () => {
  formStateRef.value.validate().then(() => {})
}
//忘记密码确认
const onConfirmForget = () => {
  forgetStateRef.value.validate().then(() => {
    mode.value = 'login'
  })
}
//忘记密码返回
const back = () => {
  mode.value = 'login'
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  .login_left {
    flex: 0 0 832px;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .login_right {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 120px;
    &_forget {
      display: flex;
      justify-content: end;
      width: 100%;
    }
    &_tip {
      font-size: 12px;
      color: @gray-95;
    }
  }
}
</style>
