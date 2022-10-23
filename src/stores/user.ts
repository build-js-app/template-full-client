import {defineStore} from 'pinia';

import uiHelper from '@/helpers/uiHelper';

import {useCommonStore} from '@/stores/common';

import dataService from '@/services/dataService';
import authService from '@/services/authService';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async getCurrentUser() {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const user = await dataService.getCurrentUser();

        this.user = user;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async login(userData: UserLocal) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const response = await authService.login(userData);

        if (response && response.user) {
          this.user = response.user;

          authService.saveToken(response.token);
        }
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async logout() {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        authService.saveToken(null);

        this.user = null;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async signup(userData: NewUser) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        return await authService.signUp(userData);
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async activateUserAccount(token: string) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const data = await authService.activateAccount(token);

        commonStore.endAjaxCall();

        return data;
      } catch (err) {
        commonStore.endAjaxCall();
      }
    },
    async forgotPassword(email: string) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const data = await authService.passwordForgot(email);

        if (data && data.message) uiHelper.showMessage(data.message);
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    },
    async checkResetToken(token: string) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        const data = await authService.resetPasswordTokenCheck(token);

        commonStore.endAjaxCall();

        return data;
      } catch (err) {
        commonStore.endAjaxCall();
      }
    },
    async resetPassword(userData: ResetUser) {
      const commonStore = useCommonStore();

      try {
        commonStore.beginAjaxCall();

        return await authService.resetPassword(userData);
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.endAjaxCall();
      }
    }
  }
});
